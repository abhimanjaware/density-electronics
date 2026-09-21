import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Star, ShoppingCart, ShieldCheck, 
  Truck, CheckCircle2, Factory, Zap, FileText 
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  const [quantity, setQuantity] = useState(1);

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">Component Not Found</h2>
        <Link to="/shop" className="bg-orange-600 hover:bg-orange-500 transition-colors text-white font-bold text-sm uppercase tracking-widest px-8 py-3 rounded-md shadow-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('Component currently out of stock.');
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.name.substring(0, 20)}... added to cart!`);
  };

  const handleDirectCheckout = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-4 sm:pt-6 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 px-1 sm:px-0">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-600 text-[11px] sm:text-xs font-black uppercase tracking-widest transition-colors w-fit"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Back to Catalog
          </button>

          <div className="text-[10px] sm:text-xs font-bold text-gray-400 flex items-center flex-wrap gap-1.5 sm:gap-2 uppercase tracking-wider">
            <Link to="/" className="hover:text-slate-900 transition-colors hidden xs:block">Home</Link>
            <span className="text-gray-300 hidden xs:block">/</span>
            <Link to="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
            <span className="text-gray-300">/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-900 transition-colors">
              {product.category}
            </Link>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT: Product Image Gallery */}
          <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white p-6 sm:p-8 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <img 
              src={product.image} 
              alt={product.name} 
              fetchPriority="high"
              className="aspect-square w-full max-h-[350px] object-contain mb-6"
            />
            {/* Thumbnail indicator */}
            <div className="flex gap-3 justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-orange-500 rounded-md p-1 bg-white cursor-pointer shadow-sm">
                <img src={product.image} alt="thumb" loading="lazy" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* RIGHT: Procurement Data */}
          <div className="w-full lg:w-7/12 flex flex-col p-5 sm:p-10 lg:p-12">
            
            {/* Header Area */}
            <div className="mb-5 sm:mb-6 border-b border-gray-100 pb-5 sm:pb-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <span className="bg-slate-100 text-slate-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm border border-slate-200">
                  {product.category}
                </span>
                {isOutOfStock ? (
                  <span className="bg-red-50 text-red-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm border border-red-200">
                    Check Lead Time
                  </span>
                ) : (
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 size={12} strokeWidth={3} /> In Stock
                  </span>
                )}
              </div>
              
              <h1 className="text-[22px] leading-[1.1] sm:text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                {product.name}
              </h1>

              <div className="flex flex-col xs:flex-row xs:items-center justify-between w-full gap-2">
                <div className="text-[11px] sm:text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                  MFG P/N: <span className="text-slate-900">{product.specifications?.partNumber || product.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                  ))}
                  <span className="text-[11px] sm:text-xs font-bold text-gray-400 ml-1.5">Verified</span>
                </div>
              </div>
            </div>

            {/* Middle Data Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h4 className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-widest mb-2 sm:mb-3 border-b border-gray-100 pb-2">Quick Specs</h4>
                <ul className="text-[13px] sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2 font-medium">
                  <li className="flex justify-between"><span>Brand:</span> <span className="text-slate-900 font-bold">Density</span></li>
                  <li className="flex justify-between"><span>MOQ:</span> <span className="text-slate-900 font-bold">1 Unit</span></li>
                  <li className="flex justify-between"><span>Compliance:</span> <span className="text-slate-900 font-bold">RoHS 3, Pb-Free</span></li>
                  <li className="flex justify-between"><span>Condition:</span> <span className="text-slate-900 font-bold">Factory New</span></li>
                </ul>
              </div>
              <div className="bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-gray-100">
                <h4 className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-widest mb-2 sm:mb-3 sm:border-b border-gray-100 sm:pb-2">Pricing</h4>
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">₹ {product.price.toFixed(2)}</span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4 sm:mb-0">Unit Price (Exclusive of GST)</span>
              </div>
            </div>

            {/* UNIFIED ACTION BOX (Visible on all devices, normally placed) */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5 bg-white sm:bg-slate-50 border border-gray-200 shadow-sm sm:shadow-none rounded-xl p-4 sm:p-6 mb-6 mt-auto">
              
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-gray-300 rounded-lg h-14 lg:h-16 bg-white w-full lg:w-36 shrink-0 shadow-sm sm:shadow-none">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full text-gray-500 hover:text-slate-900 font-black text-xl hover:bg-gray-50 transition-colors rounded-l-lg">-</button>
                <span className="w-16 lg:w-12 text-center text-lg font-black text-slate-900">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full text-gray-500 hover:text-slate-900 font-black text-xl hover:bg-gray-50 transition-colors rounded-r-lg">+</button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 h-14 lg:h-16 px-4 py-4 font-black text-[14px] lg:text-[15px] uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2.5 border-2 ${
                    isOutOfStock 
                      ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed' 
                      : 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200 hover:border-orange-500 shadow-sm'
                  }`}
                >
                  <ShoppingCart size={28} strokeWidth={2.5} /> Add to Order
                </button>
                
                <button
                  onClick={handleDirectCheckout}
                  disabled={isOutOfStock}
                  className={`flex-1 h-4 lg:h-16 px-4 py-4 font-black text-[14px] lg:text-[15px] uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2.5 shadow-xl ${
                    isOutOfStock 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none border-0' 
                      : 'bg-slate-900 hover:bg-orange-600 text-white active:scale-95 shadow-slate-900/20 hover:shadow-orange-600/30'
                  }`}
                >
                  Checkout <ArrowRight size={28} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest gap-2">
              <span>For bulk quantities (+500 units):</span>
              <Link to="/bulk" className="text-[#2563eb] hover:text-blue-700 underline w-fit">Request BOM Quote</Link>
            </div>

            {/* B2B Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100 mt-4 sm:mt-6">
              <div className="flex items-center sm:flex-col sm:items-center sm:text-center gap-2.5 sm:gap-2 text-[11px] sm:text-xs text-gray-600 font-bold tracking-wide">
                <ShieldCheck size={22} className="text-slate-400 shrink-0" />
                100% Genuine
              </div>
              <div className="flex items-center sm:flex-col sm:items-center sm:text-center gap-2.5 sm:gap-2 text-[11px] sm:text-xs text-gray-600 font-bold tracking-wide">
                <Truck size={22} className="text-slate-400 shrink-0" />
                Fast Dispatch
              </div>
              <div className="flex items-center sm:flex-col sm:items-center sm:text-center gap-2.5 sm:gap-2 text-[11px] sm:text-xs text-gray-600 font-bold tracking-wide">
                <Zap size={22} className="text-slate-400 shrink-0" />
                ESD Packaging
              </div>
              <div className="flex items-center sm:flex-col sm:items-center sm:text-center gap-2.5 sm:gap-2 text-[11px] sm:text-xs text-gray-600 font-bold tracking-wide">
                <Factory size={22} className="text-slate-400 shrink-0" />
                Inst. POs Accepted
              </div>
            </div>

          </div>
        </div>

        {/* DETAILED DESCRIPTION SECTION */}
        {product.detailedDescription && product.detailedDescription.toLowerCase() !== "nan" && (
          <div className="mt-6 sm:mt-8 bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-12 mb-6">
            <div className="flex items-center gap-3 mb-5 sm:mb-6 border-b border-gray-100 pb-4">
              <FileText className="text-orange-500" size={24} />
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                Technical Specifications & Details
              </h2>
            </div>
            
            <div className="text-gray-600 leading-relaxed font-medium whitespace-pre-wrap text-[13px] sm:text-base max-w-4xl">
              {product.detailedDescription}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}