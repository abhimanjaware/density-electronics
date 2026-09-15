import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 50; 
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in flex flex-col justify-center h-[calc(100vh-100px)]">
        <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-[#F0EBF8] text-[#2A1B54] p-6 rounded-full mb-6">
            <ShoppingBag size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-black text-[#1A1726] mb-4">Your cart is empty</h2>
          <Link to="/shop" className="bg-[#2A1B54] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#1f1341] transition-all">
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 animate-fade-in text-[#1A1726] h-[calc(100vh-90px)] flex flex-col">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/shop" className="inline-flex items-center text-sm font-bold text-[#2A1B54] hover:text-[#2563EB] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Shop
        </Link>
        <h1 className="text-2xl font-black tracking-tight">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow overflow-hidden">
        
        {/* Left: Cart Items List (Scrollable internally) */}
        <div className="lg:col-span-2 space-y-3 overflow-y-auto pr-2 custom-scrollbar pb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm">
              <Link to={`/product/${item.slug}`} className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 flex items-center justify-center p-2">
                <img src={item.image} alt={item.name} className="object-cover mix-blend-multiply" />
              </Link>
              
              <div className="flex-grow">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{item.category}</div>
                <Link to={`/product/${item.slug}`} className="text-sm font-bold text-[#1A1726] hover:text-[#2563EB] line-clamp-1">
                  {item.name}
                </Link>
                <div className="text-[#2A1B54] font-black mt-1 text-lg">₹{item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg h-9 w-24 shadow-sm">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                    <Minus size={14} strokeWidth={2.5}/>
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                    <Plus size={14} strokeWidth={2.5}/>
                  </button>
                </div>
                
                <button onClick={() => updateQuantity(item.id, 0)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-full hover:bg-red-50" title="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary (Fixed) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit flex flex-col">
          <h2 className="text-lg font-black mb-4 text-[#1A1726]">Order Summary</h2>
          
          <div className="space-y-3 text-sm mb-4 border-b border-gray-100 pb-4">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Shipping</span>
              <span className="font-bold">{shipping === 0 ? <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">FREE</span> : `₹${shipping.toFixed(2)}`}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-6">
            <span className="text-base font-bold">Total</span>
            <span className="text-2xl font-black text-[#2A1B54]">₹{total.toFixed(2)}</span>
          </div>

          <button onClick={() => navigate('/checkout')} className="w-full bg-[#2A1B54] text-white font-bold py-3.5 rounded-xl hover:bg-[#1f1341] transition-all shadow-md">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}