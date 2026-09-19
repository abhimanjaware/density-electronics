import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Star, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import toast from 'react-hot-toast';

// VITE DEPLOYMENT FIX: Images inside src/assets MUST be imported to work in production
import stampImg from '../assets/stamp.png';

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState({});
  const [sortType, setSortType] = useState('Best Match');

  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      toast.error('This item is currently out of stock.');
      return;
    }
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    toast.success(`${product.name.substring(0, 20)}... added to cart!`);
    
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // 1. Filter products based on URL params
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

  // 2. Sort the filtered products based on the dropdown selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Availability':
        // Puts higher stock (in-stock) items before 0 stock (out-of-stock) items
        return b.stock - a.stock;
      case 'Best Match':
      default:
        return 0; // Keeps default array order
    }
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
            
            <div className="flex items-center gap-4 text-white bg-[#0f172a] px-5 py-2.5 border border-gray-700 shadow-inner rounded-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Results:</div>
              <div className="text-2xl font-black text-orange-500 leading-none">{sortedProducts.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN B2B GRID AREA */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-6">
        
        {/* Dense Control Bar */}
        <div className="bg-white border border-gray-300 p-2.5 mb-5 flex items-center justify-between shadow-sm rounded-sm">
          <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 ml-2">
            Displaying {sortedProducts.length} Components
          </span>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-600">
            <span className="hidden sm:inline">Sort By:</span>
            <select 
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="bg-gray-50 border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-orange-500 text-gray-900 font-bold cursor-pointer rounded-sm"
            >
              <option value="Best Match">Best Match</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Availability">Availability</option>
            </select>
          </div>
        </div>

        {/* Dense Results Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-300 p-16 text-center shadow-sm rounded-lg">
            <div className="mx-auto w-16 h-16 bg-gray-100 flex items-center justify-center mb-4 border border-gray-200 rounded-full">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-black text-[#1e293b] uppercase tracking-tighter mb-2">0 Components Found</h3>
            <p className="text-gray-500 text-sm font-bold mb-6">No inventory matches your current search criteria.</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 font-black text-xs uppercase tracking-widest transition-colors shadow-sm rounded-md"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {sortedProducts.map((product) => {
              const isAdded = !!addedIds[product.id];
              const isOutOfStock = product.stock === 0;

              return (
                <div key={product.id} className="bg-white border border-gray-300 hover:border-orange-500 transition-colors flex flex-col relative group h-full shadow-sm text-left rounded-lg overflow-hidden">
                  
                  {/* Availability Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    {product.stock > 0 ? (
                      <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase px-2 py-0.5 border border-emerald-200 shadow-sm flex items-center gap-1 rounded-sm">
                        <CheckCircle2 size={10} strokeWidth={3} /> In Stock
                      </span>
                    ) : (
                      <span className="bg-red-50 text-red-700 text-[9px] font-black uppercase px-2 py-0.5 border border-red-200 shadow-sm rounded-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Maximized Image Wrapper */}
                  <div className="relative h-48 sm:h-56 w-full p-3 flex items-center justify-center bg-white border-b border-gray-200 shrink-0">
                    <img 
                      src={stampImg} 
                      alt="Density Electronics" 
                      loading="lazy"
                      className="absolute top-2 right-2 w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-[0_4px_12px_rgba(15,23,42,0.12)] z-10"
                    />

                    <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                      <img src={product.image} alt={product.name} loading="lazy" fetchPriority="low" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 will-change-transform" />
                    </Link>
                  </div>

                  {/* Condensed Data Area */}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow bg-gray-50/30">
                    
                    <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold font-mono mb-1.5 flex justify-between items-center uppercase tracking-wider">
                      <span className="truncate">MFG P/N: {product.specifications?.partNumber || product.id}</span>
                    </div>

                    <Link to={`/product/${product.slug}`}>
                      <h4 className="font-black text-[12px] sm:text-[13px] text-[#1e293b] group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight mb-2.5 min-h-[36px]">
                        {product.name}
                      </h4>
                    </Link>

                    {/* Dense B2B Specs */}
                    <ul className="text-[9px] sm:text-[10px] text-gray-600 space-y-1 mb-4 border-l-2 border-orange-400 pl-2 font-medium">
                      <li><span className="font-bold text-gray-800">Stock:</span> {product.stock > 0 ? `${product.stock} Units Available` : 'Check Lead Time'}</li>
                      <li><span className="font-bold text-gray-800">MOQ:</span> 1 Piece</li>
                      <li className="hidden sm:block"><span className="font-bold text-gray-800">Compliance:</span> RoHS 3, Pb-Free</li>
                    </ul>

                    {/* Pricing & Action */}
                    <div className="mt-auto border-t border-gray-200 pt-3">
                      <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Unit Price (Ex. GST)</div>
                      
                      <div className="flex items-end justify-between mb-3">
                        <div className="text-lg sm:text-xl font-black text-[#1e293b] tracking-tight">₹{product.price.toFixed(2)}</div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-orange-400 fill-orange-400" />)}
                        </div>
                      </div>

                      <button
                        disabled={isOutOfStock}
                        onClick={() => handleAddToCart(product)}
                        className={`w-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest py-2.5 sm:py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer border rounded-md ${
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