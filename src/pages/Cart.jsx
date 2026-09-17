import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart, Plus, Minus, ShieldCheck, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function Cart() {
  const { cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 50; 
  const total = subtotal + shipping;

  // FIX FOR "PRODUCT NOT FOUND": 
  // If local storage has stale data, this actively fetches the fresh slug from the database using the ID.
  const getProductLink = (item) => {
    const freshProduct = products.find(p => p.id === item.id);
    return `/product/${freshProduct ? freshProduct.slug : item.slug}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#f8fafc] min-h-[80vh] flex flex-col items-center justify-center font-sans px-4">
        <div className="bg-white border border-gray-200 rounded-xl p-12 sm:p-16 flex flex-col items-center text-center shadow-sm max-w-2xl w-full">
          <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full mb-6 border border-gray-100">
            <ShoppingCart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] uppercase tracking-tight mb-3">
            Procurement Cart is Empty
          </h2>
          <p className="text-gray-500 font-medium mb-8 text-sm sm:text-base">
            You haven't added any components or hardware to your procurement list yet.
          </p>
          <Link to="/shop" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 font-black text-xs sm:text-sm uppercase tracking-widest transition-colors shadow-sm rounded-sm">
            Access Component Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-20 pt-8 sm:pt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-gray-300 pb-5">
          <div>
            <button 
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-orange-600 text-[11px] font-black uppercase tracking-widest transition-colors mb-3"
            >
              <ArrowLeft size={14} strokeWidth={3} /> Continue Sourcing
            </button>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tighter uppercase">
              Procurement Cart
            </h1>
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-gray-500 bg-white border border-gray-200 px-4 py-2 shadow-sm">
            {cartItems.length} Unique Components
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Left: Professional B2B Table Layout */}
          <div className="w-full xl:w-2/3 bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            
            {/* Desktop Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <div className="col-span-6">Component Details</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Line Total</div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center px-4 py-6 sm:px-6 hover:bg-gray-50/50 transition-colors">
                  
                  {/* Product Details */}
                  <div className="col-span-1 sm:col-span-6 flex items-start gap-4">
                    <Link to={getProductLink(item)} className="w-20 h-20 sm:w-24 sm:h-24 bg-white border border-gray-200 p-2 flex-shrink-0 group">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    </Link>
                    
                    <div className="flex flex-col justify-center h-full pt-1">
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <span>P/N: {item.specifications?.partNumber || item.id}</span>
                        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="hidden sm:inline-block">{item.category}</span>
                      </div>
                      <Link to={getProductLink(item)} className="text-[13px] sm:text-[15px] font-black text-[#1e293b] hover:text-orange-600 transition-colors leading-tight mb-2">
                        {item.name}
                      </Link>
                      <div className="sm:hidden text-[#1e293b] font-black text-sm mt-1">
                        ₹{item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Unit Price */}
                  <div className="hidden sm:block col-span-2 text-center text-[14px] font-bold text-gray-700">
                    ₹{item.price.toFixed(2)}
                  </div>

                  {/* Quantity Control & Remove */}
                  <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-center gap-4">
                    <div className="flex items-center bg-white border border-gray-300 rounded h-9 w-24 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                        <Minus size={14} strokeWidth={2.5}/>
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-[#1e293b] border-x border-gray-200 h-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                        <Plus size={14} strokeWidth={2.5}/>
                      </button>
                    </div>
                    
                    {/* Mobile Remove Button */}
                    <button onClick={() => updateQuantity(item.id, 0)} className="sm:hidden text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>

                  {/* Desktop Line Total & Remove */}
                  <div className="hidden sm:flex col-span-2 items-center justify-end gap-3">
                    <div className="text-[15px] font-black text-[#1e293b]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button onClick={() => updateQuantity(item.id, 0)} className="text-gray-300 hover:text-red-600 transition-colors ml-2" title="Remove Component">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                <ShieldCheck size={14} /> 100% Genuine Parts
              </div>
              <button onClick={() => cartItems.forEach(item => updateQuantity(item.id, 0))} className="text-[10px] font-bold text-gray-500 hover:text-red-600 uppercase tracking-widest transition-colors">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Right: B2B Order Summary Box */}
          <div className="w-full xl:w-1/3 bg-white rounded-lg border border-gray-200 shadow-sm sticky top-24">
            <div className="p-6">
              <h2 className="text-[18px] font-black mb-6 text-[#1e293b] uppercase tracking-tight flex items-center gap-2 border-b border-gray-200 pb-4">
                <FileText size={20} className="text-orange-500" /> Quotation Summary
              </h2>
              
              <div className="space-y-4 text-[14px] mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Subtotal (Excl. Tax)</span>
                  <span className="font-black text-[#1e293b]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Standard Shipping</span>
                  <span className="font-black text-[#1e293b]">
                    {shipping === 0 
                      ? <span className="text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest">Free</span> 
                      : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-5 mb-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[16px] font-black uppercase text-[#1e293b] tracking-tight">Total Value</span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Including Shipping</span>
                  </div>
                  <span className="text-3xl font-black text-orange-600 tracking-tight">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')} 
                className="w-full bg-[#1e293b] hover:bg-black text-white font-black text-[13px] uppercase tracking-widest py-4 rounded-sm transition-colors shadow-lg"
              >
                Proceed to Secure Checkout
              </button>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center rounded-b-lg">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                18% GST Invoice provided during checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}