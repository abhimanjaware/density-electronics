import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Web Crypto API helper to generate HMAC SHA256 signatures securely in Deno
async function generateSignature(orderId: string, paymentId: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${orderId}|${paymentId}`),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function signaturesMatch(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

type OrderPayload = {
  customer?: Record<string, unknown>;
  items?: Array<Record<string, unknown>>;
  subtotal?: number;
  shipping?: number;
  total?: number;
};

type StoredOrder = {
  id: number;
  order_reference: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  amount: number;
  currency: string;
  customer: Record<string, unknown>;
  items: Array<Record<string, unknown>>;
  subtotal: number;
  tax: number;
  shipping_fee: number;
  total: number;
  paid_at: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function money(value: unknown) {
  return `₹${Number(value || 0).toFixed(2)}`;
}

function orderReference(paymentId: string) {
  return `#DE-${paymentId.slice(-6).toUpperCase()}`;
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service credentials are not configured.");

  return fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

async function readResponse(response: Response) {
  const text = await response.text();
  if (!response.ok) throw new Error(`Supabase request failed (${response.status}): ${text}`);
  return text ? JSON.parse(text) : null;
}

async function verifyRazorpayAmount(orderId: string, amount: number) {
  const keyId = Deno.env.get("RAZORPAY_KEY_ID");
  const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
  if (!keyId || !keySecret) throw new Error("Razorpay credentials are not configured.");

  const response = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}` },
  });
  const data = await response.json();
  if (!response.ok || data.amount !== amount || data.currency !== "INR") {
    throw new Error("Paid amount does not match the Razorpay order.");
  }
}

function adminOrderUrl(orderId: number) {
  const configuredUrl = Deno.env.get("ORDER_ADMIN_URL");
  if (configuredUrl) return configuredUrl.replace("{orderId}", String(orderId));

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const projectRef = Deno.env.get("SUPABASE_PROJECT_REF") || new URL(supabaseUrl).hostname.split(".")[0];
  return `https://supabase.com/dashboard/project/${projectRef}/editor?schema=public&table=orders&filter=id%3Deq%3A${orderId}`;
}

function buildEmail(order: StoredOrder) {
  const customer = order.customer || {};
  const address = [customer.address, customer.city, customer.state, customer.pincode]
    .filter(Boolean)
    .map(escapeHtml)
    .join(", ");
  const itemRows = (order.items || []).map((item) => {
    const quantity = Number(item.quantity || 0);
    const unitPrice = Number(item.price || 0);
    return `<tr><td>${escapeHtml(item.name || item.title)}</td><td>${quantity}</td><td>${money(unitPrice)}</td><td>${money(quantity * unitPrice)}</td></tr>`;
  }).join("");
  const dashboardUrl = adminOrderUrl(order.id);

  return `<!doctype html><html><body style="margin:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#17202a"><div style="max-width:720px;margin:24px auto;background:#fff;border:1px solid #e5e7eb"><div style="padding:24px;background:#17202a;color:#fff"><h1 style="margin:0;font-size:22px">New paid order ${escapeHtml(order.order_reference)}</h1><p style="margin:8px 0 0;color:#cbd5e1">Density Electronics store alert</p></div><div style="padding:24px"><p><strong>Database Order ID:</strong> ${order.id}<br><strong>Razorpay Payment ID:</strong> ${escapeHtml(order.razorpay_payment_id)}<br><strong>Paid at:</strong> ${escapeHtml(new Date(order.paid_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}</p><h2 style="font-size:16px;border-bottom:1px solid #e5e7eb;padding-bottom:8px">Customer and delivery</h2><p><strong>${escapeHtml(customer.name)}</strong><br>${escapeHtml(customer.phone)}<br>${escapeHtml(customer.email)}<br>${address}</p><p><a href="https://wa.me/91${encodeURIComponent(String(customer.phone || "").replace(/\D/g, ""))}" style="color:#128c7e;font-weight:bold">Message ${escapeHtml(customer.name)} on WhatsApp</a></p><h2 style="font-size:16px;border-bottom:1px solid #e5e7eb;padding-bottom:8px">Itemized manifest</h2><table style="width:100%;border-collapse:collapse;font-size:14px"><thead><tr style="text-align:left;background:#f8fafc"><th style="padding:8px">Product</th><th style="padding:8px">Qty</th><th style="padding:8px">Unit</th><th style="padding:8px">Line total</th></tr></thead><tbody>${itemRows}</tbody></table><h2 style="font-size:16px;border-bottom:1px solid #e5e7eb;padding-bottom:8px">Financial breakdown</h2><table style="width:100%;font-size:14px"><tr><td>Subtotal</td><td style="text-align:right">${money(order.subtotal)}</td></tr><tr><td>GST / Taxes</td><td style="text-align:right">${money(order.tax)}</td></tr><tr><td>Shipping fee</td><td style="text-align:right">${money(order.shipping_fee)}</td></tr><tr><td style="padding-top:10px"><strong>Grand total paid</strong></td><td style="padding-top:10px;text-align:right"><strong>${money(order.total)}</strong></td></tr></table><p style="margin:28px 0 0"><a href="${escapeHtml(dashboardUrl)}" style="display:inline-block;background:#f97316;color:#fff;text-decoration:none;padding:12px 18px;font-weight:bold">View order in dashboard</a></p></div></div></body></html>`;
}

