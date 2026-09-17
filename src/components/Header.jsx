import { useState, useRef, useEffect } from 'react';
import { 
  Search, ChevronDown, ShoppingCart, Menu, User, Heart, X, ChevronRight 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';

export default function Header() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);
  const mobileSearchContainerRef = useRef(null);

  // Menu States
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Live filter matching for Search
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

  // Click outside to close desktop search suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current && !searchContainerRef.current.contains(e.target) &&
        mobileSearchContainerRef.current && !mobileSearchContainerRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change & prevent body scroll
  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [location.pathname, isMobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (slug) => {
    setShowSuggestions(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  // Image fallback handler
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.style.display = 'flex';
    }
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50 shadow-2xl">
      
      {/* 1. TOP MAIN HEADER */}
      <div className="bg-[#050b14] text-white border-b border-gray-800/50 relative z-50">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center flex-shrink-0 z-50">
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* DEPLOYMENT LOGO: Place a file named 'logo.png' in your 'public' folder */}
              <img 
                src="src\assets\headerlogo.png" 
                alt="Density Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain "
                onError={handleImageError}
              />
              
        
            </div>
          </Link>

          {/* Desktop Search Bar */}
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

            {/* Desktop Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-0 text-black transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded" />
                      <span className="text-sm font-bold truncate max-w-[250px]">{product.name}</span>
                    </div>
                    <span className="font-black text-[#2563eb] text-sm">₹{product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-5 sm:gap-8 flex-shrink-0 text-[13px] font-semibold text-gray-200 z-50">
            <Link to="/login" className="hidden xl:flex items-center gap-2 hover:text-[#ffb700] transition-colors">
              <User size={18} />
              <span>Login / Register</span>
            </Link>
            <button className="hidden sm:flex items-center gap-2 hover:text-[#ffb700] transition-colors">
              <Heart size={18} />
              <span>Wishlist</span>
            </button>
            <Link to="/cart" className="flex items-center gap-2 hover:text-[#ffb700] transition-colors relative group">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2 sm:-left-3 bg-[#f59e0b] text-[#050b14] text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              className="lg:hidden flex items-center justify-center text-white hover:text-[#ffb700] transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
          </div>

        </div>
      </div>

      {/* 2. DESKTOP SECONDARY NAVIGATION BAR */}
      <div className="hidden lg:block bg-[#050b14]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-8 relative">
          
          {/* All Categories Dropdown Menu */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
            <button className="flex items-center gap-2 text-white font-bold text-[13px] hover:text-[#ffb700] transition-colors cursor-pointer h-full border-b-2 border-transparent hover:border-[#ffb700]">
              <Menu size={18} />
              All Categories
              <ChevronDown size={14} className="ml-1 transition-transform" style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            
            {/* Desktop Dropdown List */}
            {isCategoryOpen && categories && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl z-50 rounded-b-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {categories.slice(0, 8).map((cat) => (
                  <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`} onClick={() => setIsCategoryOpen(false)} className="block px-5 py-3 text-[13px] font-bold text-gray-800 hover:bg-blue-50 hover:text-[#2563eb] border-b border-gray-100 last:border-0 transition-colors">
                    {cat}
                  </Link>
                ))}
                <Link to="/categories" onClick={() => setIsCategoryOpen(false)} className="block px-5 py-3 text-xs font-black text-center text-[#2563eb] bg-blue-50 hover:bg-blue-100 uppercase tracking-widest transition-colors">
                  View All Categories →
                </Link>
              </div>
            )}
          </div>

          {/* Main Links */}
          <nav className="flex items-center h-full gap-8 text-[13px] font-bold text-gray-300">
            <Link to="/" className="text-white border-b-2 border-[#ffb700] h-full flex items-center transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
            <Link to="/shop" className="hover:text-white transition-colors">Products</Link>
            <button onClick={(e) => handleScrollToSection(e, 'brands')} className="hover:text-white transition-colors cursor-pointer">Brands</button>
            <Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link>
            <Link to="/bulk" className="text-[#ffb700] hover:text-white transition-colors">Bulk Enquiries</Link>
            <Link to="/sell" className="hover:text-white transition-colors">Sell on Density</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <button onClick={(e) => handleScrollToSection(e, 'footer')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </nav>
        </div>
      </div>

      {/* ========================================= */}
      {/* 3. BEAUTIFUL MOBILE MENU DRAWER           */}
      {/* ========================================= */}
      
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Side Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-[#050b14] border-l border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <span className="text-white font-black text-lg tracking-wide uppercase">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar">
          
          {/* Mobile Search Bar */}
          <div ref={mobileSearchContainerRef} className="relative w-full mb-8">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white rounded-md overflow-hidden h-12 shadow-inner border border-transparent focus-within:border-[#2563eb] transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                placeholder="Search components..."
                className="w-full text-[15px] text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent px-4 font-medium h-full"
              />
              <button type="submit" className="bg-[#2563eb] text-white px-5 h-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Search size={20} strokeWidth={2.5} />
              </button>
            </form>

            {/* Mobile Search Suggestions (Pushes content down natively) */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="relative mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1">
                {suggestions.map((product) => (
                  <div key={product.id} onClick={() => handleSelectProduct(product.slug)} className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-0 text-black">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-contain rounded" />
                      <span className="text-[13px] font-bold truncate max-w-[150px]">{product.name}</span>
                    </div>
                    <span className="font-black text-[#2563eb] text-[13px]">₹{product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {[
              { name: "Home", path: "/" },
              { name: "All Categories", path: "/categories" },
              { name: "Products Catalog", path: "/shop" },
              { name: "New Arrivals", path: "/shop" },
              { name: "Bulk Enquiries", path: "/bulk", highlight: true },
              { name: "Sell on Density", path: "/sell" },
              { name: "About Us", path: "/about" },
            ].map((link, idx) => (
              <Link 
                key={idx}
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`flex items-center justify-between py-3 border-b border-gray-800/60 font-bold text-[15px] transition-colors ${link.highlight ? 'text-[#ffb700] hover:text-yellow-400' : 'text-gray-300 hover:text-white'}`}
              >
                {link.name}
                <ChevronRight size={16} className="text-gray-600" />
              </Link>
            ))}
            
            {/* Scroll Links */}
            <button onClick={(e) => handleScrollToSection(e, 'brands')} className="flex items-center justify-between py-3 border-b border-gray-800/60 font-bold text-[15px] text-gray-300 hover:text-white w-full text-left transition-colors">
              Featured Brands <ChevronRight size={16} className="text-gray-600" />
            </button>
            <button onClick={(e) => handleScrollToSection(e, 'footer')} className="flex items-center justify-between py-3 font-bold text-[15px] text-gray-300 hover:text-white w-full text-left transition-colors">
              Contact Support <ChevronRight size={16} className="text-gray-600" />
            </button>
          </nav>

        </div>

        {/* Mobile Extra Actions (Sticky at bottom of drawer) */}
        <div className="bg-[#02050a] p-6 border-t border-gray-800 flex items-center justify-between text-sm font-bold text-gray-300">
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-[#ffb700] transition-colors">
            <User size={20} /> My Account
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-[#ffb700] transition-colors">
            <Heart size={20} /> Wishlist
          </button>
        </div>

      </div>

    </header>
  );
}