import { useState, useRef, useEffect } from 'react';
import { 
  Search, ChevronDown, ShoppingCart, Menu, User, Heart 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function Header() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const matches = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.specifications?.partNumber?.toLowerCase().includes(query)
      ).slice(0, 6);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50 shadow-2xl">
      
      {/* 1. TOP MAIN HEADER (Deep Dark Navy) */}
      <div className="bg-[#050b14] text-white border-b border-gray-800/50">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-8">
          
          {/* Exact Logo Match */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex h-11 w-11 rounded-full border-2 border-orange-500 items-center justify-center font-black text-white text-2xl pb-0.5">
                D
              </span>
              <div className="flex flex-col">
                <span className="text-[26px] font-black tracking-tighter leading-none text-white">
                  DENSITY
                </span>
                <span className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mt-0.5">
                  ELECTRONICS
                </span>
                <span className="text-[6px] text-orange-500 tracking-widest mt-0.5 uppercase">— Your Electronic Components Partner —</span>
              </div>
            </div>
          </Link>

          {/* Exact Search Bar (White Pill with Blue Button) */}
          <div ref={searchContainerRef} className="flex-1 max-w-2xl relative hidden lg:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white rounded-full overflow-hidden shadow-inner h-11">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                placeholder="Search by Part Number, Keyword or Category..."
                className="w-full text-[13px] text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent px-5 font-medium h-full"
              />
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-blue-600 text-white px-8 h-full transition-colors cursor-pointer flex items-center justify-center"
              >
                <Search size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-8 flex-shrink-0 text-[13px] font-semibold text-gray-200">
            <Link to="/login" className="hidden xl:flex items-center gap-2 hover:text-orange-400 transition-colors">
              <User size={18} />
              <span>Login / Register</span>
            </Link>
            <button className="hidden sm:flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Heart size={18} />
              <span>Wishlist</span>
            </button>
            <Link to="/cart" className="flex items-center gap-2 hover:text-orange-400 transition-colors relative">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -left-3 bg-[#f59e0b] text-[#050b14] text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>

      {/* 2. SECONDARY NAVIGATION BAR (Deep Dark Navy) */}
      <div className="bg-[#050b14]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-8">
          
          {/* All Categories Dropdown Menu */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
            <button className="flex items-center gap-2 text-white font-bold text-[13px] hover:text-orange-400 transition-colors cursor-pointer h-full border-b-2 border-transparent hover:border-orange-500">
              <Menu size={18} />
              All Categories
              <ChevronDown size={14} className="ml-1" />
            </button>
          </div>

          {/* Exact Main Links */}
          <nav className="hidden md:flex items-center h-full gap-8 text-[13px] font-bold text-gray-300">
            <Link to="/" className="text-white border-b-2 border-orange-500 h-full flex items-center transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
            <Link to="/shop" className="hover:text-white transition-colors">Products</Link>
            <button onClick={(e) => handleScrollToSection(e, 'brands')} className="hover:text-white transition-colors cursor-pointer">Brands</button>
            <Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link>
            <Link to="/bulk" className="hover:text-white transition-colors">Bulk Enquiries</Link>
            <Link to="/sell" className="hover:text-white transition-colors">Sell on Density</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <button onClick={(e) => handleScrollToSection(e, 'footer')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </nav>

        </div>
      </div>
    </header>
  );
}