function buildCustomerEmail(order: StoredOrder) {
  const customer = order.customer || {};
  const address = [customer.address, customer.city, customer.state, customer.pincode].filter(Boolean).map(escapeHtml).join(", ");
  const itemRows = (order.items || []).map((item) => {
    const quantity = Number(item.quantity || 0);
    const unitPrice = Number(item.price || 0);
    return `<tr><td style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(item.name || item.title)}</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${quantity}</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${money(unitPrice * quantity)}</td></tr>`;
  }).join("");
  return `<!doctype html><html><body style="margin:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#17202a"><div style="max-width:680px;margin:24px auto;background:#fff;border:1px solid #e5e7eb"><div style="padding:24px;background:#17202a;color:#fff"><h1 style="margin:0;font-size:22px">Order confirmed</h1><p style="margin:8px 0 0;color:#cbd5e1">${escapeHtml(order.order_reference)} · Density Electronics</p></div><div style="padding:24px"><p>Hi ${escapeHtml(customer.name)}, your payment was verified successfully. Your invoice is included below.</p><p><strong>Order reference:</strong> ${escapeHtml(order.order_reference)}<br><strong>Razorpay Payment ID:</strong> ${escapeHtml(order.razorpay_payment_id)}<br><strong>Shipping address:</strong> ${address}</p><table style="width:100%;border-collapse:collapse"><thead><tr style="text-align:left;background:#f8fafc"><th style="padding:8px">Product</th><th style="padding:8px">Qty</th><th style="padding:8px">Total</th></tr></thead><tbody>${itemRows}</tbody></table><table style="width:100%;margin-top:20px"><tr><td>Subtotal</td><td style="text-align:right">${money(order.subtotal)}</td></tr><tr><td>GST / Taxes</td><td style="text-align:right">${money(order.tax)}</td></tr><tr><td>Shipping fee</td><td style="text-align:right">${money(order.shipping_fee)}</td></tr><tr><td style="padding-top:10px"><strong>Grand total paid</strong></td><td style="padding-top:10px;text-align:right"><strong>${money(order.total)}</strong></td></tr></table><p style="margin-top:24px;color:#64748b">Need help? Reply to this email or contact Density Electronics support.</p></div></div></body></html>`;
}

async function sendResendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM_EMAIL");
  if (!resendApiKey || !from) throw new Error("Resend notification credentials are not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });
  const responseBody = await response.text();
  if (!response.ok) throw new Error(`Resend rejected email (${response.status}): ${responseBody}`);
  return responseBody ? JSON.parse(responseBody) : {};
}

