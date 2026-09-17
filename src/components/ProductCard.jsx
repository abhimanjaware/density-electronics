import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  // Check if this specific product is already in the global cart
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = (e) => {
    e.preventDefault(); // Prevents the Link from navigating when clicking the button
    if (quantity === 0) {
      addToCart(product, 1);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-[1.25rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
      
      {/* Image Section */}
      <Link to={`/product/${product.slug}`} className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-[#f8f9fa] flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
        />
        {/* Category Badge overlay on image */}
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-[#1A1726] text-[9px] font-bold px-2 py-1.5 rounded-sm uppercase tracking-widest shadow-sm">
          {product.category}
        </div>
      </Link>

      {/* Details Section */}
      <div className="flex flex-col flex-grow">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-bold text-[#1A1726] text-lg leading-tight mb-1 hover:text-[#2563EB] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-5 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
        
        {/* Price & Action Button */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="font-black text-xl text-[#1A1726]">
            ₹{product.price.toFixed(2)}
          </span>
          
          {/* Dynamic Add to Cart / Counter */}
          {quantity === 0 ? (
            <button 
              onClick={handleIncrement}
              className="bg-[#F0EBF8] text-[#2563EB] h-9 w-9 flex items-center justify-center rounded-full hover:bg-[#2563EB] hover:text-white transition-colors"
              title="Add to Cart"
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="flex items-center bg-white border border-gray-600 rounded-full h-9 w-24 shadow-sm overflow-hidden">
              <button 
                onClick={handleDecrement}
                className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-[#1A1726] hover:bg-gray-50 transition-colors"
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="w-8 text-center font-bold text-[#1A1726] text-sm">
                {quantity}
              </span>
              <button 
                onClick={handleIncrement}
                className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-[#1A1726] hover:bg-gray-50 transition-colors"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}