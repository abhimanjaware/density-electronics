import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  const [loading, setLoading] = useState(false);

  if (!order) return <Navigate to="/" />;

  // Load Razorpay Checkout SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Prevent loading the script multiple times
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');

      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // ----------------------------------------
      // 1. Load Razorpay Checkout
      // ----------------------------------------

      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        alert(
          'Razorpay could not be loaded. Please check your internet connection and try again.'
        );
        setLoading(false);
        return;
      }

      // ----------------------------------------
      // 2. Calculate amount in paise
      // ----------------------------------------

      const totalAmount = Number(order.total);

      if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
        alert('Invalid order amount.');
        setLoading(false);
        return;
      }

      const amountInPaise = Math.round(totalAmount * 100);

      if (amountInPaise < 100) {
        alert('Minimum payment amount is ₹1.');
        setLoading(false);
        return;
      }

      // ----------------------------------------
      // 3. Create Razorpay Order
      //    through Supabase Edge Function
      // ----------------------------------------

      const { data: orderData, error: orderError } =
        await supabase.functions.invoke('create-order', {
          body: {
            amount: amountInPaise,
          },
        });

      if (orderError) {
        console.error('Create order error:', orderError);
        throw new Error(
          'Unable to create payment order. Please try again.'
        );
      }

      if (!orderData?.order_id) {
        console.error('Invalid order response:', orderData);
        throw new Error(
          'Payment order could not be created. Please try again.'
        );
      }

      // ----------------------------------------
      // 4. Razorpay Checkout Configuration
      // ----------------------------------------

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        order_id: orderData.order_id,

        name: 'Density Electronics',
        description: `B2B Procurement Order (${order.items.length} items)`,
        image: 'https://ik.imagekit.io/t2r0vhpii/headerlogo33.png',

        prefill: {
          name: order.customer?.name || '',
          email: order.customer?.email || 'sales.densityelectronics@gmail.com',
          contact: order.customer?.phone || '',
        },

        theme: {
          color: '#ea580c',
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        // ----------------------------------------
        // 5. Razorpay Payment Success
        // ----------------------------------------

        handler: async function (response) {
          try {
            setLoading(true);

            console.log('Razorpay payment response:', response);

            // ----------------------------------------
            // 6. Verify payment through Supabase
            // ----------------------------------------

            const { data: verificationData, error: verificationError } =
              await supabase.functions.invoke('verify-payment', {
                body: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
              });

            if (verificationError) {
              console.error('Payment verification error:', verificationError);
              throw new Error(
                'Payment verification failed. Please contact support before trying again.'
              );
            }

            if (!verificationData?.success) {
              throw new Error(
                'Payment could not be verified. Please contact support.'
              );
            }

            // ----------------------------------------
            // 7. Only NOW mark the order as PAID
            // ----------------------------------------

            navigate('/order-ready', {
              state: {
                ...order,
                utr: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                paymentStatus: 'PAID',
              },
            });
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              error.message ||
                'Payment verification failed. Please contact support.'
            );
            setLoading(false);
          }
        },
      };

      // ----------------------------------------
      // 8. Open Razorpay
      // ----------------------------------------

      const paymentObject = new window.Razorpay(options);

      // Handle payment.failed event
      paymentObject.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response);
        alert(
          response?.error?.description || 'Payment failed. Please try again.'
        );
        setLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert(
        error.message || 'Unable to initialize payment. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-fade-in">
        
        {/* Header Area */}
        <div className="bg-[#1e293b] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-orange-500/20 text-orange-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 border border-orange-500/30 shadow-inner">
              <Lock size={32} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black mb-1 text-white tracking-tight uppercase">
              Secure Payment
            </h1>

            <p className="text-gray-400 font-medium text-sm">
              Complete your procurement via Razorpay
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                Billed To
              </span>
              <span className="font-black text-[#1e293b]">
                {order.customer?.name}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                Contact
              </span>
              <span className="font-black text-[#1e293b]">
                +91 {order.customer?.phone}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                Payable Amount
              </span>
              <span className="font-black text-orange-600 text-lg tracking-tight">
                ₹{Number(order.total).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handleOnlinePayment}
            disabled={loading}
            className={`w-full font-black text-sm uppercase tracking-widest py-4 rounded-sm shadow-md flex justify-center items-center gap-3 transition-all ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-500 hover:-translate-y-0.5 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Initializing Gateway...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Pay Money Securely
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-500" />
              256-Bit Encrypted Gateway
            </div>

            <div className="text-[10px] text-gray-400 font-medium">
              Accepts UPI, Cards, Netbanking & Wallets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}