async function dispatchOrderEmails(order: StoredOrder) {
  const claim = await readResponse(await supabaseRequest(`rpc/claim_order_notification`, {
    method: "POST",
    body: JSON.stringify({ p_order_id: order.id }),
  }));
  if (!Array.isArray(claim) || claim.length === 0) return;

  const customerEmail = String(order.customer?.email || "");
  const results = await Promise.allSettled([
    sendResendEmail(
      "sales.densityelectronics@gmail.com",
      `🚨 New Paid Order ${order.order_reference} Received - ${money(order.total)} - ${order.customer?.name || "Customer"}`,
      buildEmail(order),
    ),
    sendResendEmail(
      customerEmail,
      `Order confirmed ${order.order_reference} - Density Electronics`,
      buildCustomerEmail(order),
    ),
  ]);
  results.forEach((result, index) => {
    if (result.status === "rejected") console.error(`Order email ${index === 0 ? "admin" : "customer"} failed:`, result.reason);
  });
  if (results.some((result) => result.status === "rejected")) return;

  await readResponse(await supabaseRequest(`orders?id=eq.${order.id}&notification_sent_at=is.null`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ notification_sent_at: new Date().toISOString(), notification_id: "admin-and-customer" }),
  }));
}

async function persistPaidOrder(razorpayOrderId: string, razorpayPaymentId: string, payload: OrderPayload) {
  const customer = payload.customer || {};
  const items = Array.isArray(payload.items) ? payload.items : [];
  const subtotal = Number(payload.subtotal || 0);
  const shippingFee = Number(payload.shipping || 0);
  const total = Number(payload.total || subtotal + shippingFee);
  const paymentAmount = Math.round(total * 100);
  if (!customer.name || !customer.phone || !customer.email || items.length === 0 || !Number.isFinite(paymentAmount) || paymentAmount < 100) {
    throw new Error("Incomplete order details received for paid order.");
  }

  const inserted = await readResponse(await supabaseRequest("orders", {
    method: "POST",
    headers: { Prefer: "return=representation,resolution=ignore-duplicates" },
    body: JSON.stringify({
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      order_reference: orderReference(razorpayPaymentId),
      status: "PAID",
      amount: paymentAmount,
      currency: "INR",
      customer,
      items,
      subtotal,
      tax: 0,
      shipping_fee: shippingFee,
      total,
    }),
  }));
  if (Array.isArray(inserted) && inserted[0]) return inserted[0] as StoredOrder;

  const existing = await readResponse(await supabaseRequest(`orders?razorpay_payment_id=eq.${encodeURIComponent(razorpayPaymentId)}&select=*`));
  if (!Array.isArray(existing) || !existing[0]) throw new Error("Paid order could not be loaded after idempotent insert.");
  return existing[0] as StoredOrder;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") return jsonResponse({ success: false, error: "Method not allowed" }, 405);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, order } = await req.json();
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!keySecret || typeof razorpay_payment_id !== "string" || typeof razorpay_order_id !== "string" || typeof razorpay_signature !== "string") {
      throw new Error("Razorpay secret is not configured.");
    }

    // Generate our own signature on the server
    const generatedSignature = await generateSignature(razorpay_order_id, razorpay_payment_id, keySecret);

    // Compare our signature with Razorpay's to ensure the payment isn't spoofed
    if (!signaturesMatch(generatedSignature, razorpay_signature)) {
      return jsonResponse({ success: false, error: "Payment verification failed: Invalid signature" }, 400);
    }

    const orderTotal = Number(order?.total);
    if (!Number.isFinite(orderTotal)) throw new Error("Invalid order total.");
    await verifyRazorpayAmount(razorpay_order_id, Math.round(orderTotal * 100));
    const paidOrder = await persistPaidOrder(razorpay_order_id, razorpay_payment_id, order || {});
    const notification = dispatchOrderEmails(paidOrder).catch((error) => {
      console.error("Paid order email dispatch failed:", error instanceof Error ? error.message : error);
    });
    const runtime = (globalThis as typeof globalThis & {
      EdgeRuntime?: { waitUntil?: (promise: Promise<unknown>) => void };
    }).EdgeRuntime;
    if (runtime?.waitUntil) runtime.waitUntil(notification);

    return jsonResponse({ success: true, order_id: paidOrder.id, order_reference: paidOrder.order_reference, message: "Payment verified successfully." });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected verification error.";
    console.error("Payment verification failed:", message);
    return jsonResponse({ success: false, error: message }, 500);
  }
});