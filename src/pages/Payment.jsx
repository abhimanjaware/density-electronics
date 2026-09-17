import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Loader2, ArrowRight } from 'lucide-react';

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

    // Razorpay Configuration
    const options = {
      key: "rzp_test_mockkeyid123", // Replace with your actual Razorpay Key
      amount: Math.round(order.total * 100), // Amount in paise
      currency: "INR",
      name: "Density Electronics",
      description: `B2B Procurement Order (${order.items.length} items)`,
      // IMPORTANT: The logo URL must be a publicly accessible web link (e.g., ImageKit or S3), not a local file path.
      image: "https://ik.imagekit.io/t2r0vhpii/headerlogo33.png", 
      
      // THIS CONFIGURATION RESTRICTS RAZORPAY TO UPI & NETBANKING ONLY
      config: {
        display: {
          blocks: {
            upi: {
              name: "UPI",
              instruments: [
                { method: "upi" }
              ]
            },
            netbanking: {
              name: "Netbanking",
              instruments: [
                { method: "netbanking" }
              ]
            }
          },
          sequence: ["block.upi", "block.netbanking"],
          preferences: {
            show_default_blocks: false // Hides Cards, Wallets, PayLater, and EMI
          }
        }
      },
      handler: function (response) {
        // Payment successful - forward to invoice
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
        email: order.customer.email || "sales.densityelectronics@gmail.com",
        contact: order.customer.phone
      },
      theme: {
        color: "#ea580c" // Density Electronics Orange
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-fade-in">
        
        {/* Header Area */}
        <div className="bg-[#1e293b] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px]"></div>
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
              <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">Billed To</span>
              <span className="font-black text-[#1e293b]">{order.customer.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">Contact</span>
              <span className="font-black text-[#1e293b]">+91 {order.customer.phone}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">Payable Amount</span>
              <span className="font-black text-orange-600 text-lg tracking-tight">₹{order.total.toFixed(2)}</span>
            </div>
          </div>

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
              <><Loader2 className="animate-spin" size={20} /> Initializing Gateway...</>
            ) : (
              <><CreditCard size={20} /> Pay Money Securely <ArrowRight size={18} /></>
            )}
          </button>

          <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-500"/> 256-Bit Encrypted Gateway
            </div>
            <div className="text-[10px] text-gray-400 font-medium">
              Accepts UPI Apps (GPay, PhonePe, Paytm) & Netbanking
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}