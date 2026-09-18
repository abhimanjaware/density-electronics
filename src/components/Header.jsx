import { useState, useRef, useEffect } from 'react';
import { 
  Search, ChevronDown, ShoppingCart, Menu, X, ChevronRight 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';

export default function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);
  const mobileSearchContainerRef = useRef(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      const matches = products.filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(query);
        const categoryMatch = p.category?.toLowerCase().includes(query);
        const partMatch = p.specifications?.partNumber?.toLowerCase().includes(query);
        const descMatch = p.shortDescription?.toLowerCase().includes(query);
        const idMatch = p.id?.toLowerCase().includes(query);
        return nameMatch || categoryMatch || partMatch || descMatch || idMatch;
      }).slice(0, 8);

      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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

  return (
    <header className="w-full font-sans sticky top-0 z-50 shadow-2xl bg-[#050b14]">
      {/* 1. TOP MAIN HEADER */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
        
        {/* Top Row: Logo & Mobile Icons */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="flex items-center flex-shrink-0 z-40">
            <img
              src="src/assets/headerlogo33.png"
              alt="Density Logo"
              className="h-14 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* Right Action Icons (Mobile) */}
          <div className="flex items-center gap-5 text-gray-200 z-40 lg:hidden">
            <Link to="/cart" className="flex items-center hover:text-[#ffb700] transition-colors relative group">
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2.5 -right-3 bg-[#ffb700] text-[#050b14] text-[10px] font-black rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="hover:text-[#ffb700] active:scale-90 transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={32} />
            </button>
          </div>
        </div>

        {/* Global Search Bar (Full width on mobile below logo, inline on desktop) */}
        <div ref={searchContainerRef} className="w-full lg:flex-1 lg:max-w-3xl relative order-last lg:order-none pb-2 lg:pb-0">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white rounded-md overflow-hidden shadow-inner h-12 border-2 border-transparent focus-within:border-blue-600 transition-colors">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
              placeholder="Search all 180 components by Part Number..."
              className="w-full text-[14px] text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent px-4 font-medium h-full"
            />
            <button
              type="submit"
              className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 h-full transition-colors cursor-pointer flex items-center justify-center shrink-0"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-0 text-black transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded bg-gray-50 p-1" />
                    <div>
                      <span className="text-[13px] font-bold block truncate max-w-[250px]">{product.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono uppercase">P/N: {product.specifications?.partNumber || product.id}</span>
                    </div>
                  </div>
                  <span className="font-black text-[#2563eb] text-sm shrink-0">₹{product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Action Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0 text-gray-200 z-40">
          <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-[#ffb700] transition-colors" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="hover:text-[#ffb700] transition-colors" title="Twitter/X">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>

          <div className="h-6 w-[1px] bg-gray-700"></div>

          <Link to="/cart" className="flex items-center gap-2 hover:text-[#ffb700] transition-colors relative group">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[14px]">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2.5 -left-3 bg-[#ffb700] text-[#050b14] text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 2. DESKTOP SECONDARY NAVIGATION BAR (Hidden on Mobile) */}
      <div className="hidden lg:block bg-[#020617] border-t border-gray-800/50">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-8 h-12 flex items-center gap-8 relative">
          <div className="relative h-full flex items-center" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
            <button className="flex items-center gap-2 text-white font-bold text-[13px] hover:text-orange-500 transition-colors cursor-pointer h-full border-b-2 border-transparent hover:border-orange-500">
              <Menu size={18} />
              All Categories
              <ChevronDown size={14} className="ml-1 transition-transform" style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            {isCategoryOpen && categories && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl z-50 rounded-b-lg overflow-hidden animate-in fade-in duration-200">
                {categories.slice(0, 8).map((cat) => (
                  <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`} onClick={() => setIsCategoryOpen(false)} className="block px-5 py-3 text-[13px] font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 last:border-0 transition-colors">
                    {cat}
                  </Link>
                ))}
                <Link to="/categories" onClick={() => setIsCategoryOpen(false)} className="block px-5 py-3 text-xs font-black text-center text-blue-600 bg-blue-50 hover:bg-blue-100 uppercase tracking-widest transition-colors">
                  View All Categories →
                </Link>
              </div>
            )}
          </div>

          <nav className="flex items-center h-full gap-8 text-[13px] font-bold text-gray-300">
            <Link to="/" className="text-white border-b-2 border-orange-500 h-full flex items-center transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
            <Link to="/shop" className="hover:text-white transition-colors">Products</Link>
            <button onClick={(e) => handleScrollToSection(e, 'brands')} className="hover:text-white transition-colors cursor-pointer">Brands</button>
            <Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link>
            <Link to="/bulk" className="text-orange-500 hover:text-orange-400 transition-colors">Bulk Enquiries</Link>
            <Link to="/sell" className="hover:text-white transition-colors">Sell on Density</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <button onClick={(e) => handleScrollToSection(e, 'footer')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </nav>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      ></div>

      <div className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-[320px] bg-[#050b14] shadow-2xl z-[70] transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <span className="text-white font-black text-lg tracking-widest uppercase">Menu</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors active:scale-90"
            aria-label="Close Menu"
          >
            <X size={28} strokeWidth={2.5}/>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="flex flex-col">
            {[
              { name: "Home", path: "/" },
              { name: "Shop Now", path: "/shop", highlight: true },
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
                className={`flex items-center justify-between py-4 border-b border-gray-800/60 font-bold text-[15px] transition-colors ${link.highlight ? 'text-orange-500' : 'text-gray-300'}`}
              >
                {link.name}
                <ChevronRight size={18} className="text-gray-600" />
              </Link>
            ))}
            <button onClick={(e) => handleScrollToSection(e, 'brands')} className="flex items-center justify-between py-4 border-b border-gray-800/60 font-bold text-[15px] text-gray-300 w-full text-left">
              Featured Brands <ChevronRight size={18} className="text-gray-600" />
            </button>
            <button onClick={(e) => handleScrollToSection(e, 'footer')} className="flex items-center justify-between py-4 font-bold text-[15px] text-gray-300 w-full text-left">
              Contact Us <ChevronRight size={18} className="text-gray-600" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}