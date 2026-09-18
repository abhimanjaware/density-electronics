import { useState, useRef, useEffect } from 'react';
import { 
  Search, ChevronDown, ShoppingCart, Menu, User, Heart, X, ChevronRight 
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

  // Close the drawer only when the route actually changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock/unlock body scroll purely based on open state
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

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.style.display = 'flex';
    }
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50 shadow-2xl">

      {/* 1. TOP MAIN HEADER */}
      <div className="bg-[#050b14] text-white border-b border-gray-800/50 relative z-40">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-4 flex items-center justify-between gap-4 lg:gap-8 min-h-[72px] sm:min-h-0">

          {/* Logo Section */}
          <Link to="/" className="flex items-center flex-shrink-0 z-40">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img
                src="src/assets/headerlogo33.png"
                alt="Density Logo"
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
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
                placeholder="Search all 180 components by Part Number, Keyword or Category..."
                className="w-full text-[13px] text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent px-5 font-medium h-full"
              />
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-blue-600 text-white px-8 h-full transition-colors cursor-pointer flex items-center justify-center"
              >
                <Search size={18} strokeWidth={2.5} />
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
                        <span className="text-sm font-bold block truncate max-w-[320px]">{product.name}</span>
                        <span className="text-[10px] text-gray-500 font-mono uppercase">P/N: {product.specifications?.partNumber || product.id} | {product.category}</span>
                      </div>
                    </div>
                    <span className="font-black text-[#2563eb] text-sm shrink-0">₹{product.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-5 sm:gap-6 lg:gap-8 flex-shrink-0 text-gray-200 z-40">

            <div className="hidden xl:flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-[#ffb700] transition-colors" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="hover:text-[#ffb700] transition-colors" title="Twitter/X">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="hover:text-[#ffb700] transition-colors" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>

            <div className="hidden xl:block h-6 w-[1px] bg-gray-700"></div>

            {/* Mobile search trigger */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center text-white active:scale-90 transition-transform"
              aria-label="Search"
            >
              <Search size={26} strokeWidth={2.2} />
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="flex items-center gap-2 hover:text-[#ffb700] transition-colors relative group">
              <ShoppingCart size={28} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-semibold text-[13px]">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2.5 -right-3 sm:-left-3 bg-[#ffb700] text-[#050b14] text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center text-white hover:text-[#ffb700] active:scale-90 transition-all p-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={32} />
            </button>
          </div>

        </div>
      </div>

      {/* 2. DESKTOP SECONDARY NAVIGATION BAR */}
      <div className="hidden lg:block bg-[#050b14]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-8 relative">
          <div className="relative h-full flex items-center" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
            <button className="flex items-center gap-2 text-white font-bold text-[13px] hover:text-[#ffb700] transition-colors cursor-pointer h-full border-b-2 border-transparent hover:border-[#ffb700]">
              <Menu size={18} />
              All Categories
              <ChevronDown size={14} className="ml-1 transition-transform" style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

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

      {/* 3. MOBILE MENU DRAWER */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      ></div>

      <div className={`fixed top-0 right-0 h-[100dvh] w-[88%] max-w-[380px] bg-[#050b14] shadow-2xl z-[70] transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
          <span className="text-white font-black text-xl tracking-wide uppercase">Menu</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white p-2.5 -mr-2 rounded-full transition-colors active:scale-90"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 hide-scrollbar">

          <div ref={mobileSearchContainerRef} className="relative w-full mb-8">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white rounded-md overflow-hidden h-[48px] shadow-inner border border-transparent focus-within:border-[#2563eb] transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                placeholder="Search all 180 components..."
                className="w-full text-[15px] text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent px-4 font-medium h-full"
              />
              <button type="submit" className="bg-[#2563eb] text-white px-5 h-full flex items-center justify-center active:bg-blue-700 transition-colors">
                <Search size={20} strokeWidth={2.5} />
              </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="relative mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1">
                {suggestions.map((product) => (
                  <div key={product.id} onClick={() => handleSelectProduct(product.slug)} className="px-4 py-3.5 hover:bg-blue-50 active:bg-blue-100 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-0 text-black">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-contain rounded bg-gray-50 p-0.5" />
                      <div>
                        <span className="text-[13px] font-bold block truncate max-w-[150px]">{product.name}</span>
                        <span className="text-[9px] text-gray-500 font-mono">₹{product.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <nav className="flex flex-col">
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
                className={`flex items-center justify-between py-4 border-b border-gray-800/60 font-bold text-[16px] transition-colors ${link.highlight ? 'text-[#ffb700]' : 'text-gray-300'}`}
              >
                {link.name}
                <ChevronRight size={18} className="text-gray-600" />
              </Link>
            ))}

            <button onClick={(e) => handleScrollToSection(e, 'brands')} className="flex items-center justify-between py-4 border-b border-gray-800/60 font-bold text-[16px] text-gray-300 w-full text-left transition-colors">
              Featured Brands <ChevronRight size={18} className="text-gray-600" />
            </button>
            <button onClick={(e) => handleScrollToSection(e, 'footer')} className="flex items-center justify-between py-4 font-bold text-[16px] text-gray-300 w-full text-left transition-colors">
              Contact Support <ChevronRight size={18} className="text-gray-600" />
            </button>
          </nav>

        </div>

        <div className="bg-[#02050a] p-5 pb-8 border-t border-gray-800 flex items-center justify-center gap-6 text-[15px] font-bold text-gray-400">
          <a href="#" className="hover:text-[#ffb700] transition-colors" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className="hover:text-[#ffb700] transition-colors" title="Twitter/X">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a href="#" className="hover:text-[#ffb700] transition-colors" title="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6C4 3.7 5.1 3.7 5.6 3.6C8.8 3.4 12 3.4 12 3.4C12 3.4 15.2 3.4 18.4 3.6C18.9 3.7 20 3.7 20.9 4.6C21.7 5.4 21.5 7.1 21.5 7.1C21.5 7.1 21.7 8.9 21.7 10.7V13.3C21.7 15.1 21.5 16.9 21.5 16.9C21.5 16.9 21.7 18.6 20.9 19.4C20 20.3 18.7 20.3 18.2 20.4C14.7 20.7 12 20.6 12 20.6C12 20.6 8.8 20.6 5.6 20.4C5.1 20.3 4 20.3 3.1 19.4C2.3 18.6 2.5 16.9 2.5 16.9C2.5 16.9 2.3 15.1 2.3 13.3V10.7C2.3 8.9 2.5 7.1 2.5 7.1Z"></path><polygon points="9.75 15.02 15.5 11.97 9.75 8.92 9.75 15.02"></polygon></svg>
          </a>
          <a href="#" className="hover:text-[#ffb700] transition-colors" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>

      </div>

    </header>
  );
}