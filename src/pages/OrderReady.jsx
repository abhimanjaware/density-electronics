import { useLocation, Link, Navigate } from 'react-router-dom';
import { MessageCircle, CheckCircle, Copy, ArrowRight } from 'lucide-react';

export default function OrderReady() {
  const location = useLocation();
  const order = location.state;

  // Security: If someone visits this page directly without checking out, send them to home
  if (!order) return <Navigate to="/" />;

  // Configuration (Replace with your actual business details later)
  const BUSINESS_WHATSAPP = "910000000000"; // Include country code, no +
  const UPI_ID = "densityelectronics@sbi";
  
  // Format WhatsApp Message
  const generateWhatsAppMessage = () => {
    let msg = `*DENSITY ELECTRONICS — NEW ORDER*\n\n`;
    msg += `*Customer:* ${order.customer.name}\n`;
    msg += `*Phone:* ${order.customer.phone}\n`;
    msg += `*Payment:* ${order.paymentMethod.toUpperCase()}\n\n`;
    
    msg += `*Items:*\n`;
    order.items.forEach(item => {
      msg += `- ${item.quantity}x ${item.name} (₹${item.price})\n`;
    });
    
    msg += `\n*Subtotal:* ₹${order.subtotal}\n`;
    msg += `*Shipping:* ₹${order.shipping}\n`;
    msg += `*Total Amount:* ₹${order.total}\n\n`;
    
    msg += `*Delivery Address:*\n${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\n`;
    msg += `_I have completed the payment/will complete it shortly._`;

    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in text-[#1A1726]">
      <div className="text-center mb-10">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-black mb-3 tracking-tight">Order Prepared!</h1>
        <p className="text-gray-500 text-lg">One last step to confirm your order.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
        
        {/* Payment Instructions */}
        <div className="bg-[#12101A] p-8 text-white">
          <h2 className="text-xl font-bold mb-2">Payment Instructions</h2>
          <p className="text-gray-400 text-sm mb-6">Please complete your payment of <strong className="text-white">₹{order.total}</strong> using your selected method.</p>
          
          {order.paymentMethod === 'upi' ? (
            <div className="bg-white/10 p-5 rounded-xl border border-white/20">
              <div className="text-sm text-gray-300 mb-1">Our UPI ID:</div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black tracking-wider text-[#E1FF01]">{UPI_ID}</span>
                <button className="text-white hover:text-[#E1FF01] transition-colors"><Copy size={20}/></button>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 p-5 rounded-xl border border-white/20 grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-400 block">Bank Name</span><span className="font-bold">State Bank of India</span></div>
              <div><span className="text-gray-400 block">Account Name</span><span className="font-bold">Density Electronics</span></div>
              <div><span className="text-gray-400 block">Account No</span><span className="font-bold">0000111122223333</span></div>
              <div><span className="text-gray-400 block">IFSC Code</span><span className="font-bold">SBIN0001234</span></div>
            </div>
          )}
        </div>

        {/* WhatsApp CTA */}
        <div className="p-8 md:p-12 text-center bg-[#F0EBF8]">
          <h2 className="text-2xl font-black mb-3 text-[#2A1B54]">Confirm on WhatsApp</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto font-medium">
            Click the button below to securely send us your order details and payment screenshot on WhatsApp.
          </p>
          
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => { /* In future, you can clear the cart here */ }}
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-black text-lg hover:bg-[#20bd5a] transition-all hover:-translate-y-1 shadow-lg shadow-green-500/30"
          >
            <MessageCircle size={24} fill="currentColor" />
            Place Order via WhatsApp
            <ArrowRight size={20} />
          </a>
        </div>

      </div>
    </div>
  );
}