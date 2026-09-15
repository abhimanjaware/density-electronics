import { useState } from 'react';
import {  useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Heart, RefreshCw, ShoppingBag, ShoppingCart, 
  MapPin, ShieldCheck, Truck, HeadphonesIcon, Banknote, CheckCircle2, ArrowLeft 
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- ADD THIS BLOCK ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const [pincode, setPincode] = useState('');

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-black text-[#1A1726] mb-2">Product Not Found</h2>
        <Link to="/shop" className="bg-[#2A1B54] text-white font-bold text-xs px-6 py-3 rounded-lg shadow-sm">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Mock reward points based on price
  const rewardPoints = Math.floor(product.price * 0.10);

  return (
    <div className="bg-white min-h-screen pb-16 pt-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        {/* <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#2A1B54] text-sm font-bold mb-4 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft size={16} strokeWidth={2.5} /> Back
        </button> */}

        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-6 flex items-center flex-wrap gap-2">
          <Link to="/" className="hover:text-[#2A1B54]">Home</Link>
          <span>→</span>
          <Link to="/shop" className="hover:text-[#2A1B54]">Shop</Link>
          <span>→</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#2A1B54]">
            {product.category}
          </Link>
          <span>→</span>
          <span className="text-[#2A1B54] font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* LEFT COLUMN: Images & Delivery Checker */}
          <div className="flex flex-col gap-6">
            {/* Main Image Box */}
            <div className="border border-gray-200 rounded-xl p-8 flex items-center justify-center min-h-[400px] relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[350px] max-w-full object-contain"
              />
              {/* Optional thumbnails row placeholder below main image */}
              <div className="absolute bottom-4 flex gap-2">
                <div className="w-16 h-16 border border-[#2A1B54] rounded-lg p-1 bg-white cursor-pointer">
                  <img src={product.image} alt="thumb" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-800">
                <MapPin size={18} className="text-red-500" />
                Check estimated delivery
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter 6-digit pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#2A1B54]"
                />
                <button className="bg-[#2A1B54] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#1A1726] transition-colors">
                  Check
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Information */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">{product.category}</span>
            <h1 className="text-3xl font-medium text-gray-900 mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-gray-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "fill-gray-300 text-gray-300" : ""} />
                ))}
              </div>
              <span className="text-sm text-gray-500">(0 customer review)</span>
            </div>

            <div className="text-sm text-gray-700 font-bold mb-3">
              SKU: <span className="text-[#2A1B54]">{product.specifications?.partNumber || product.id}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[28px] font-bold text-[#2A1B54]">₹ {product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-400">(Incl. GST)</span>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              Purchase this product now and earn <span className="font-bold">{rewardPoints} Density Points!</span>
            </p>

            <div className="text-sm mb-3">
              Availability: <span className="text-green-600 font-bold">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            <p className="text-sm text-gray-700 mb-6">
              For bulk orders or B2B inquiries, email us: <a href="mailto:sales@density.com" className="text-[#2A1B54] hover:underline font-medium">sales@density.com</a>
            </p>

            {/* Specifications List */}
            <div className="text-sm text-gray-700 space-y-2 mb-6">
              <p>1. {product.shortDescription}</p>
              <p>2. High Grade Industrial Component</p>
              <p>3. Perfect for IoT & Robotics</p>
            </div>

            {/* Grid Attributes */}
            <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm text-gray-800 font-medium mb-8">
              <div className="text-gray-500">MPN</div>
              <div>: N/A</div>
              <div className="text-gray-500">Brand</div>
              <div>: Density Electronics</div>
              <div className="text-gray-500">Category</div>
              <div>: {product.category}</div>
            </div>

            {/* Add to Cart / Actions Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-lg h-11 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-gray-600 hover:text-black font-medium">-</button>
                <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-gray-600 hover:text-black font-medium">+</button>
              </div>

              {/* Action Icons */}
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
              </button>
              <button className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <RefreshCw size={18} className="text-gray-600" />
              </button>

              {/* Cart Buttons */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="h-11 px-6 bg-[#EBE5F7] hover:bg-[#D9CEF1] text-[#2A1B54] font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                Add to Cart <ShoppingBag size={16} />
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="h-11 px-8 bg-[#FCE8D5] hover:bg-[#FAD9BC] text-[#D97706] font-bold text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                Buy Now <ShoppingCart size={16} />
              </button>
            </div>

            {addedMessage && (
              <div className="flex items-center gap-2 text-sm font-bold text-green-600 mb-4">
                <CheckCircle2 size={16} /> Added to cart!
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-5 gap-2 pt-6 border-t border-gray-100 text-center">
              <div className="flex flex-col items-center justify-start gap-2 text-xs text-gray-600 font-medium">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50"><RefreshCw size={16} className="text-gray-600" /></div>
                Have a Bulk
              </div>
              <div className="flex flex-col items-center justify-start gap-2 text-xs text-gray-600 font-medium">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50"><HeadphonesIcon size={16} className="text-gray-600" /></div>
                Need Support?
              </div>
              <div className="flex flex-col items-center justify-start gap-2 text-xs text-gray-600 font-medium">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50"><ShieldCheck size={16} className="text-gray-600" /></div>
                1 Year Warranty
              </div>
              <div className="flex flex-col items-center justify-start gap-2 text-xs text-gray-600 font-medium">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50"><Truck size={16} className="text-gray-600" /></div>
                Free Delivery
              </div>
              <div className="flex flex-col items-center justify-start gap-2 text-xs text-gray-600 font-medium">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50"><Banknote size={16} className="text-gray-600" /></div>
                Cash on
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}