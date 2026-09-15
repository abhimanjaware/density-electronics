import { useState, useEffect } from 'react';
import { 
  ArrowRight, ChevronLeft, ChevronRight, Star, 
  Heart, ShieldCheck, HelpCircle, Cpu, FileText, CheckCircle2 ,
  Check, Download, Zap, Truck, Headphones, Building2, ShoppingCart, CloudUpload
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';

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

  // --- MISSING CAROUSEL LOGIC ADDED HERE ---
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

  // --- MISSING CATEGORY IMAGES ADDED HERE ---
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

  // Categories Array from Image
  const displayCategories = [
    { name: "Development Boards", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400" },
    { name: "Displays & HMI", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400" },
    { name: "Sensors & Modules", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400" },
    { name: "RF & Wireless", img: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=400" },
    { name: "Memory ICs", img: "https://images.unsplash.com/photo-1562976540-0fa8abe0eb2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Motors & Batteries", img: "https://images.unsplash.com/photo-1580828369019-2238f6982fa7?auto=format&fit=crop&q=80&w=400" },
    { name: "Robotics & STEM", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400" }
  ];

  // Brands Array from Image
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
      <div className="bg-white border border-gray-200 hover:border-[#2563eb] transition-colors flex flex-col relative group h-full shadow-sm text-left rounded-lg overflow-hidden">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.stock > 0 ? (
            <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-emerald-200 shadow-sm">In Stock</span>
          ) : (
            <span className="bg-red-50 text-red-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-red-200 shadow-sm">Out of Stock</span>
          )}
        </div>

        <Link to={`/product/${product.slug}`} className="h-44 w-full p-2 flex items-center justify-center bg-white border-b border-gray-100 shrink-0">
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
        </Link>

        <div className="p-4 flex flex-col flex-grow">
          <div className="text-[10px] text-gray-500 font-mono mb-1 flex justify-between items-center uppercase">
            <span>P/N: {product.specifications?.partNumber || product.id}</span>
            <span className="text-[#2563eb] font-bold">{product.category}</span>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h4 className="font-bold text-[13px] text-[#1e293b] hover:text-[#2563eb] transition-colors line-clamp-2 leading-tight mb-3">
              {product.name}
            </h4>
          </Link>

          <div className="mt-auto border-t border-gray-100 pt-3">
            <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Unit Price (Ex. GST)</div>
            <div className="flex items-end justify-between mb-3">
              <div className="text-xl font-black text-[#1e293b]">₹{product.price.toFixed(2)}</div>
              <div className="text-[10px] text-gray-500 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-[#f59e0b] fill-[#f59e0b]" />)}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => toggleWishlist(product.id)} className="w-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer bg-white shrink-0">
                <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
              <button
                disabled={isOutOfStock}
                onClick={() => handleAddToCart(product)}
                className={`flex-1 text-[11px] font-bold uppercase tracking-wider py-2.5 rounded transition-colors flex items-center justify-center cursor-pointer ${
                  isOutOfStock ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : isAdded ? 'bg-emerald-600 text-white' : 'bg-[#2563eb] hover:bg-blue-700 text-white shadow-sm'
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

  return (
    <div className="w-full bg-[#f8fafc] font-sans pb-16 overflow-hidden">
      
      {/* 1. HERO SECTION — matched to reference */}
      <section className="relative w-full h-[calc(70vh)] min-h-[550px] flex items-center overflow-hidden bg-[#050b1a]">

        {/* Background photo — subtle, dark-toned circuit texture */}
        <div
          className="absolute inset-0 z-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `url('/src/assets/file_00000000771c8211abe06bbe1f24443c.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Diagonal orange accent stripe, bottom-right corner (matches reference) */}
        <div className="absolute -right-24 bottom-0 z-10 w-[420px] h-[420px] overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[6px] bg-gradient-to-r from-transparent via-[#f59e0b] to-[#f59e0b] rotate-[-38deg] bottom-24 right-0 opacity-90"></div>
          <div className="absolute w-[600px] h-[3px] bg-gradient-to-r from-transparent via-[#f59e0b]/60 to-[#f59e0b]/60 rotate-[-38deg] bottom-14 right-0 opacity-70"></div>
        </div>

        <div className="relative z-20 max-w-[1500px] mx-auto px-16 sm:px-20 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-12 h-full">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[52%]">

            <div className="text-[#a0aec0] text-[12px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center">
              GENUINE <span className="mx-3 text-[#4a5568] font-light">|</span> RELIABLE <span className="mx-3 text-[#4a5568] font-light">|</span> AFFORDABLE
            </div>

            <h1 className="text-[32px] md:text-[54px] lg:text-[52px] font-black text-white whitespace-nowrap leading-[1] tracking-tight mb-5">
              India's Trusted Source for<br />
              <span className="text-[#ffb700]">Electronics</span> <span className="text-[#ffb700]">Components</span>
            </h1>

            <p className="text-gray-300 text-[15px] md:text-[16px] leading-relaxed max-w-xl font-medium mb-8">
              From Development Boards to Displays, Sensors, Wireless Modules
              and more — everything you need, in one place.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-10 text-[14.5px] text-[#e2e8f0] font-medium mb-10">
              {[
                "DWIN HMI Displays", "RF Antennas & Wireless Solutions",
                "Sonytek TFT Displays", "Sensors & Modules",
                "ESP32 & Arduino Boards", "Motors & Robotics",
                "SPI NOR Flash Memory", "and Much More..."
              ].map((label, i) => (
                <div className="flex items-center gap-3" key={i}>
                  <div className="bg-[#ffb700] rounded-full w-[18px] h-[18px] flex items-center justify-center shrink-0">
                    <Check size={12} className="text-[#040916]" strokeWidth={4} />
                  </div>
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/shop" className="bg-[#ffb700] hover:bg-[#e6a300] text-black px-8 py-3.5 rounded-full font-black text-[14px] uppercase tracking-wide transition-colors flex items-center gap-2.5 shadow-lg shadow-[#ffb700]/20">
                <ShoppingCart size={18} strokeWidth={2.5} /> SHOP NOW <ChevronRight size={16} strokeWidth={3} />
              </Link>
              <Link to="/bulk" className="bg-transparent border border-white text-white px-8 py-3.5 rounded-full font-bold text-[14px] uppercase tracking-wide hover:bg-white/10 transition-colors flex items-center gap-2.5">
                <CloudUpload size={18} strokeWidth={2} /> UPLOAD BOM
              </Link>
            </div>
          </div>

          {/* RIGHT — product collage slot */}
         

        </div>

      </section>

      {/* QUICK STATS STRIP (Exact alignment from reference) */}
      <div className="bg-white border-b border-gray-200 shadow-sm relative z-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-6 text-[14px] font-bold text-gray-700">
          <div className="flex items-center gap-4">
            <Truck size={28} className="text-[#1e293b]" strokeWidth={1.5} /> 
            <span className="leading-tight">Fast & Reliable<br/>Shipping</span>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck size={28} className="text-[#1e293b]" strokeWidth={1.5} /> 
            <span className="leading-tight">100% Genuine<br/>Products</span>
          </div>
          <div className="flex items-center gap-4 hidden md:flex">
            <Headphones size={28} className="text-[#1e293b]" strokeWidth={1.5} /> 
            <span className="leading-tight">Technical<br/>Support</span>
          </div>
          <div className="flex items-center gap-4 hidden lg:flex">
            <FileText size={28} className="text-[#1e293b]" strokeWidth={1.5} /> 
            <span className="leading-tight">GST Invoice<br/>Available</span>
          </div>
          <div className="flex items-center gap-4 hidden xl:flex">
            <CheckCircle2 size={28} className="text-[#1e293b]" strokeWidth={1.5} /> 
            <span className="leading-tight">Secure<br/>Payments</span>
          </div>
        </div>
      </div>

      {/* 2. MAXIMIZED CATEGORY DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 border-b-2 border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight uppercase">Component Directory</h2>
            <p className="text-gray-500 text-sm font-medium mt-1">Browse our complete, image-indexed inventory of industrial hardware.</p>
          </div>
          <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-sm uppercase tracking-wide flex items-center gap-1">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/shop?category=${encodeURIComponent(cat)}`}
              className="group relative h-48 sm:h-56 rounded-lg overflow-hidden border border-gray-200 hover:border-orange-500 shadow-sm transition-all block"
            >
              <img 
                src={categoryImages[cat] || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"} 
                alt={cat} 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/20 group-hover:via-[#0f172a]/80 transition-colors"></div>
              
              <div className="relative z-10 h-full p-5 flex flex-col justify-end">
                <h3 className="font-black text-lg text-white uppercase tracking-wide leading-tight mb-2 group-hover:text-orange-400 transition-colors">
                  {cat}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore Components <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 overflow-hidden">
        <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight uppercase">Featured Hardware</h2>
          <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-sm flex items-center gap-1 uppercase">
            View Catalog <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative flex flex-col lg:flex-row items-stretch border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="w-full lg:w-[300px] bg-[#1e293b] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200 shrink-0 relative">
            <div className="relative z-10">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-orange-400 border border-orange-400/30 bg-orange-400/10 px-3 py-1 mb-4 rounded-sm">Top Rated Series</span>
              <h3 className="text-3xl font-black text-white leading-tight mb-4 uppercase">Enterprise<br/>Standards</h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed font-medium">Our most requested components. High accuracy, robust builds, ready for mass production integration.</p>
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase px-6 py-3 rounded transition-colors w-full shadow-sm">
                Shop Selection <ArrowRight size={14} />
              </Link>
            </div>
            <Cpu size={180} className="absolute -bottom-8 -right-8 text-white opacity-5 pointer-events-none" />
          </div>

          <div className="relative flex-1 overflow-hidden min-w-0 bg-gray-50">
            <button onClick={handlePrevSlide} disabled={!canScrollPrev} aria-label="Previous" className={`absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white border border-gray-300 shadow-lg flex items-center justify-center rounded-full transition-all ${canScrollPrev ? 'text-[#1e293b] hover:border-orange-500 hover:text-orange-600 cursor-pointer' : 'text-gray-300 cursor-not-allowed opacity-0'}`}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNextSlide} disabled={!canScrollNext} aria-label="Next" className={`absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white border border-gray-300 shadow-lg flex items-center justify-center rounded-full transition-all ${canScrollNext ? 'text-[#1e293b] hover:border-orange-500 hover:text-orange-600 cursor-pointer' : 'text-gray-300 cursor-not-allowed opacity-0'}`}>
              <ChevronRight size={20} />
            </button>

            <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${carouselIndex * (100 / visibleCount)}%)` }}>
              {featuredCatalog.map((product) => (
                <div key={product.id} style={{ width: `${100 / visibleCount}%` }} className="flex-shrink-0 p-4 border-r border-gray-200 last:border-r-0">
                  <HeavyProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS & BEST SELLERS */}
      <section className="bg-gray-100 border-y border-gray-200 py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div>
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-300 pb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight uppercase">New Arrivals</h2>
              <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-sm flex items-center gap-1 uppercase">View All <ArrowRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => <HeavyProductCard key={product.id} product={product} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-300 pb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight uppercase">Best Sellers</h2>
              <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-sm flex items-center gap-1 uppercase">View All <ArrowRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => <HeavyProductCard key={product.id} product={product} />)}
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE US? */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-orange-600 font-black text-xs tracking-[0.2em] uppercase mb-3 block">Enterprise Infrastructure</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tight uppercase">Why Choose Density Electronics?</h2>
          <p className="text-gray-600 text-base font-medium mt-3 max-w-2xl mx-auto">We built our logistics and sourcing networks to support everyone from solo makers to massive OEMs scaling up manufacturing lines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", icon: <ShieldCheck size={28} />, title: "100% Genuine Silicon", desc: "No clones. We source directly from official manufacturers like Espressif and DWIN. Every component is guaranteed authentic." },
            { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", icon: <Zap size={28} />, title: "Same-Day Dispatch", desc: "Strict SLA logistics. Orders placed before 2 PM IST are handed to our premium courier partners the very same day." },
            { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", icon: <Headphones size={28} />, title: "Expert Support", desc: "Our engineering team provides pinouts, datasheets, and hands-on integration support for complex sensor and display setups." },
            { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", icon: <FileText size={28} />, title: "GST Invoicing", desc: "Seamless procurement for businesses. 18% GST invoices are automatically generated with your company GSTIN." },
            { img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800", icon: <Truck size={28} />, title: "ESD-Safe Packaging", desc: "Strict adherence to anti-static protocols. Sensitive ICs are packed in rigid corrugated boxes and ESD bags." },
            { img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800", icon: <Building2 size={28} />, title: "Institutional POs", desc: "We actively partner with university labs, research institutes, and government sectors to fulfill large-scale purchase orders." }
          ].map((feature, idx) => (
            <div key={idx} className="group relative h-[320px] rounded-lg overflow-hidden border border-gray-200 hover:border-orange-500 shadow-md transition-all">
              <img src={feature.img} alt={feature.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/40 group-hover:via-[#0f172a]/90 transition-colors"></div>
              
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded flex items-center justify-center mb-4 backdrop-blur-sm border border-orange-500/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED GOOGLE REVIEWS */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 pb-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <h2 className="text-xl font-black text-[#1e293b] tracking-tight uppercase">Verified Procurement Feedback</h2>
              </div>
              <p className="text-gray-500 text-xs font-medium">Rated 4.9/5 by Lead Engineers and Procurement Managers across India.</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-sm">
              <span className="text-[#1e293b] font-black text-sm mr-1">4.9</span>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rohan M.", title: "Procurement Manager, EV Tech",
                text: "Sourced 500+ ESP32 modules for our latest production run. Density delivered genuine Espressif stock with proper ESD packaging. 18% GST input was seamless.",
              },
              {
                name: "Dr. Alok V.", title: "HOD Electronics, Govt Engineering College",
                text: "The easiest institutional PO experience we've had. Fast delivery of sensor kits and dev boards. The technical datasheets provided saved our students weeks of work.",
              },
              {
                name: "Siddharth K.", title: "Lead Hardware Engineer, Automata",
                text: "Finally a reliable supplier for genuine DWIN HMI displays in India. Same-day dispatch is real—ordered at 1 PM, dispatched by 4 PM. Highly recommended for OEMs.",
              }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded shadow-sm relative">
                <div className="absolute top-6 right-6 text-gray-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />)}
                </div>
                <p className="text-gray-700 text-xs leading-relaxed font-medium mb-6 relative z-10">"{review.text}"</p>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-[#1e293b] font-black text-sm uppercase">{review.name}</h4>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{review.title}</p>
                  </div>
                  <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200 text-[9px] font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 size={10} /> Verified
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCUREMENT F.A.Q. */}
      <section id="faq" className="bg-[#1e293b] py-20 text-white border-t-4 border-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            
            <div className="w-full md:w-1/3 shrink-0">
              <div className="sticky top-24">
                <HelpCircle size={48} className="text-orange-500 mb-6" strokeWidth={2} />
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-4">
                  Procurement <br /> F.A.Q.
                </h2>
                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                  Find quick answers to our most common B2B logistics, tax, and shipping inquiries.
                </p>
                <a href="mailto:support@densityelectronics.com" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-bold text-sm uppercase tracking-wider">
                  Contact Support <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-6">
              {[
                { q: "Do you provide GST invoices for corporate orders?", a: "Yes, standard 18% GST invoices are automatically generated for all institutional and corporate purchases. Simply enter your GSTIN during the checkout process." },
                { q: "What are your shipping and dispatch timelines?", a: "Dispatch is guaranteed same-day for orders placed before 2 PM IST. Standard delivery takes 3-5 business days depending on your pin code across India. Expedited options are available." },
                { q: "Do you accept College or Enterprise Purchase Orders (POs)?", a: "Absolutely. We actively work with educational institutions and enterprise hardware teams. Contact our support desk with your official PO to arrange net-terms if applicable." },
                { q: "Are technical datasheets and pinouts available?", a: "Yes, full PDF datasheets, schematic symbols, footprints, and sample code for complex HMI displays are available directly on product pages or upon request." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-[#0f172a] border border-gray-700 hover:border-orange-500 p-6 sm:p-8 rounded-lg shadow-lg transition-colors">
                  <h4 className="text-white font-bold text-lg sm:text-xl mb-3 uppercase tracking-wide leading-snug">
                    <span className="text-orange-500 mr-2">Q.</span>{faq.q}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 8. FEATURED BRANDS (INFINITE RIGHT SCROLL MARQUEE) */}
      <section id="brands" className="bg-gray-50 border-y border-gray-200 py-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <h2 className="text-sm font-black text-[#1e293b] tracking-[0.2em] uppercase">Authorized Manufacturer Brands</h2>
        </div>
        
        <div className="w-full relative overflow-hidden">
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee-right py-2">
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 flex items-center justify-center w-[180px] h-20 mx-3 bg-white border border-gray-200 rounded shadow-sm hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-10 max-w-[130px] object-contain group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRE-FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-12">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl overflow-hidden relative shadow-lg border border-orange-700">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1e293b] opacity-20 blur-[80px] rounded-full mix-blend-multiply pointer-events-none"></div>
          
          <div className="px-8 py-12 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase mb-4 text-shadow-sm">
                Ready to source for production?
              </h2>
              <p className="text-orange-50 text-sm sm:text-base font-medium leading-relaxed">
                Whether you need a single ESP32 for a prototype or 5,000 customized displays for manufacturing, we have the inventory and expertise to support you.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link to="/bulk" className="bg-[#1e293b] hover:bg-gray-900 text-white px-10 py-4 rounded font-black text-sm uppercase tracking-widest transition-colors shadow-xl whitespace-nowrap block text-center w-full lg:w-auto">
                Request Bulk Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}