import { useEffect, useRef } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Home, Download, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderReady() {
  const location = useLocation();
  const order = location.state;
  const { clearCart } = useCart();
  const invoiceRef = useRef(null);
  const cartClearedRef = useRef(false);
  const autoPrintRef = useRef(false);

  // Clear cart exactly once when this page loads successfully
  useEffect(() => {
    if (order && !cartClearedRef.current) {
      cartClearedRef.current = true;
      clearCart();
    }
  }, [order, clearCart]);

  useEffect(() => {
    if (!order || autoPrintRef.current) return undefined;

    autoPrintRef.current = true;
    const printTimer = window.setTimeout(() => window.print(), 800);
    return () => window.clearTimeout(printTimer);
  }, [order]);

  if (!order) return <Navigate to="/" />;

  const handlePrintPDF = () => window.print();

  // --- Enterprise WhatsApp Formatter ---
  const generateWhatsAppMessage = () => {
    const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const itemsText = order.items.map(item => 
      `▪ *${item.name}*\n  Part No: ${item.id || 'N/A'}\n  Qty: ${item.quantity} | Total: ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n\n');

    return encodeURIComponent(
      `*DENSITY ELECTRONICS | ORDER CONFIRMATION*\n` +
      `====================================\n\n` +
      `*TRANSACTION DETAILS*\n` +
      `• Status: ✅ PAYMENT VERIFIED\n` +
      `• Ref/UTR ID: ${order.utr}\n` +
      `• Date: ${date}\n\n` +
      `*BILLED TO*\n` +
      `• ${order.customer.name}\n` +
      `• ${order.customer.phone}\n` +
      `• ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\n` +
      `*ORDER MANIFEST*\n` +
      `------------------------------------\n` +
      `${itemsText}\n` +
      `------------------------------------\n\n` +
      `*FINANCIAL SUMMARY*\n` +
      `• Subtotal: ₹${Number(order.total).toFixed(2)}\n` +
      `• Taxes (GST): Included\n` +
      `• *Total Settled: ₹${Number(order.total).toFixed(2)}*\n\n` +
      `_This is an automated enterprise dispatch receipt. Please reply directly to this thread for institutional support._`
    );
  };

  const ownerWhatsAppURL = `https://wa.me/919890400165?text=${generateWhatsAppMessage()}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 print:bg-white print:py-0">
      
      {/* NO-PRINT ZONE */}
      <div className="max-w-4xl w-full mb-6 print:hidden">
        <div className="bg-emerald-600 rounded-xl p-8 text-center text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <CheckCircle2 size={64} className="mx-auto mb-4 text-emerald-200" strokeWidth={2} />
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Order Confirmed</h1>
            <p className="text-emerald-100 font-medium text-lg mb-2">Your payment has been successfully verified.</p>
            <p className="text-emerald-100 font-medium mb-4">Your order confirmation and invoice have been emailed to your inbox.</p>
            
            <div className="inline-block bg-emerald-700/50 border border-emerald-500 rounded px-4 py-2 text-sm font-bold tracking-wide">
              Order reference: {order.orderReference || 'Pending'}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handlePrintPDF}
            className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <Download size={20} /> Save Invoice as PDF
          </button>
          
          <a
            href={ownerWhatsAppURL} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <MessageCircle size={20} /> Need Help? Chat with Support on WhatsApp
          </a>
        </div>
      </div>

      {/* THE INVOICE DOCUMENT (For printing/local saving) */}
      <div 
        ref={invoiceRef}
        className="max-w-4xl w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden print:shadow-none print:border-none print:w-full"
      >
        <div className="p-8 md:p-12 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#1e293b] mb-4">
              <Building2 size={32} className="text-orange-600" />
              <span className="text-2xl font-black tracking-tighter uppercase">Density Electronics</span>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
              Sinhgad Law College road, Ambegaon<br />
              Pune, Maharashtra, 411041<br />
              GSTIN: 27AAAAA0000A1Z5<br />
              sales.densityelectronics@gmail.com
            </p>
          </div>
          
          <div className="text-left md:text-right">
            <h2 className="text-4xl font-black text-gray-200 uppercase tracking-widest mb-4">Invoice</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Transaction ID</p>
            <p className="text-gray-900 font-mono font-bold mb-4">{order.orderReference || order.utr}</p>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Date</p>
            <p className="text-gray-900 font-bold">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="p-8 md:p-12 border-b border-gray-100 bg-gray-50 print:bg-white">
          <p className="text-orange-600 text-xs font-black uppercase tracking-widest mb-3">Billed To</p>
          <h3 className="text-xl font-black text-gray-900 uppercase mb-2">{order.customer.name}</h3>
          <p className="text-gray-600 font-medium text-sm leading-relaxed max-w-sm">
            {order.customer.address}<br />
            {order.customer.city}, {order.customer.state} - {order.customer.pincode}<br />
            Phone: {order.customer.phone}<br />
            Email: {order.customer.email}
          </p>
        </div>

        <div className="p-8 md:p-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 text-xs font-black text-gray-500 uppercase tracking-widest w-1/2">Item Description</th>
                  <th className="py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-center">Qty</th>
                  <th className="py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Price</th>
                  <th className="py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-6 pr-4">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-1">Part No: {item.id || 'N/A'}</p>
                    </td>
                    <td className="py-6 text-center font-bold text-gray-700">{item.quantity}</td>
                    <td className="py-6 text-right font-medium text-gray-600">₹{Number(item.price).toFixed(2)}</td>
                    <td className="py-6 text-right font-black text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-1/2 lg:w-1/3 space-y-3">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span>₹{Number(order.total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium border-b border-gray-200 pb-3">
                <span>Tax (GST)</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-sm font-black text-gray-900 uppercase tracking-wider">Total Paid</span>
                <span className="text-3xl font-black text-emerald-600">₹{Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] text-center py-6 px-8 print:bg-white print:text-gray-500 print:border-t">
          <p className="text-gray-400 text-sm font-medium">
            Thank you for sourcing with Density Electronics. This is a computer-generated invoice.
          </p>
        </div>
      </div>

      <div className="mt-8 print:hidden">
        <Link to="/" className="text-gray-500 font-bold hover:text-orange-600 flex items-center gap-2 transition-colors">
          <Home size={20} /> Return to Shop
        </Link>
      </div>

    </div>
  );
}