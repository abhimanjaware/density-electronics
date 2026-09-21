import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, ChevronLeft, ChevronRight, Star,
  ShieldCheck, HelpCircle, Cpu, FileText, CheckCircle2,
  Zap, Truck, Headphones, Building2, ShoppingCart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';

import heroBg1 from '../assets/bg2.png';
import heroBg2 from '../assets/bg1.png';
import heroBg3 from '../assets/bg3.png';
import stampImg from '../assets/stamp.png';

// 1. FAST NATIVE SCROLL ANIMATION
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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" } 
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
  "Development Boards": "https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/766/NUCLEO-F401RE.JPG?hidebanner=true",
  "Sensor": "https://images.unsplash.com/photo-1595692682118-774e5182f484?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Sensor Modules": "https://images.unsplash.com/photo-1595692682118-774e5182f484?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Display": "https://quartzcomponents.com/cdn/shop/products/OLEDDisplay0.96InchI2CInterface4PinBlueSSD1306.jpg?v=1698321495",
  "Motors": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2016%2F05%2FNEMA17-4.2-kg-cm-Stepper-Motor.png&w=1920&q=90",
  "Power": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7ZknwPCQ_Pk8ay0tZQPqQovb7hz-zEqm6AEVlSoSlQ&s=10",
  "Wireless": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vKXeylmE575Iw8HKkgI9fICfXgbpqTgUyOA0a0mzRQ&s=10",
  "Cellular": "https://img.freepik.com/premium-photo/closeup-view-cell-phones-circuit-board-revealing-intricate-electronic-components-glimpse-into-world-smartphone-repair_248459-33198.jpg?w=2000",
  "RF Antenna": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWAxI2H3YEo5RXosWDj7u9X8Nvp56DPabBTFdTwrxSw&s",
  "Memory": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXQwcopzeUCuusX8vYXzl198sUyUihDQwke9AeFvOBA&s=10",
  "Supplier Brand": "https://ecdn6.globalso.com/upload/p/1355/source/2024-11/673c3a82ae33158189.jpg",
  "Robotics Project": "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/6/003/217/524/MFG_ROB0182_web%28640x640%29.jpg?hidebanner=true",
  "Robotics Project Kits": "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/6/003/217/524/MFG_ROB0182_web%28640x640%29.jpg?hidebanner=true",
  "Tools & Soldering": "https://thumbs.dreamstime.com/b/soldering-electronic-components-onto-pcb-electronics-repair-digital-technology-257617553.jpg",
  "Wiring & Breadboards": "https://sfxpcb.com/wp-content/uploads/2023/09/Breadboard-600x450.jpg",
  "Motor Drivers": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2015%2F12%2F32.jpg&w=1920&q=90",
  "Batteries & Power Management": "https://images.unsplash.com/photo-1550496923-a0e3ef948e3a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Electronic Components": "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/1/300/308/999/MFG_DFR0216_sml.jpg",
  "Relays": "https://quartzcomponents.com/cdn/shop/files/12V30ASingleChannelRelayModulewithOptocouplerHigh_LowLevelTrigger_2.jpg?v=1755932707",
  "3D Printing": "https://3dprintingperth.com/cdn/shop/products/V177-AL-MBMP07825-1_Replicator__Right_Giza_web__08720-02_2048x2048.png?v=1662006047",
  "Module": "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/6/003/233/001/MFG_1528_6331_web%28640x640%29.jpg?hidebanner=true",
  "Mechanical Equipments": "https://content.misumi-ec.com/image/upload/t_product_main/v1/p/cn/product/series/110310971639/110310971639_20240123141158.jpg",
  "Camera Modules": "https://tse3.mm.bing.net/th/id/OIP.jWcPgfkAfksilzRyzNqSiwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
};


  const brands = [
    { name: "DWIN", logo: "https://www.stoneitech.com/wp-content/uploads/2022/06/cropped-%E5%85%AC%E5%8F%B8Logo-300x100-1-131x44.jpg" },
    { name: "SONYTEK", logo: "https://sonytech.in/Final%20Logo.png" },
    { name: "ESPRESSIF", logo: "https://www.espressif.com/sites/all/themes/espressif/logo-black.svg" },
    { name: "ARDUINO", logo: "https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg" },
    { name: "Puya", logo: "https://static.wixstatic.com/media/263487_04b3ef2cd73342dabf6aac9ebf5072dc~mv2.gif" },
    { name: "SIMCom", logo: "https://www.thebusinessresearchcompany.com/_next/image?url=%2Fimages%2FTBRC%20full%20logo%20transparent.avif&w=256&q=75" },
    { name: "SKYMIRR", logo: "https://skymirr.com/wp-content/uploads/2023/04/skymirr-logo-3d-768x188.png" }
  ];

  const HeavyProductCard = ({ product }) => {
    const isAdded = !!addedIds[product.id];
    const isOutOfStock = product.stock === 0;

    return (
      <div className="bg-white border border-gray-100 hover:border-orange-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col relative group h-full text-left rounded-xl overflow-hidden">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.stock > 0 ? (
            <span className="bg-emerald-50/90 backdrop-blur-sm text-emerald-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-emerald-200 shadow-sm">In Stock</span>
          ) : (
            <span className="bg-red-50/90 backdrop-blur-sm text-red-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-red-200 shadow-sm">Out of Stock</span>
          )}
        </div>

        <Link to={`/product/${product.slug}`} className="relative aspect-square w-full p-3 sm:p-4 flex items-center justify-center bg-white border-b border-gray-50 shrink-0 overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out" />
          <img src={stampImg} alt="Density Electronics" loading="lazy" className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 object-contain z-10" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200"></div>
        </Link>

        <div className="p-3 sm:p-4 flex flex-col flex-grow bg-white">
          <div className="text-[10px] text-gray-500 font-mono mb-1.5 flex justify-between items-center uppercase">
            <span className="truncate mr-2 hidden sm:inline">P/N: {product.specifications?.partNumber || product.id}</span>
            <span className="text-orange-600 font-bold truncate">{product.category}</span>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h4 className="font-bold text-[12px] sm:text-[13px] text-[#1e293b] group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug mb-3">
              {product.name}
            </h4>
          </Link>

          <div className="mt-auto border-t border-gray-100 pt-3">
            <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Unit Price (Ex. GST)</div>
            <div className="flex items-end justify-between mb-3 sm:mb-4">
              <div className="text-base sm:text-xl font-black text-[#1e293b]">₹{product.price.toFixed(2)}</div>
              <div className="text-[10px] text-gray-500 flex items-center gap-0.5 hidden sm:flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-[#f59e0b] fill-[#f59e0b]" />)}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                disabled={isOutOfStock}
                onClick={() => handleAddToCart(product)}
                className={`w-full text-[11px] font-bold uppercase tracking-wider h-11 sm:h-10 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center cursor-pointer ${isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isAdded
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30 shadow-lg'
                    : 'bg-orange-600 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 text-white' 
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
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] font-sans pb-16 overflow-x-hidden">
      <link rel="preload" as="image" href={heroBg1} fetchPriority="high" />

      {/* 1. HERO SECTION (100dvh on mobile, 70vh on desktop) */}
      <section className="relative w-full h-[50dvh] lg:h-[70vh] min-h-[500px] flex items-center overflow-hidden bg-[#050b1a]">
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

        {/* Centered on mobile, left-aligned on desktop */}
        <div className="relative z-20 max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16 w-full flex flex-col justify-center items-center lg:items-start h-full pt-10 sm:pt-0">
          <div className="w-full sm:w-[90%] lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative w-full min-h-[240px] sm:min-h-[200px] mb-6 sm:mb-8">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-300 ease-out ${currentSlide === index
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                  <div className="text-emerald-400 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-3 flex items-center justify-center lg:justify-start">
                    {slide.eyebrow}
                  </div>

                  <h1 className="text-[38px] leading-[1.15] sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 sm:mb-5 drop-shadow-lg">
                    {slide.titleLine1}<br className="hidden sm:block" />
                    <span className="text-[#ffb700] drop-shadow-md">{slide.titleLine2}</span> <span className="text-[#ffb700] drop-shadow-md">{slide.titleLine3}</span>
                  </h1>

                  <p className="text-gray-300 text-[14px] sm:text-[15px] lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium drop-shadow pr-4 sm:pr-0">
                    {slide.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 relative z-30 w-full sm:w-auto mt-6 lg:mt-2">
              <Link to="/shop" className="w-full sm:w-auto justify-center bg-[#ffb700] hover:bg-[#e6a300] text-black px-6 py-4 sm:px-8 sm:py-3.5 rounded-full font-black text-[14px] uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,183,0,0.3)] min-h-[50px]">
                <ShoppingCart size={18} strokeWidth={2.5} /> SHOP NOW <ChevronRight size={16} strokeWidth={3} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS STRIP */}
      <FadeInSection delay={0}>
        <div className="bg-white border-b border-gray-200 shadow-sm relative z-20">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between gap-6 sm:gap-8 min-w-max text-[12px] sm:text-[13px] font-bold text-gray-700">
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

      {/* 8. FEATURED BRANDS */}
      <section id="brands" className="bg-gray-50 border-y border-gray-200 py-12 sm:py-16 overflow-hidden relative">
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
          <div className="max-w-[1500px] mx-auto px-5 lg:px-8 mb-8 sm:mb-10 text-center">
            <span className="text-[#f59e0b] font-black text-[10px] tracking-[0.25em] uppercase mb-2 block">
              Global Supply Network
            </span>
            <h2 className="text-[26px] leading-tight sm:text-3xl lg:text-4xl font-black text-[#0b1524] tracking-tight uppercase mb-3">
              Authorized Brands
            </h2>
            <p className="text-gray-500 sm:text-gray-600 text-[13px] sm:text-sm font-medium max-w-2xl mx-auto leading-relaxed px-4">
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
                  className="flex-shrink-0 flex items-center justify-center w-[140px] sm:w-[200px] h-16 sm:h-20 mx-2 sm:mx-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer group px-3"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-8 sm:max-h-12 max-w-[100px] sm:max-w-[130px] object-contain transition-all duration-200 group-hover:grayscale group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="animate-slide-right py-1">
              {[...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse(), ...[...brands].reverse()].map((brand, idx) => (
                <div
                  key={`bottom-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-[140px] sm:w-[200px] h-16 sm:h-20 mx-2 sm:mx-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer group px-3"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-8 sm:max-h-12 max-w-[100px] sm:max-w-[130px] object-contain transition-all duration-200 group-hover:grayscale group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 2. MAXIMIZED CATEGORY DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <FadeInSection>
          <div className="mb-6 sm:mb-8 border-b-2 border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-[22px] sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">Component Directory</h2>
              <p className="text-gray-500 text-[13px] sm:text-sm font-medium mt-1">Browse our complete, image-indexed inventory of industrial hardware.</p>
            </div>
            <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-[13px] uppercase tracking-wide flex items-center gap-1 group transition-colors">
              View All Categories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat, idx) => (
            <FadeInSection key={idx} delay={idx * 20}>
              <Link
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group relative h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden border border-gray-100 hover:border-orange-500 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out block"
              >
                <img
                  src={categoryImages[cat] || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"}
                  alt={cat}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent group-hover:via-[#0f172a]/80 transition-colors duration-200"></div>

                <div className="relative z-10 h-full p-3 sm:p-4 flex flex-col justify-end">
                  <h3 className="font-black text-[13px] sm:text-sm text-white uppercase tracking-wide leading-tight mb-1 group-hover:text-orange-400 transition-colors duration-200 shadow-sm">
                    {cat}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-400 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    Explore <ArrowRight size={12} className="hidden sm:inline" />
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 overflow-hidden">
        <FadeInSection>
          <div className="flex items-center justify-between mb-5 border-b-2 border-gray-200 pb-3">
            <h2 className="text-[22px] sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">Featured Hardware</h2>
            <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-[13px] flex items-center gap-1 uppercase group">
              View Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInSection>

        <FadeInSection delay={30}>
          <div className="relative flex flex-col lg:flex-row items-stretch border border-gray-200 bg-white shadow-sm rounded-2xl overflow-hidden">
            <div className="w-full lg:w-[280px] bg-[#1e293b] p-6 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200 shrink-0 relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest border text-orange-400 border-orange-400/30 bg-orange-400/10 px-2.5 py-1 mb-3 rounded-full">Top Rated</span>
                <h3 className="text-[22px] sm:text-2xl font-black text-white leading-tight mb-3 uppercase">Enterprise<br />Standards</h3>
                <p className="text-[13px] sm:text-sm text-gray-400 mb-6 leading-relaxed font-medium">Our most requested components. High accuracy, robust builds, ready for mass production integration.</p>
                <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white text-[12px] font-bold uppercase px-5 py-3.5 rounded-xl transition-all duration-200 w-full shadow-lg shadow-orange-600/20">
                  Shop Selection <ArrowRight size={14} />
                </Link>
              </div>
              <Cpu size={140} className="absolute -bottom-6 -right-6 text-white opacity-5 pointer-events-none transform rotate-12" />
            </div>

            <div className="relative flex-1 overflow-hidden min-w-0 bg-gray-50/50 ">
              <button onClick={handlePrevSlide} disabled={!canScrollPrev} aria-label="Previous" className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur border border-gray-500 shadow-xl flex items-center justify-center rounded-full transition-all duration-200 ${canScrollPrev ? 'text-[#1e293b] hover:border-orange-500 hover:text-orange-600 hover:scale-105 active:scale-95 cursor-pointer' : 'text-gray-300 cursor-not-allowed opacity-0 scale-90'}`}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNextSlide} disabled={!canScrollNext} aria-label="Next" className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur border border-gray-200 shadow-xl flex items-center justify-center rounded-full transition-all duration-200 ${canScrollNext ? 'text-[#1e293b] hover:border-orange-500 hover:text-orange-600 hover:scale-105 active:scale-95 cursor-pointer' : 'text-gray-300 cursor-not-allowed opacity-0 scale-90'}`}>
                <ChevronRight size={20} />
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
      <section className="bg-gray-50 border-y border-gray-200 py-12 sm:py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

          <div>
            <FadeInSection>
              <div className="flex items-center justify-between mb-5 border-b-2 border-gray-200 pb-3">
                <h2 className="text-[22px] sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">New Arrivals</h2>
                <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-[13px] flex items-center gap-1 uppercase group">View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link>
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
              <div className="flex items-center justify-between mb-5 border-b-2 border-gray-200 pb-3">
                <h2 className="text-[22px] sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">Best Sellers</h2>
                <Link to="/shop" className="text-orange-600 hover:text-orange-700 font-bold text-[13px] flex items-center gap-1 uppercase group">View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link>
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
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <FadeInSection>
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-orange-600 font-black text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-3 block">Enterprise Infrastructure</span>
            <h2 className="text-[26px] leading-tight sm:text-3xl font-black text-[#1e293b] tracking-tight uppercase">Why Choose Density?</h2>
            <p className="text-gray-500 sm:text-gray-600 text-[13px] sm:text-base font-medium mt-3 max-w-2xl mx-auto px-2">We built our logistics and sourcing networks to support everyone from solo makers to massive OEMs scaling up manufacturing lines.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600", icon: <ShieldCheck size={24} />, title: "100% Genuine", desc: "No clones. We source directly from official manufacturers like Espressif and DWIN." },
            { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600", icon: <Zap size={24} />, title: "Same-Day Dispatch", desc: "Strict SLA logistics. Orders before 2 PM IST are handed to premium couriers same day." },
            { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", icon: <Headphones size={24} />, title: "Expert Support", desc: "Our engineering team provides datasheets and hands-on integration support." },
            { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600", icon: <FileText size={24} />, title: "GST Invoicing", desc: "Seamless procurement for businesses. 18% GST invoices are automatically generated." },
            { img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=600", icon: <Truck size={24} />, title: "ESD Packaging", desc: "Strict adherence to anti-static protocols. Sensitive ICs are packed in ESD bags." },
            { img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600", icon: <Building2 size={24} />, title: "Institutional POs", desc: "We partner with university labs and government sectors to fulfill large-scale orders." }
          ].map((feature, idx) => (
            <FadeInSection key={idx} delay={idx * 30}>
              <div className="group relative h-[220px] sm:h-[260px] rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-500 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out">
                <img src={feature.img} alt={feature.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/20 group-hover:via-[#0f172a]/80 transition-colors duration-200"></div>

                <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col justify-end">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center mb-3 backdrop-blur-md border border-orange-500/30 shadow-sm transform group-hover:scale-105 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-[18px] sm:text-xl font-black text-white mb-1.5 uppercase tracking-wide">{feature.title}</h3>
                  <p className="text-[13px] sm:text-sm text-gray-300 leading-snug font-medium line-clamp-2">{feature.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED GOOGLE REVIEWS */}
      <section className="bg-white border-t border-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 border-b border-gray-100 pb-4 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <h2 className="text-[18px] sm:text-xl font-black text-[#1e293b] tracking-tight uppercase">Verified Feedback</h2>
                </div>
                <p className="text-gray-500 text-[12px] sm:text-[13px] font-medium">Rated 4.9/5 by Engineers & Procurement Managers.</p>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded shadow-sm self-start sm:self-auto">
                <span className="text-[#1e293b] font-black text-[13px] mr-1">4.9</span>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#FBBC05] fill-[#FBBC05]" />)}
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                <div className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative group h-full">
                  <div className="absolute top-5 right-5 text-gray-200 group-hover:text-blue-100 transition-colors duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#FBBC05] fill-[#FBBC05]" />)}
                  </div>
                  <p className="text-gray-600 text-[13px] sm:text-sm leading-relaxed font-medium mb-5 relative z-10">"{review.text}"</p>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-[#1e293b] font-black text-[12px] sm:text-[13px] uppercase">{review.name}</h4>
                      <p className="text-gray-500 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">{review.title}</p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 text-[9px] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 size={10} /> Verified
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCUREMENT F.A.Q. */}
      <section id="faq" className="bg-[#0f172a] py-16 sm:py-20 text-white border-t-4 border-orange-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16">

            <div className="w-full md:w-1/3 shrink-0">
              <FadeInSection>
                <div className="sticky top-24">
                  <HelpCircle size={40} className="text-orange-500 mb-4 sm:mb-5" strokeWidth={2.5} />
                  <h2 className="text-[26px] sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-3">
                    Procurement <br className="hidden md:block" /> F.A.Q.
                  </h2>
                  <p className="text-gray-400 text-[13px] sm:text-sm font-medium leading-relaxed mb-5">
                    Find quick answers to our most common B2B logistics, tax, and shipping inquiries.
                  </p>
                  <a href="mailto:support@densityelectronics.com" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold text-[13px] sm:text-sm uppercase tracking-wider group transition-colors">
                    Contact Support <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </FadeInSection>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-4">
              {[
                { q: "Do you provide GST invoices for corporate orders?", a: "Yes, standard 18% GST invoices are automatically generated for all institutional and corporate purchases. Simply enter your GSTIN during checkout." },
                { q: "What are your shipping and dispatch timelines?", a: "Dispatch is guaranteed same-day for orders placed before 2 PM IST. Standard delivery takes 3-5 business days across India." },
                { q: "Do you accept College or Enterprise POs?", a: "Absolutely. We actively work with educational institutions and enterprise teams. Contact support with your official PO to arrange net-terms." },
                { q: "Are technical datasheets and pinouts available?", a: "Yes, full PDF datasheets, schematic symbols, and sample code are available directly on product pages or upon request." }
              ].map((faq, idx) => (
                <FadeInSection key={idx} delay={idx * 30}>
                  <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                    <h4 className="text-white font-bold text-[15px] sm:text-lg mb-2 uppercase tracking-wide leading-snug flex items-start gap-2.5">
                      <span className="text-orange-500 mt-0.5">Q.</span>{faq.q}
                    </h4>
                    <p className="text-[13px] sm:text-sm text-gray-400 leading-relaxed font-medium pl-6 sm:pl-7">
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
      <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-10 sm:mt-16 mb-10 sm:mb-16">
        <FadeInSection>
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite] rounded-xl sm:rounded-2xl overflow-hidden relative shadow-xl border border-orange-400">
            <style>{`
              @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            `}</style>
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#0f172a] opacity-20 blur-[60px] sm:blur-[80px] rounded-full mix-blend-multiply pointer-events-none"></div>

            <div className="px-4 py-8 sm:px-12 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
              <div className="max-w-2xl w-full text-center lg:text-left">
                <h2 className="text-xl leading-tight sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase mb-3 sm:mb-4 drop-shadow-sm">
                  Ready to source for production?
                </h2>
                <p className="text-orange-50 text-xs sm:text-base font-medium leading-relaxed px-1 sm:px-4 lg:px-0">
                  Whether you need a single ESP32 for a prototype or 5,000 customized displays, we have the inventory to support you.
                </p>
              </div>
              <div className="flex-shrink-0 w-full lg:w-auto mt-1 lg:mt-0">
                <Link to="/bulk" className="bg-[#0f172a] hover:bg-black text-white px-5 py-3.5 sm:px-10 sm:py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-[0.12em] sm:tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg whitespace-normal sm:whitespace-nowrap block text-center w-full lg:w-auto border border-gray-800">
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