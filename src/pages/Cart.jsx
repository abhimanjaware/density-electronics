import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, ArrowLeft, ShoppingCart, Plus, Minus, 
  ShieldCheck, FileText, Download, Building2, Calculator, AlertCircle
} from 'lucide-react';
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

  const handleDownloadQuote = () => {
    window.print();
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[80vh] flex flex-col items-center justify-center font-sans px-4">
        <div className="bg-white border border-gray-200 p-10 sm:p-16 flex flex-col items-center text-center shadow-sm max-w-2xl w-full">
          <div className="w-20 h-20 bg-slate-100 flex items-center justify-center rounded-full mb-6 border border-slate-200">
            <Calculator size={32} className="text-slate-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-3">
            Requisition List is Empty
          </h2>
          <p className="text-gray-500 font-medium mb-8 text-sm sm:text-base max-w-md">
            No components or hardware have been added to your current Bill of Materials (BOM).
          </p>
          <Link to="/shop" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 font-black text-sm uppercase tracking-widest transition-colors shadow-sm rounded-sm flex items-center gap-2">
            <ShoppingCart size={18} /> Access Component Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24 pt-8 sm:pt-12 print:bg-white print:pt-0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-5 print:hidden">
          <div>
            <button 
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 text-xs font-black uppercase tracking-widest transition-colors mb-4"
            >
              <ArrowLeft size={16} strokeWidth={3} /> Continue Sourcing
            </button>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Procurement Draft
            </h1>
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-gray-500 bg-white border border-gray-200 px-4 py-2.5 shadow-sm rounded-sm">
            {cartItems.length} Unique Components Line Items
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Left: Professional B2B Table Layout */}
          <div className="w-full xl:w-2/3 bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden print:border-none print:shadow-none">
            
            {/* Desktop Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-100 border-b border-gray-200 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <div className="col-span-6">Component Specification</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-2 text-center">Order Qty</div>
              <div className="col-span-2 text-right">Extended Total</div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center px-4 py-6 sm:px-6 hover:bg-slate-50 transition-colors group">
                  
                  {/* Product Details */}
                  <div className="col-span-1 sm:col-span-6 flex items-start gap-4 sm:gap-5">
                    <Link to={getProductLink(item)} className="w-24 h-24 sm:w-28 sm:h-28 bg-white border border-gray-200 p-2 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    </Link>
                    
                    <div className="flex flex-col justify-center h-full pt-1">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-slate-600">MFG P/N: {item.specifications?.partNumber || item.id}</span>
                      </div>
                      <Link to={getProductLink(item)} className="text-[14px] sm:text-[15px] font-black text-slate-900 hover:text-orange-600 transition-colors leading-tight mb-2">
                        {item.name}
                      </Link>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Category: {item.category}
                      </div>
                      
                      {/* Mobile Pricing Details (Hidden on Desktop) */}
                      <div className="sm:hidden flex items-center gap-4 mt-1 border-t border-gray-100 pt-2 w-full">
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Unit Price</div>
                          <div className="text-slate-900 font-black text-sm">₹{item.price.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Extended</div>
                          <div className="text-orange-600 font-black text-sm">₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Unit Price */}
                  <div className="hidden sm:block col-span-2 text-right text-[15px] font-black text-slate-700">
                    ₹{item.price.toFixed(2)}
                  </div>

                  {/* Quantity Control & Remove */}
                  <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-center gap-4 mt-2 sm:mt-0 print:hidden">
                    <div className="flex items-center bg-white border-2 border-gray-300 rounded-md h-12 w-full sm:w-28 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-slate-900 hover:bg-gray-50 transition-colors font-black text-lg rounded-l-md">
                        <Minus size={16} strokeWidth={2.5}/>
                      </button>
                      <span className="w-10 text-center font-black text-base text-slate-900 border-x-2 border-gray-100 h-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-slate-900 hover:bg-gray-50 transition-colors font-black text-lg rounded-r-md">
                        <Plus size={16} strokeWidth={2.5}/>
                      </button>
                    </div>
                    
                    {/* Mobile Remove Button */}
                    <button onClick={() => updateQuantity(item.id, 0)} className="sm:hidden text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>

                  {/* Desktop Line Total & Remove */}
                  <div className="hidden sm:flex col-span-2 items-center justify-end gap-4">
                    <div className="text-[16px] font-black text-slate-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button onClick={() => updateQuantity(item.id, 0)} className="text-gray-300 hover:text-red-600 transition-colors ml-1 print:hidden" title="Remove Component">
                      <Trash2 size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer Actions */}
            <div className="bg-slate-50 px-6 py-5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-2 text-[11px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 border border-emerald-200 rounded-sm">
                <ShieldCheck size={16} /> 100% Genuine Components Guaranteed
              </div>
              <button onClick={() => cartItems.forEach(item => updateQuantity(item.id, 0))} className="text-[11px] font-black text-gray-500 hover:text-red-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                <Trash2 size={14} /> Clear Requisition List
              </button>
            </div>
          </div>

          {/* Right: B2B Order Summary Box */}
          <div className="w-full xl:w-1/3 bg-white rounded-sm border border-gray-200 shadow-sm sticky top-24 print:hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-[20px] font-black mb-6 text-slate-900 uppercase tracking-tight flex items-center gap-2.5 border-b border-gray-200 pb-5">
                <FileText size={24} className="text-orange-500" /> Quotation Summary
              </h2>

              {/* Optional PO Reference Input (UI Only for B2B feel) */}
              <div className="mb-6">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Purchase Order Reference (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. PO-2026-09-A" 
                  className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-900"
                />
              </div>
              
              <div className="space-y-4 text-[14px] mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold">Subtotal (Excl. Tax)</span>
                  <span className="font-black text-slate-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold flex items-center gap-1.5">
                    Logistics & Handling
                  </span>
                  <span className="font-black text-slate-900">
                    {shipping === 0 
                      ? <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest">Complimentary</span> 
                      : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[18px] font-black uppercase text-slate-900 tracking-tight">Total Value</span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Excludes GST (Added at Checkout)</span>
                  </div>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-[14px] uppercase tracking-widest py-4 rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Building2 size={18} /> Proceed to Checkout
                </button>

               
              </div>

            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-gray-200 text-center rounded-b-sm flex items-start sm:items-center justify-center gap-2">
              <AlertCircle size={14} className="text-gray-400 shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider text-left sm:text-center">
                18% GST Input Tax Credit invoice generated upon final payment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}