const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { amount } = await req.json()
    const keyId = Deno.env.get('RAZORPAY_KEY_ID')?.trim()
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')?.trim()

    if (!keyId || !keySecret) {
      throw new Error('CRITICAL: Razorpay secrets are missing in Supabase Edge Function environment.')
    }

    if (!Number.isInteger(amount) || amount < 100) {
      return new Response(JSON.stringify({ error: 'Amount must be an integer of at least 100 paise.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const authHeader = 'Basic ' + btoa(keyId + ':' + keySecret)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    let response: Response
    try {
      response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `b2b_rcpt_${Date.now()}`,
        }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    const responseText = await response.text()
    let data: unknown
    try {
      data = responseText ? JSON.parse(responseText) : {}
    } catch {
      data = { error: responseText || 'Razorpay returned an empty response.' }
    }

    if (!response.ok) {
      console.error('Razorpay API Rejected:', data)
      return new Response(JSON.stringify({ error: data }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const orderData = data as { id?: string; amount?: number; currency?: string }
    if (!orderData.id || typeof orderData.amount !== 'number') {
      throw new Error('Razorpay returned an invalid order response.')
    }

    return new Response(JSON.stringify({
      order_id: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      key_id: keyId,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected Edge Function error.'
    console.error('Edge Function Crash:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})