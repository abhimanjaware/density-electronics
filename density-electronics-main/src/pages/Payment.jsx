import { useRef, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Receipt,
  MapPin,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  const [loading, setLoading] = useState(false);
  const paymentAttemptRef = useRef(false);

  if (!order) {
    return <Navigate to="/" />;
  }

  // Load Razorpay Checkout SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');

      script.src =
        'https://checkout.razorpay.com/v1/checkout.js';

      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    if (loading || paymentAttemptRef.current) return;

    paymentAttemptRef.current = true;
    setLoading(true);

    try {
      // 1. Load Razorpay
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error(
          'Payment gateway unavailable. Please check your internet connection.'
        );
      }

      // 2. Validate amount
      const totalAmount = Number(order.total);

      if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
        throw new Error(
          'Invalid order total. Please review your cart.'
        );
      }

      const amountInPaise = Math.round(totalAmount * 100);

      if (amountInPaise < 100) {
        throw new Error('Minimum payment amount is ₹1.');
      }

      toast.loading(
        'Creating secure payment order...',
        {
          id: 'payment-init'
        }
      );

      // 3. Create Razorpay Order through Django
      const createOrderResponse = await fetch(
        `${API_BASE_URL}/api/orders/create-razorpay-order/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInPaise,
          }),
        }
      );

      const orderData =
        await createOrderResponse.json();

      if (
        !createOrderResponse.ok ||
        !orderData?.order_id
      ) {
        console.error(
          'Django order error:',
          orderData
        );

        throw new Error(
          orderData?.message ||
          orderData?.error ||
          'Could not create payment order. Please try again.'
        );
      }

      toast.dismiss('payment-init');

      // 4. Razorpay Checkout
      const options = {
        key: orderData.key_id,

        amount: orderData.amount,

        currency:
          orderData.currency || 'INR',

        order_id: orderData.order_id,

        name: 'Density Electronics',

        description:
          `Order Payment (${order.items?.length || 0} items)`,

        image:
          'https://ik.imagekit.io/t2r0vhpii/headerlogo33.png',

        prefill: {
          name:
            order.customer?.name || '',

          email:
            order.customer?.email ||
            'sales.densityelectronics@gmail.com',

          contact:
            order.customer?.phone || '',
        },

        theme: {
          color: '#1e293b',
        },

        modal: {
          ondismiss: () => {
            toast('Payment cancelled.', {
              icon: 'ℹ️',
            });

            setLoading(false);
            paymentAttemptRef.current = false;
          },
        },

        // 5. Razorpay Success
        handler: async function (response) {
          try {
            setLoading(true);

            toast.loading(
              'Confirming your payment...',
              {
                id: 'payment-verify',
              }
            );

            // 6. Verify payment through Django
            const verifyResponse =
              await fetch(
                `${API_BASE_URL}/api/orders/verify-razorpay-payment/`,
                {
                  method: 'POST',

                  headers: {
                    'Content-Type': 'application/json',
                  },

                  body: JSON.stringify({

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    // CUSTOMER DETAILS
                    customer_name:
                      order.customer?.name || '',

                    customer_email:
                      order.customer?.email || '',

                    customer_mobile:
                      order.customer?.phone || '',

                    // DELIVERY ADDRESS
                    delivery_address: [
                      order.customer?.address || '',
                      order.customer?.city || '',
                      order.customer?.state || '',
                      order.customer?.pincode || '',
                    ]
                      .filter(Boolean)
                      .join(', '),

                    // ORDER DETAILS
                    total_amount:
                      order.total,

                    items:
                      order.items || [],
                  }),
                }
              );

            const verificationData =
              await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              !verificationData?.success
            ) {
              console.error(
                'Payment verification failed:',
                verificationData
              );

              throw new Error(
                verificationData?.message ||
                verificationData?.error ||
                'Payment confirmation failed.'
              );
            }

            toast.success(
              'Payment successful!',
              {
                id: 'payment-verify',
              }
            );

            // 7. Go to success page
            navigate('/order-ready', {
              state: {
                ...order,

                orderReference:
                  verificationData.order_reference,

                utr:
                  response.razorpay_payment_id,

                razorpayOrderId:
                  response.razorpay_order_id,

                paymentStatus:
                  'PAID',
              },
            });
          } catch (error) {
            console.error(
              'Payment verification error:',
              error
            );

            toast.error(
              error.message ||
              'Payment confirmation failed. Please contact support.',
              {
                id: 'payment-verify',
              }
            );

            setLoading(false);
            paymentAttemptRef.current = false;
          }
        },
      };

      // 8. Open Razorpay
      const paymentObject =
        new window.Razorpay(options);

      // Payment failed
      paymentObject.on(
        'payment.failed',
        function (response) {
          console.error(
            'Razorpay payment failed:',
            response
          );

          toast.error(
            response?.error?.description ||
            'Payment was declined by the bank.'
          );

          setLoading(false);
          paymentAttemptRef.current = false;
        }
      );

      paymentObject.open();
    } catch (error) {
      console.error(
        'Payment initialization error:',
        error
      );

      toast.dismiss('payment-init');

      toast.error(
        error.message ||
        'Unable to open payment window. Please try again.'
      );

      setLoading(false);
      paymentAttemptRef.current = false;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24 pt-6 sm:pt-10">

      <div className="max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation */}
        <div className="mb-8 border-b border-gray-200 pb-5">

          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 text-xs font-black uppercase tracking-widest transition-colors mb-4 disabled:opacity-50"
          >
            <ArrowLeft
              size={16}
              strokeWidth={3}
            />

            Back to Checkout
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              Complete Payment
            </h1>

            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-sm shadow-sm">

              <ShieldCheck size={16} />

              100% Secure Checkout

            </div>

          </div>

        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* LEFT - Order Summary */}
          <div className="space-y-6">

            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">

              <div className="bg-slate-100 px-6 py-4 border-b border-gray-200 flex items-center gap-2.5">

                <Receipt
                  size={20}
                  className="text-slate-600"
                />

                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Order Summary
                </h2>

              </div>

              <div className="p-6 space-y-4">

                <div className="flex justify-between items-center text-sm gap-4">

                  <span className="text-gray-500 font-bold">
                    Billed To:
                  </span>

                  <span className="font-black text-slate-900 text-right">
                    {order.customer?.companyName ||
                      order.customer?.name ||
                      'Customer'}
                  </span>

                </div>

                <div className="flex justify-between items-center text-sm">

                  <span className="text-gray-500 font-bold">
                    Customer:
                  </span>

                  <span className="font-bold text-slate-700">
                    {order.customer?.name || '-'}
                  </span>

                </div>

                <div className="flex justify-between items-center text-sm">

                  <span className="text-gray-500 font-bold">
                    Items Count:
                  </span>

                  <span className="font-black text-slate-900">
                    {order.items?.length || 0} Products
                  </span>

                </div>

              </div>

            </div>

            {/* DELIVERY LOCATION */}
            <div className="bg-white rounded-lg border border-orange-200 shadow-sm overflow-hidden">

              <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex items-center gap-2.5">

                <MapPin
                  size={20}
                  className="text-orange-600"
                />

                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Delivery Location
                </h2>

              </div>

              <div className="p-6 space-y-3">

                <div className="flex items-start gap-3">

                  <MapPin
                    size={17}
                    className="text-orange-500 mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Delivery Address
                    </p>

                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {order.customer?.address || '-'}
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">

                  <div>

                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      City
                    </p>

                    <p className="text-sm font-black text-slate-800 mt-1">
                      {order.customer?.city || '-'}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      State
                    </p>

                    <p className="text-sm font-black text-slate-800 mt-1">
                      {order.customer?.state || '-'}
                    </p>

                  </div>

                </div>

                <div className="border-t border-gray-100 pt-4">

                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    PIN Code
                  </p>

                  <p className="text-sm font-black text-slate-800 mt-1 tracking-widest">
                    {order.customer?.pincode || '-'}
                  </p>

                </div>

              </div>

            </div>

            {/* Total */}
            <div className="bg-slate-900 p-6 rounded-lg flex justify-between items-end text-white">

              <div>

                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Total Amount to Pay
                </span>

                <span className="text-3xl font-black tracking-tight text-orange-400">
                  ₹{Number(order.total).toFixed(2)}
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT - Payment Box */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">

                  <CreditCard
                    size={20}
                    className="text-orange-600"
                  />

                </div>

                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  Pay Online Securely
                </h2>

              </div>

              <p className="text-sm text-gray-500 font-medium leading-relaxed">

                Click below to open our secure payment window.
                You can pay using{' '}

                <span className="text-slate-900 font-bold">
                  UPI, Netbanking, Credit/Debit Card, or Wallets
                </span>.

              </p>

            </div>

            {/* Customer mini info */}
            <div className="bg-slate-50 border border-gray-200 rounded-lg p-4">

              <div className="flex items-center gap-2 mb-3">

                <User
                  size={16}
                  className="text-slate-500"
                />

                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Customer Information
                </span>

              </div>

              <div className="space-y-2 text-xs">

                <div className="flex justify-between gap-3">

                  <span className="text-gray-500">
                    Name
                  </span>

                  <span className="font-bold text-slate-800 text-right">
                    {order.customer?.name || '-'}
                  </span>

                </div>

                <div className="flex justify-between gap-3">

                  <span className="text-gray-500">
                    Mobile
                  </span>

                  <span className="font-bold text-slate-800">
                    +91 {order.customer?.phone || '-'}
                  </span>

                </div>

                <div className="flex justify-between gap-3">

                  <span className="text-gray-500">
                    Email
                  </span>

                  <span className="font-bold text-slate-800 text-right break-all">
                    {order.customer?.email || '-'}
                  </span>

                </div>

              </div>

            </div>

            {/* Payment Button */}
            <button
              onClick={handleOnlinePayment}
              disabled={loading}
              className={`w-full h-14 font-black text-sm uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2.5 shadow-md ${
                loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-orange-600 hover:bg-orange-500 text-white active:scale-95 shadow-orange-600/30'
              }`}
            >

              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />

                  Opening Secure Window...
                </>
              ) : (
                <>
                  <CreditCard size={18} />

                  Proceed to Pay ₹
                  {Number(order.total).toFixed(2)}
                </>
              )}

            </button>

            {/* Security points */}
            <div className="space-y-2 pt-2 border-t border-gray-100">

              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">

                <CheckCircle2
                  size={14}
                  className="text-emerald-500"
                />

                Instant Payment Confirmation

              </div>

              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">

                <CheckCircle2
                  size={14}
                  className="text-emerald-500"
                />

                Delivery Address Recorded

              </div>

              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">

                <CheckCircle2
                  size={14}
                  className="text-emerald-500"
                />

                GST Tax Invoice sent via Email

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}