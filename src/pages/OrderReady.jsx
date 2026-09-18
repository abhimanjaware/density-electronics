import { useEffect, useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { CheckCircle, Download, MessageCircle, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

export default function OrderReady() {
  const location = useLocation();
  const order = location.state;
  const { clearCart } = useCart();
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (order && !notified) {
      // 1. Empty the frontend cart
      clearCart();
      
      // 2. Trigger the backend to send automated Emails & WhatsApp
      supabase.functions.invoke('send-notifications', {
        body: { order }
      }).then(() => setNotified(true))
        .catch(err => console.error("Notification error:", err));
    }
  }, [order, clearCart, notified]);

  if (!order) return <Navigate to="/" />;

  // Frontend WhatsApp Fallback (No API required)
  const waMessage = encodeURIComponent(
    `*New Order from Density Electronics*\n\n` +
    `*Customer:* ${order.customer.name}\n` +
    `*Contact:* ${order.customer.phone}\n` +
    `*Amount Paid:* ₹${order.total}\n` +
    `*UTR / Payment ID:* ${order.utr}\n\n` +
    `Please check the dashboard for complete item details.`
  );
  const ownerWhatsAppURL = `https://wa.me/919890400165?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Success Header */}
        <div className="bg-emerald-600 p-8 text-center text-white">
          <CheckCircle size={64} className="mx-auto mb-4 text-emerald-200" />
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Order Successful</h1>
          <p className="text-emerald-100 font-medium">Your payment has been verified.</p>
        </div>

        {/* Invoice Details */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <span className="block text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Transaction ID</span>
              <span className="font-mono font-bold text-gray-800">{order.utr}</span>
            </div>
            <div>
              <span className="block text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Amount Paid</span>
              <span className="font-black text-emerald-600 text-lg">₹{Number(order.total).toFixed(2)}</span>
            </div>
            <div>
              <span className="block text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Billed To</span>
              <span className="font-bold text-gray-800">{order.customer.name}</span>
            </div>
            <div>
              <span className="block text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Email Sent To</span>
              <span className="font-bold text-gray-800">{order.customer.email}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <a 
              href={ownerWhatsAppURL} 
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={20} /> Notify Owner via WhatsApp
            </a>
            
            <Link to="/" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Home size={20} /> Return to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}