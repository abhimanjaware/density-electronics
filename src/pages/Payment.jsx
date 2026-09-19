import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  const [loading, setLoading] = useState(false);

  if (!order) return <Navigate to="/" />;

  // Load Razorpay Checkout SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
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

      // 1. Load Razorpay Checkout
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast.error('Payment gateway unavailable. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // 2. Validate & Calculate Amount
      const totalAmount = Number(order.total);
      if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
        toast.error('Invalid order total. Please review your cart.');
        setLoading(false);
        return;
      }

      const amountInPaise = Math.round(totalAmount * 100);
      if (amountInPaise < 100) {
        toast.error('Minimum payment amount is ₹1.');
        setLoading(false);
        return;
      }

      // 3. Generate Secure Order ID via Backend
      toast.loading('Connecting to secure payment gateway...', { id: 'payment-init' });
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-order', {
        body: { amount: amountInPaise },
      });

      if (orderError || !orderData?.order_id) {
        console.error('Order generation failure:', orderError);
        const functionMessage = orderError?.context?.error?.error || orderError?.message;
        toast.error(functionMessage || 'Could not start payment. Please try again.', { id: 'payment-init' });
        setLoading(false);
        return;
      }
      toast.dismiss('payment-init');

      // 4. Razorpay Checkout Configuration
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        order_id: orderData.order_id,
        name: 'Density Electronics',
        description: `Order Payment (${order.items.length} items)`,
        image: 'https://ik.imagekit.io/t2r0vhpii/headerlogo33.png',
        
        prefill: {
          name: order.customer?.name || '',
          email: order.customer?.email || 'sales.densityelectronics@gmail.com',
          contact: order.customer?.phone || '',
        },

        theme: {
          color: '#1e293b', 
        },

        modal: {
          ondismiss: () => {
            toast('Payment cancelled.', { icon: 'ℹ️' });
            setLoading(false);
          },
        },

        // 5. Success Handler
        handler: async function (response) {
          try {
            setLoading(true);
            toast.loading('Confirming your payment...', { id: 'payment-verify' });

            const { data: verificationData, error: verificationError } = await supabase.functions.invoke('verify-payment', {
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            if (verificationError || !verificationData?.success) {
              console.error('Signature mismatch:', verificationError);
              throw new Error('Payment confirmation failed. Please contact support.');
            }

            toast.success('Payment successful!', { id: 'payment-verify' });

            // 6. Route to success page
            navigate('/order-ready', {
              state: {
                ...order,
                utr: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                paymentStatus: 'PAID',
              },
            });
          } catch (error) {
            toast.error(error.message || 'Payment confirmation failed. Please contact support.', { id: 'payment-verify' });
            setLoading(false);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on('payment.failed', function (response) {
        console.error('Gateway rejection:', response);
        toast.error(response?.error?.description || 'Payment was declined by the bank.');
        setLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error('Initialization fault:', error);
      toast.error('Unable to open payment window. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24 pt-6 sm:pt-10">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8 border-b border-gray-200 pb-5">
          <button 
            onClick={() => navigate(-1)}
            disabled={loading}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 text-xs font-black uppercase tracking-widest transition-colors mb-4 disabled:opacity-50"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Back to Checkout
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              Complete Payment
            </h1>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-sm shadow-sm">
              <ShieldCheck size={16} /> 100% Secure Checkout
            </div>
          </div>
        </div>

        {/* Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Summary */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-slate-100 px-6 py-4 border-b border-gray-200 flex items-center gap-2.5">
              <Receipt size={20} className="text-slate-600" />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Order Summary</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">Billed To:</span>
                <span className="font-black text-slate-900">{order.customer?.companyName || order.customer?.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">Items Count:</span>
                <span className="font-black text-slate-900">{order.items?.length} Products</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                <span className="text-gray-500 font-bold">Delivery Location:</span>
                <span className="font-bold text-slate-700">{order.customer?.city}, {order.customer?.state}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-6 flex justify-between items-end text-white">
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount to Pay</span>
                <span className="text-3xl font-black tracking-tight text-orange-400">₹{Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Trigger Box */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                Pay Online Securely
              </h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Click below to open our secure payment window. You can pay using <span className="text-slate-900 font-bold">UPI, Netbanking, Credit/Debit Card, or Wallets</span>.
              </p>
            </div>

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
                  <Loader2 className="animate-spin" size={18} /> Opening Secure Window...
                </>
              ) : (
                <>
                  <CreditCard size={18} /> Proceed to Pay ₹{Number(order.total).toFixed(2)}
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-500" /> Instant Payment Confirmation
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-500" /> GST Tax Invoice sent via Email
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}