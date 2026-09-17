import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, ChevronLeft, ChevronRight, Star,
  Heart, ShieldCheck, HelpCircle, Cpu, FileText, CheckCircle2,
  Check, Download, Zap, Truck, Headphones, Building2, ShoppingCart, CloudUpload
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';

import heroBg1 from '../assets/bg2.png';
import heroBg2 from '../assets/bg1.png';
import heroBg3 from '../assets/bg3.png';

// 1. FAST NATIVE SCROLL ANIMATION (Reduced duration & translation for maximum speed)
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" } // Trigger sooner
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const handleAddToCart = (product) => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const featuredCatalog = products.slice(0, 8);
  const newArrivals = products.slice(8, 12);
  const bestSellers = products.slice(12, 20);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else if (window.innerWidth < 1280) setVisibleCount(3);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, featuredCatalog.length - visibleCount);
  const canScrollPrev = carouselIndex > 0;
  const canScrollNext = carouselIndex < maxIndex;

  const handlePrevSlide = () => setCarouselIndex((prev) => Math.max(0, prev - 1));
  const handleNextSlide = () => setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));

  const categoryImages = {
    "Development Board": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    "Sensor": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200",
    "Display": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    "Motors": "https://wallpapercave.com/wp/wp8825915.jpg",
    "Power": "https://images.unsplash.com/photo-1611117775350-ac3950990985?auto=format&fit=crop&q=80&w=1200",
    "Wireless": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
    "Cellular": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200",
    "RF Antenna": "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=1200",
    "Memory": "https://images.hdqwalls.com/wallpapers/random-access-memory.jpg",
    "Supplier Brand": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    "Robotics Project": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    "Tools & Soldering": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
    "Wiring & Breadboards": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1200",
    "Motor Drivers": "https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&q=80&w=1200",
    "Batteries & Power Management": "https://tse2.mm.bing.net/th/id/OIP.1QBu0WAQ72oPNGtpXVV50QAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  };

  const brands = [
    { name: "DWIN", logo: "https://www.stoneitech.com/wp-content/uploads/2022/06/cropped-%E5%85%AC%E5%8F%B8Logo-300x100-1-131x44.jpg" },
    { name: "SONYTEK", logo: "https://sonytech.in/Final%20Logo.png" },
    { name: "ESPRESSIF", logo: "https://www.espressif.com/sites/all/themes/espressif/logo-black.svg" },
    { name: "ARDUINO", logo: "https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg" },
    { name: "Puya", logo: "https://www.rflambda.com/assets/images/logo.png?v=20260820" },
    { name: "SIMCom", logo: "https://www.simcom.com/static/images/logo.png" },
    { name: "SKYMIRR", logo: "https://skymirr.com/wp-content/uploads/2023/04/skymirr-logo-3d-768x188.png" }
  ];

  const HeavyProductCard = ({ product }) => {
    const isWishlisted = !!wishlist[product.id];
    const isAdded = !!addedIds[product.id];
    const isOutOfStock = product.stock === 0;

    return (
      <div className="bg-white border border-gray-100 hover:border-orange-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col relative group h-full text-left rounded-xl overflow-hidden">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.stock > 0 ? (
            <span className="bg-emerald-50/90 backdrop-blur-sm text-emerald-700 text-[8px] sm:text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-emerald-200 shadow-sm">In Stock</span>
          ) : (
            <span className="bg-red-50/90 backdrop-blur-sm text-red-700 text-[8px] sm:text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-red-200 shadow-sm">Out of Stock</span>
          )}
        </div>

        <Link to={`/product/${product.slug}`} className="h-32 sm:h-44 w-full p-2 sm:p-4 flex items-center justify-center bg-white border-b border-gray-50 shrink-0 overflow-hidden relative">
          <img src={product.image} alt={product.name} loading="lazy" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200"></div>
        </Link>

        <div className="p-3 sm:p-4 flex flex-col flex-grow bg-white">
          <div className="text-[9px] sm:text-[10px] text-gray-500 font-mono mb-1.5 flex justify-between items-center uppercase">
            <span className="truncate mr-2 hidden sm:inline">P/N: {product.specifications?.partNumber || product.id}</span>
            <span className="text-orange-600 font-bold truncate">{product.category}</span>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h4 className="font-bold text-[11px] sm:text-[13px] text-[#1e293b] group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug mb-3">
              {product.name}
            </h4>
          </Link>

          <div className="mt-auto border-t border-gray-100 pt-3">
            <div className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase mb-0.5">Unit Price (Ex. GST)</div>
            <div className="flex items-end justify-between mb-3 sm:mb-4">
              <div className="text-base sm:text-xl font-black text-[#1e293b]">₹{product.price.toFixed(2)}</div>
              <div className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-0.5 hidden sm:flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-[#f59e0b] fill-[#f59e0b]" />)}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer bg-white shrink-0"
              >
                <Heart size={16} className={`transition-colors duration-200 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
              <button
                disabled={isOutOfStock}
                onClick={() => handleAddToCart(product)}
                className={`flex-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider h-9 sm:h-10 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center cursor-pointer ${isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isAdded
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30 shadow-lg'
                    : 'bg-orange-600 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 text-white' // Reverted to Orange
                  }`}
              >
                {isOutOfStock ? "Unavailable" : isAdded ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      bg: heroBg1,
      eyebrow: <>GENUINE <span className="mx-2 sm:mx-3 font-light text-white/30">|</span> RELIABLE <span className="mx-2 sm:mx-3 font-light text-white/30">|</span> AFFORDABLE</>,
      titleLine1: "India's Trusted Source for",
      titleLine2: "Electronics",
      titleLine3: "Components",
      desc: "From Development Boards to Displays, Sensors, Wireless Modules and more — everything you need, in one place."
    },
    {
      bg: heroBg2,
      eyebrow: <>GLOBAL SOURCING <span className="mx-2 sm:mx-3 font-light text-white/30">|</span> TRUSTED PARTNERS</>,
      titleLine1: "Strong Network Across",
      titleLine2: "China, Japan &",
      titleLine3: "Taiwan",
      desc: "We source directly from leading manufacturers in Shenzhen, Tokyo, and Taiwan to bring you genuine, high-quality components at the best value."
    },
    {
      bg: heroBg3,
      eyebrow: <>ADVANCED SILICON <span className="mx-2 sm:mx-3 font-light text-white/30">|</span> HIGH PERFORMANCE</>,
      titleLine1: "Powering The Future Of",
      titleLine2: "Embedded",
      titleLine3: "Systems",
      desc: "High-grade microcontrollers, ICs, and processing units for enterprise-level automation and IoT applications."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Faster slider rotation
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] font-sans pb-16 overflow-x-hidden">

      {/* 1. HERO SECTION (Fully Responsive & Left-Aligned) */}
      <section className="relative w-full h-[75vh] sm:h-[70vh] min-h-[500px] flex items-center overflow-hidden bg-[#050b1a]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 mix-blend-screen transition-all duration-500 ease-in-out ${currentSlide === index ? 'opacity-70 scale-100' : 'opacity-0 scale-105'
              }`}
            style={{
              backgroundImage: `url('${slide.bg}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        ))}

        <div className="absolute -right-24 bottom-0 z-10 w-[420px] h-[420px] overflow-hidden pointer-events-none hidden sm:block animate-pulse">
          <div className="absolute w-[600px] h-[6px] bg-gradient-to-r from-transparent via-[#f59e0b] to-[#f59e0b] rotate-[-38deg] bottom-24 right-0 opacity-90 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
          <div className="absolute w-[600px] h-[3px] bg-gradient-to-r from-transparent via-[#f59e0b]/60 to-[#f59e0b]/60 rotate-[-38deg] bottom-14 right-0 opacity-70"></div>
        </div>

        {/* Adjusted Container for Left Alignment & Responsiveness */}
        <div className="relative z-20 max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16 w-full flex flex-col justify-center h-full pt-12 sm:pt-0">
          <div className="w-full sm:w-[85%] lg:w-[60%] flex flex-col text-left">
            <div className="relative w-full min-h-[200px] sm:min-h-[180px] mb-6 sm:mb-8">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-300 ease-out ${currentSlide === index
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                  <div className="text-emerald-400 text-[9px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-3 flex items-center justify-start">
                    {slide.eyebrow}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white leading-[1.1] tracking-tight mb-3 sm:mb-4 drop-shadow-lg">
                    {slide.titleLine1}<br />
                    <span className="text-[#ffb700] drop-shadow-md">{slide.titleLine2}</span> <span className="text-[#ffb700] drop-shadow-md">{slide.titleLine3}</span>
                  </h1>

                  <p className="text-gray-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-lg font-medium drop-shadow">
                    {slide.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 relative z-30 w-full sm:w-auto mt-2">
              <Link to="/shop" className="w-full sm:w-auto justify-center bg-[#ffb700] hover:bg-[#e6a300] text-black px-6 py-3.5 sm:px-8 rounded-full font-black text-[12px] sm:text-[13px] uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,183,0,0.3)]">
                <ShoppingCart size={16} strokeWidth={2.5} /> SHOP NOW <ChevronRight size={14} strokeWidth={3} className="ml-1" />
              </Link>
              <Link to="/bulk" className="w-full sm:w-auto justify-center bg-transparent border-2 border-white text-white px-6 py-3.5 sm:px-8 rounded-full font-bold text-[12px] sm:text-[13px] uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2">
                <CloudUpload size={16} strokeWidth={2} /> UPLOAD BOM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS STRIP */}
      <FadeInSection delay={0}>
        <div className="bg-white border-b border-gray-200 shadow-sm relative z-20">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between gap-6 sm:gap-8 min-w-max text-[11px] sm:text-[13px] font-bold text-gray-700">
              <div className="flex items-center gap-2.5 hover:text-orange-500 transition-colors cursor-default group">
                <Truck size={20} className="text-[#1e293b] group-hover:text-orange-500 transition-colors sm:w-6 sm:h-6" strokeWidth={1.5} />
                <span className="leading-tight">Fast & Reliable<br className="hidden sm:block" /> Shipping</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-orange-500 transition-colors cursor-default group">
                <ShieldCheck size={20} className="text-[#1e293b] group-hover:text-orange-500 transition-colors sm:w-6 sm:h-6" strokeWidth={1.5} />
                <span className="leading-tight">100% Genuine<br className="hidden sm:block" /> Products</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-orange-500 transition-colors cursor-default group">
                <Headphones size={20} className="text-[#1e293b] group-hover:text-orange-500 transition-colors sm:w-6 sm:h-6" strokeWidth={1.5} />
                <span className="leading-tight">Technical<br className="hidden sm:block" /> Support</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-orange-500 transition-colors cursor-default group">
                <FileText size={20} className="text-[#1e293b] group-hover:text-orange-500 transition-colors sm:w-6 sm:h-6" strokeWidth={1.5} />
                <span className="leading-tight">GST Invoice<br className="hidden sm:block" /> Available</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-orange-500 transition-colors cursor-default group">
                <CheckCircle2 size={20} className="text-[#1e293b] group-hover:text-orange-500 transition-colors sm:w-6 sm:h-6" strokeWidth={1.5} />
                <span className="leading-tight">Secure<br className="hidden sm:block" /> Payments</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 8. FEATURED BRANDS (DUAL INFINITE SCROLL MARQUEE) */}
      <section id="brands" className="bg-gray-50 border-y border-gray-200 py-10 sm:py-14 overflow-hidden relative">
        <style>{`
          @keyframes slideLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes slideRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-slide-left { display: flex; width: max-content; animation: slideLeft 20s linear infinite; }
          .animate-slide-right { display: flex; width: max-content; animation: slideRight 20s linear infinite; }
          .animate-slide-left:hover, .animate-slide-right:hover { animation-play-state: paused; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <FadeInSection>
          <div className="max-w-[1500px] mx-auto px-6 lg:px-8 mb-6 sm:mb-10 text-center">
            <span className="text-[#f59e0b] font-black text-[10px] tracking-[0.25em] uppercase mb-2 block">
              Global Supply Network
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b1524] tracking-tight uppercase mb-3">
              Authorized Brands
            </h2>
            <p className="text-gray-500 sm:text-gray-600 text-xs sm:text-sm font-medium max-w-2xl mx-auto leading-relaxed">
              Direct sourcing partnerships with industry-leading silicon and hardware manufacturers.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={30}>
          <div className="w-full relative overflow-hidden flex flex-col gap-3 sm:gap-5">
            <div className="absolute left-0 top-0 w-8 sm:w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-8 sm:w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

            <div className="animate-slide-left py-1">
              {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
                <div
                  key={`top-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-[120px] sm:w-[200px] h-14 sm:h-20 mx-2 sm:mx-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer group px-3"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-6 sm:max-h-12 max-w-[90px] sm:max-w-[130px] object-contain transition-all duration-200 group-hover:grayscale group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="animate-slide-right py-1">
              {[...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse()].map((brand, idx) => (
                <div
                  key={`bottom-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-[120px] sm:w-[200px] h-14 sm:h-20 mx-2 sm:mx-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer group px-3"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-6 sm:max-h-12 max-w-[90px] sm:max-w-[130px] object-contain transition-all duration-200 group-hover:grayscale group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 2. MAXIMIZED CATEGORY DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <FadeInSection>
          <div className="mb-5 sm:mb-8 border-b-2 border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">Component Directory</h2>
              <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">Browse our complete, image-indexed inventory of industrial hardware.</p>
            </div>
            <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-xs uppercase tracking-wide flex items-center gap-1 group transition-colors">
              View All Categories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat, idx) => (
            <FadeInSection key={idx} delay={idx * 20}>
              <Link
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group relative h-28 sm:h-40 md:h-48 rounded-xl overflow-hidden border border-gray-100 hover:border-orange-500 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out block"
              >
                <img
                  src={categoryImages[cat] || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"}
                  alt={cat}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent group-hover:via-[#0f172a]/80 transition-colors duration-200"></div>

                <div className="relative z-10 h-full p-3 flex flex-col justify-end">
                  <h3 className="font-black text-[13px] sm:text-sm text-white uppercase tracking-wide leading-tight mb-1 group-hover:text-orange-400 transition-colors duration-200 shadow-sm">
                    {cat}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-orange-400 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    Explore <ArrowRight size={10} className="hidden sm:inline" />
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 overflow-hidden">
        <FadeInSection>
          <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-3">
            <h2 className="text-lg sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">Featured Hardware</h2>
            <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-xs flex items-center gap-1 uppercase group">
              View Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInSection>

        <FadeInSection delay={30}>
          <div className="relative flex flex-col lg:flex-row items-stretch border border-gray-200 bg-white shadow-sm rounded-2xl overflow-hidden">
            <div className="w-full lg:w-[280px] bg-[#1e293b] p-5 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200 shrink-0 relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest border border-black text-orange-400 border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 mb-3 rounded-full">Top Rated</span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-3 uppercase">Enterprise<br />Standards</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 mb-5 leading-relaxed font-medium">Our most requested components. High accuracy, robust builds, ready for mass production integration.</p>
                <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white text-[10px] sm:text-[11px] font-bold uppercase px-5 py-3 rounded-xl transition-all duration-200 w-full shadow-lg shadow-orange-600/20">
                  Shop Selection <ArrowRight size={12} />
                </Link>
              </div>
              <Cpu size={140} className="absolute -bottom-6 -right-6 text-white opacity-5 pointer-events-none transform rotate-12" />
            </div>

            <div className="relative flex-1 overflow-hidden min-w-0 bg-gray-50/50 ">
              <button onClick={handlePrevSlide} disabled={!canScrollPrev} aria-label="Previous" className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur border border-gray-500 shadow-xl flex items-center justify-center rounded-full transition-all duration-200 ${canScrollPrev ? 'text-[#1e293b] hover:border-orange-500 hover:text-orange-600 hover:scale-105 active:scale-95 cursor-pointer' : 'text-gray-300 cursor-not-allowed opacity-0 scale-90'}`}>
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button onClick={handleNextSlide} disabled={!canScrollNext} aria-label="Next" className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur border border-gray-200 shadow-xl flex items-center justify-center rounded-full transition-all duration-200 ${canScrollNext ? 'text-[#1e293b] hover:border-orange-500 hover:text-orange-600 hover:scale-105 active:scale-95 cursor-pointer' : 'text-gray-300 cursor-not-allowed opacity-0 scale-90'}`}>
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </button>

              <div className="flex transition-transform duration-300 ease-out h-full" style={{ transform: `translateX(-${carouselIndex * (100 / visibleCount)}%)` }}>
                {featuredCatalog.map((product) => (
                  <div key={product.id} style={{ width: `${100 / visibleCount}%` }} className="flex-shrink-0 p-3 border-r border-gray-100 last:border-r-0">
                    <HeavyProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 4. NEW ARRIVALS & BEST SELLERS */}
      <section className="bg-gray-50 border-y border-gray-200 py-10 sm:py-14 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">

          <div>
            <FadeInSection>
              <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-3">
                <h2 className="text-lg sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">New Arrivals</h2>
                <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-xs flex items-center gap-1 uppercase group">View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" /></Link>
              </div>
            </FadeInSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {newArrivals.map((product, idx) => (
                <FadeInSection key={product.id} delay={idx * 30}>
                  <HeavyProductCard product={product} />
                </FadeInSection>
              ))}
            </div>
          </div>

          <div>
            <FadeInSection>
              <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-3">
                <h2 className="text-lg sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">Best Sellers</h2>
                <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-xs flex items-center gap-1 uppercase group">View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" /></Link>
              </div>
            </FadeInSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {bestSellers.map((product, idx) => (
                <FadeInSection key={product.id} delay={idx * 30}>
                  <HeavyProductCard product={product} />
                </FadeInSection>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE US? */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <FadeInSection>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-orange-600 font-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-2 block">Enterprise Infrastructure</span>
            <h2 className="text-xl sm:text-3xl font-black text-[#1e293b] tracking-tight uppercase">Why Choose Density?</h2>
            <p className="text-gray-500 sm:text-gray-600 text-[11px] sm:text-sm font-medium mt-2 max-w-2xl mx-auto px-4">We built our logistics and sourcing networks to support everyone from solo makers to massive OEMs scaling up manufacturing lines.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {[
            { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600", icon: <ShieldCheck size={20} />, title: "100% Genuine", desc: "No clones. We source directly from official manufacturers like Espressif and DWIN." },
            { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600", icon: <Zap size={20} />, title: "Same-Day Dispatch", desc: "Strict SLA logistics. Orders before 2 PM IST are handed to premium couriers same day." },
            { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", icon: <Headphones size={20} />, title: "Expert Support", desc: "Our engineering team provides datasheets and hands-on integration support." },
            { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600", icon: <FileText size={20} />, title: "GST Invoicing", desc: "Seamless procurement for businesses. 18% GST invoices are automatically generated." },
            { img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=600", icon: <Truck size={20} />, title: "ESD Packaging", desc: "Strict adherence to anti-static protocols. Sensitive ICs are packed in ESD bags." },
            { img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600", icon: <Building2 size={20} />, title: "Institutional POs", desc: "We partner with university labs and government sectors to fulfill large-scale orders." }
          ].map((feature, idx) => (
            <FadeInSection key={idx} delay={idx * 30}>
              <div className="group relative h-[200px] sm:h-[240px] rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-500 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out">
                <img src={feature.img} alt={feature.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/20 group-hover:via-[#0f172a]/80 transition-colors duration-200"></div>

                <div className="relative z-10 p-4 sm:p-5 h-full flex flex-col justify-end">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center mb-2 backdrop-blur-md border border-orange-500/30 shadow-sm transform group-hover:scale-105 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-1 uppercase tracking-wide">{feature.title}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-300 leading-snug font-medium line-clamp-2">{feature.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED GOOGLE REVIEWS */}
      <section className="bg-white border-t border-gray-100 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 border-b border-gray-100 pb-3 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <h2 className="text-base sm:text-lg font-black text-[#1e293b] tracking-tight uppercase">Verified Feedback</h2>
                </div>
                <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium">Rated 4.9/5 by Engineers.</p>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded shadow-sm self-start sm:self-auto">
                <span className="text-[#1e293b] font-black text-xs mr-1">4.9</span>
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-[#FBBC05] fill-[#FBBC05]" />)}
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {[
              {
                name: "Rohan M.", title: "Procurement, EV Tech",
                text: "Sourced 500+ ESP32 modules. Density delivered genuine stock with proper ESD packaging. 18% GST input was seamless.",
              },
              {
                name: "Dr. Alok V.", title: "HOD, Govt Engg",
                text: "Easiest institutional PO experience. Fast delivery of sensor kits. Datasheets provided saved our students weeks.",
              },
              {
                name: "Siddharth K.", title: "Lead Hardware Engineer",
                text: "Reliable supplier for genuine displays. Same-day dispatch is real—ordered at 1 PM, dispatched by 4 PM.",
              }
            ].map((review, i) => (
              <FadeInSection key={i} delay={i * 30}>
                <div className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative group h-full">
                  <div className="absolute top-4 right-4 text-gray-200 group-hover:text-blue-100 transition-colors duration-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-[#FBBC05] fill-[#FBBC05]" />)}
                  </div>
                  <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed font-medium mb-4 relative z-10">"{review.text}"</p>
                  <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-[#1e293b] font-black text-[11px] sm:text-xs uppercase">{review.name}</h4>
                      <p className="text-gray-500 text-[8px] sm:text-[9px] uppercase font-bold tracking-wider">{review.title}</p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 text-[7px] sm:text-[8px] font-bold uppercase flex items-center gap-0.5">
                      <CheckCircle2 size={8} /> Verified
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCUREMENT F.A.Q. */}
      <section id="faq" className="bg-[#0f172a] py-12 sm:py-16 text-white border-t-4 border-orange-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-14">

            <div className="w-full md:w-1/3 shrink-0">
              <FadeInSection>
                <div className="sticky top-20">
                  <HelpCircle size={32} className="text-orange-500 mb-3 sm:mb-4" strokeWidth={2.5} />
                  <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight uppercase leading-tight mb-2 sm:mb-3">
                    Procurement <br className="hidden md:block" /> F.A.Q.
                  </h2>
                  <p className="text-gray-400 text-[11px] sm:text-xs font-medium leading-relaxed mb-4">
                    Find quick answers to our most common B2B logistics, tax, and shipping inquiries.
                  </p>
                  <a href="mailto:support@densityelectronics.com" className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider group transition-colors">
                    Contact Support <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </FadeInSection>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-3 sm:gap-4">
              {[
                { q: "Do you provide GST invoices for corporate orders?", a: "Yes, standard 18% GST invoices are automatically generated for all institutional and corporate purchases. Simply enter your GSTIN during checkout." },
                { q: "What are your shipping and dispatch timelines?", a: "Dispatch is guaranteed same-day for orders placed before 2 PM IST. Standard delivery takes 3-5 business days across India." },
                { q: "Do you accept College or Enterprise POs?", a: "Absolutely. We actively work with educational institutions and enterprise teams. Contact support with your official PO to arrange net-terms." },
                { q: "Are technical datasheets and pinouts available?", a: "Yes, full PDF datasheets, schematic symbols, and sample code are available directly on product pages or upon request." }
              ].map((faq, idx) => (
                <FadeInSection key={idx} delay={idx * 30}>
                  <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                    <h4 className="text-white font-bold text-xs sm:text-sm mb-1.5 uppercase tracking-wide leading-snug flex items-start gap-2">
                      <span className="text-orange-500">Q.</span>{faq.q}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-medium sm:pl-5">
                      {faq.a}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 9. PRE-FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 mb-8 sm:mb-10">
        <FadeInSection>
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite] rounded-2xl overflow-hidden relative shadow-xl border border-orange-400">
            <style>{`
              @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            `}</style>
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-[#0f172a] opacity-20 blur-[50px] sm:blur-[70px] rounded-full mix-blend-multiply pointer-events-none"></div>

            <div className="px-5 py-8 sm:px-10 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2 sm:mb-3 drop-shadow-sm">
                  Ready to source for production?
                </h2>
                <p className="text-orange-50 text-[11px] sm:text-sm font-medium leading-relaxed">
                  Whether you need a single ESP32 for a prototype or 5,000 customized displays, we have the inventory to support you.
                </p>
              </div>
              <div className="flex-shrink-0 w-full lg:w-auto">
                <Link to="/bulk" className="bg-[#0f172a] hover:bg-black text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap block text-center w-full lg:w-auto border border-gray-800">
                  Request Bulk Quote
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

    </div>
  );
}