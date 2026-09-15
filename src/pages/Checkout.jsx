import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, User, MapPin, CreditCard, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) navigate('/shop');
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 50; 
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '', saveInfo: true
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');

  useEffect(() => {
    const saved = localStorage.getItem('density_customer');
    if (saved) setFormData(prev => ({ ...prev, ...JSON.parse(saved), saveInfo: true }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.saveInfo) {
      const dataToSave = { ...formData };
      delete dataToSave.saveInfo; 
      localStorage.setItem('density_customer', JSON.stringify(dataToSave));
    } else {
      localStorage.removeItem('density_customer');
    }
    navigate('/order-ready', { state: { customer: formData, items: cartItems, total, shipping, subtotal, paymentMethod } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 animate-fade-in text-[#1A1726] h-[calc(100vh-90px)] flex flex-col">
      
      <div className="flex items-center justify-between mb-4">
        <Link to="/cart" className="inline-flex items-center text-sm font-bold text-[#2A1B54] hover:text-[#2563EB] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Return to Cart
        </Link>
        <h1 className="text-xl font-black tracking-tight">Secure Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
        
        {/* Left: Forms (Scrollable if screen is very small, but designed to fit) */}
        <div className="lg:col-span-2 space-y-4 overflow-y-auto pr-2 pb-4 custom-scrollbar">
          
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-sm font-black mb-3 flex items-center gap-2 border-b border-gray-100 pb-2"><User size={16} className="text-[#2A1B54]"/> Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <input required placeholder="Full Name *" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2A1B54]" />
              </div>
              <div>
                <input required placeholder="Mobile Number *" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2A1B54]" />
              </div>
              <div>
                <input placeholder="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2A1B54]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-sm font-black mb-3 flex items-center gap-2 border-b border-gray-100 pb-2"><MapPin size={16} className="text-[#2A1B54]"/> Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <input required placeholder="Complete Address *" type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2A1B54]" />
              </div>
              <div className="grid grid-cols-3 gap-3 md:col-span-2">
                <input required placeholder="City *" type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2A1B54] col-span-1" />
                <input required placeholder="State *" type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2A1B54] col-span-1" />
                <input required placeholder="Pincode *" type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2A1B54] col-span-1" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-sm font-black mb-3 flex items-center gap-2 border-b border-gray-100 pb-2"><CreditCard size={16} className="text-[#2A1B54]"/> Payment Method</h2>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#2A1B54] bg-[#F0EBF8]' : 'border-gray-200'}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-4 h-4 accent-[#2A1B54]" />
                <span className="text-sm font-bold text-[#1A1726]">UPI Payment</span>
              </label>
              <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-[#2A1B54] bg-[#F0EBF8]' : 'border-gray-200'}`}>
                <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="w-4 h-4 accent-[#2A1B54]" />
                <span className="text-sm font-bold text-[#1A1726]">Bank Transfer</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Summary Sidebar */}
        <div className="bg-[#12101A] text-white rounded-2xl border border-gray-800 p-6 shadow-xl h-fit flex flex-col">
          <h2 className="text-lg font-black mb-4 border-b border-gray-800 pb-3">Order Details</h2>
          
          <div className="space-y-3 mb-4 overflow-y-auto max-h-[150px] custom-scrollbar pr-2 text-sm border-b border-gray-800 pb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-400 truncate pr-2">{item.quantity}x {item.name}</span>
                <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm mb-4 border-b border-gray-800 pb-4">
            <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span className="font-bold">₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Shipping</span><span className="font-bold">{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span></div>
          </div>
          
          <div className="flex justify-between items-end mb-6">
            <span className="text-base font-bold">Total</span>
            <span className="text-2xl font-black text-[#937EE6]">₹{total.toFixed(2)}</span>
          </div>

          <button type="submit" className="w-full bg-[#E1FF01] text-[#1A1726] font-bold py-3.5 rounded-lg hover:bg-[#cbe600] transition-all flex justify-center items-center gap-2">
            Confirm Order <ShieldCheck size={18}/>
          </button>
        </div>

      </form>
    </div>
  );
}