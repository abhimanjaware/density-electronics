import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Star, Download, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState({});

  const handleAddToCart = (product) => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // Filter products based on URL params
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory && selectedCategory !== 'All' 
      ? product.category.toLowerCase() === selectedCategory.toLowerCase() 
      : true;

    const matchesSearch = searchParam
      ? product.name.toLowerCase().includes(searchParam.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(searchParam.toLowerCase()) ||
        product.specifications?.partNumber?.toLowerCase().includes(searchParam.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 font-sans">
      
      {/* 1. TOP CATALOG HEADER (Dark B2B Theme) */}
      <div className="bg-[#1e293b] border-b border-gray-800 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-orange-500 text-[11px] font-black mb-4 uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} strokeWidth={3} /> Back to previous
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-2 uppercase">
                {selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'Component Index'}
              </h1>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest border-l-2 border-orange-500 pl-3">
                {searchParam ? `Showing search results for "${searchParam}"` : 'Industrial-grade dev boards, sensors, and ICs.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-white bg-[#0f172a] px-5 py-2.5 border border-gray-700 shadow-inner">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Results:</div>
              <div className="text-2xl font-black text-orange-500 leading-none">{filteredProducts.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN B2B GRID AREA (Maximized Width, Minimal Padding) */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-6">
        
        {/* Dense Control Bar */}
        <div className="bg-white border border-gray-300 p-2.5 mb-5 flex items-center justify-between shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 ml-2">
            Displaying {filteredProducts.length} Components
          </span>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-600">
            <span>Sort By:</span>
            <select className="bg-gray-50 border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-orange-500 text-gray-900 font-bold cursor-pointer">
              <option>Best Match</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Availability</option>
            </select>
          </div>
        </div>

        {/* Dense Results Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-300 p-16 text-center shadow-sm">
            <div className="mx-auto w-16 h-16 bg-gray-100 flex items-center justify-center mb-4 border border-gray-200">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-black text-[#1e293b] uppercase tracking-tighter mb-2">0 Components Found</h3>
            <p className="text-gray-500 text-sm font-bold mb-6">No inventory matches your current search criteria.</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 font-black text-xs uppercase tracking-widest transition-colors shadow-sm"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredProducts.map((product) => {
              const isAdded = !!addedIds[product.id];
              const isOutOfStock = product.stock === 0;

              return (
                <div key={product.id} className="bg-white border border-gray-300 hover:border-orange-500 transition-colors flex flex-col relative group h-full shadow-sm text-left">
                  
                  {/* Availability Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    {product.stock > 0 ? (
                      <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase px-2 py-0.5 border border-emerald-200 shadow-sm flex items-center gap-1">
                        <CheckCircle2 size={10} /> In Stock
                      </span>
                    ) : (
                      <span className="bg-red-50 text-red-700 text-[9px] font-black uppercase px-2 py-0.5 border border-red-200 shadow-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Maximized Image Wrapper (Less padding, larger height) */}
                  <Link to={`/product/${product.slug}`} className="h-56 w-full p-2 flex items-center justify-center bg-white border-b border-gray-200 shrink-0">
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:opacity-85 transition-opacity" />
                  </Link>

                  {/* Condensed Data Area */}
                  <div className="p-3 flex flex-col flex-grow bg-gray-50/30">
                    
                    <div className="text-[9px] text-gray-500 font-bold font-mono mb-1.5 flex justify-between items-center uppercase tracking-wider">
                      <span>MFG P/N: {product.specifications?.partNumber || product.id}</span>
                    </div>

                    <Link to={`/product/${product.slug}`}>
                      <h4 className="font-black text-[13px] text-[#1e293b] group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight mb-2.5 min-h-[36px]">
                        {product.name}
                      </h4>
                    </Link>

                    {/* Dense B2B Specs */}
                    <ul className="text-[10px] text-gray-600 space-y-1 mb-3 border-l-2 border-orange-400 pl-2 font-medium">
                      <li><span className="font-bold text-gray-800">Stock:</span> {product.stock > 0 ? `${product.stock} Units Available` : 'Check Lead Time'}</li>
                      <li><span className="font-bold text-gray-800">MOQ:</span> 1 Piece</li>
                      <li><span className="font-bold text-gray-800">Compliance:</span> RoHS 3, Pb-Free</li>
                      <li className="flex items-center gap-1 text-blue-700 mt-1.5 hover:underline cursor-pointer font-bold">
                        <Download size={12} /> Tech Datasheet.pdf
                      </li>
                    </ul>

                    {/* Pricing & Action */}
                    <div className="mt-auto border-t border-gray-200 pt-2.5">
                      <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Unit Price (Ex. GST)</div>
                      
                      <div className="flex items-end justify-between mb-3">
                        <div className="text-xl font-black text-[#1e293b] tracking-tight">₹{product.price.toFixed(2)}</div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-orange-400 fill-orange-400" />)}
                        </div>
                      </div>

                      <button
                        disabled={isOutOfStock}
                        onClick={() => handleAddToCart(product)}
                        className={`w-full text-[11px] font-black uppercase tracking-widest py-2.5 transition-colors flex items-center justify-center gap-2 cursor-pointer border ${
                          isOutOfStock 
                            ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed' 
                            : isAdded 
                            ? 'bg-emerald-600 text-white border-emerald-700' 
                            : 'bg-orange-600 hover:bg-orange-700 text-white border-orange-700 shadow-sm'
                        }`}
                      >
                        <ShoppingCart size={14} />
                        {isOutOfStock ? "Unavailable" : isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}