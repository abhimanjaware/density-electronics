import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Loader2 } from 'lucide-react';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;
  const [loading, setLoading] = useState(false);

  if (!order) return <Navigate to="/" />;

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet connection.');
      setLoading(false);
      return;
    }

    // Razorpay Test Options (Replace with live key in production)
    const options = {
      key: "rzp_test_mockkeyid123", // Standard test key placeholder
      amount: Math.round(order.total * 100), // Amount in paise
      currency: "INR",
      name: "Density Electronics",
      description: `Order for ${order.items.length} item(s)`,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=150",
      handler: function (response) {
        // Payment successful - forward to invoice with real Razorpay Payment ID
        navigate('/order-ready', { 
          state: { 
            ...order, 
            utr: response.razorpay_payment_id || `RZP-SUCCESS-${Date.now()}`, 
            paymentStatus: 'PAID' 
          } 
        });
      },
      prefill: {
        name: order.customer.name,
        email: order.customer.email || "customer@density.digital",
        contact: order.customer.phone
      },
      theme: {
        color: "#2A1B54"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 animate-fade-in text-[#1A1726]">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 md:p-10 text-center">
        
        <div className="bg-[#F0EBF8] text-[#2A1B54] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>

        <h1 className="text-2xl font-black mb-2 tracking-tight">Razorpay Secure Checkout</h1>
        <p className="text-gray-500 font-medium mb-8 text-sm">
          You are paying <strong className="text-black">₹{order.total.toFixed(2)}</strong> via Razorpay Gateway (Supports UPI, Cards, NetBanking, & Bank Transfers).
        </p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left border border-gray-100 text-sm space-y-2">
          <div className="flex justify-between text-gray-500"><span>Customer:</span><span className="font-bold text-black">{order.customer.name}</span></div>
          <div className="flex justify-between text-gray-500"><span>Phone:</span><span className="font-bold text-black">{order.customer.phone}</span></div>
          <div className="flex justify-between text-gray-500"><span>Items Total:</span><span className="font-bold text-black">₹{order.total.toFixed(2)}</span></div>
        </div>

        <button 
          onClick={handleOnlinePayment} 
          disabled={loading}
          className="w-full bg-[#2A1B54] text-white font-bold py-4 rounded-xl hover:bg-[#1f1341] transition-all shadow-md flex justify-center items-center gap-2 text-base"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <CreditCard size={20} />}
          Pay Now with Razorpay
        </button>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-gray-400">
          <ShieldCheck size={14} className="text-green-600"/> 256-Bit Encrypted Gateway Connection
        </div>

      </div>
    </div>
  );
}