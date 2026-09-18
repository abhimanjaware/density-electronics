import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Package, 
  Lock 
} from 'lucide-react';

// Indian States and major cities data structure
const INDIA_STATES_CITIES = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Agra", "Varanasi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"]
};

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) navigate('/cart');
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 50; 
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    companyName: '', gstin: '', name: '', phone: '', email: '', 
    address: '', state: '', city: '', pincode: '', saveInfo: true
  });
  
  const [availableCities, setAvailableCities] = useState([]);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('density_b2b_customer');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...parsedData, saveInfo: true }));
      if (parsedData.state && INDIA_STATES_CITIES[parsedData.state]) {
        setAvailableCities(INDIA_STATES_CITIES[parsedData.state]);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-update cities when state changes
    if (name === 'state') {
      setAvailableCities(INDIA_STATES_CITIES[value] || []);
      setFormData(prev => ({ ...prev, state: value, city: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    // Strict Validation
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit Mobile Number.");
      return;
    }
    if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
      alert("Please enter a valid 6-digit Pincode.");
      return;
    }

    // Save customer data if requested
    if (formData.saveInfo) {
      const dataToSave = { ...formData };
      delete dataToSave.saveInfo; 
      localStorage.setItem('density_b2b_customer', JSON.stringify(dataToSave));
    } else {
      localStorage.removeItem('density_b2b_customer');
    }

    // Navigate to the Payment page and pass the order payload
    navigate('/payment', { 
      state: { 
        customer: formData, 
        items: cartItems, 
        total, 
        shipping, 
        subtotal
      } 
    });
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-24 pt-8 sm:pt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b-2 border-gray-200 pb-5">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-orange-600 text-[12px] font-black uppercase tracking-widest transition-colors mb-4">
              <ArrowLeft size={16} strokeWidth={3} /> Back to Cart
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tighter uppercase">
              Secure Checkout
            </h1>
          </div>
          <div className="text-[12px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
            <Lock size={16} /> 256-Bit SSL Encrypted
          </div>
        </div>

        <form onSubmit={handleCheckoutSubmit} className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* LEFT COLUMN: Clean, Bold Forms */}
          <div className="w-full xl:w-2/3 space-y-8">
            
            {/* Business Information Box */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8">
              <h2 className="text-lg font-black mb-6 text-[#1e293b] uppercase tracking-wide flex items-center gap-3">
                <Building2 size={24} className="text-orange-500" /> B2B Information <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded ml-2">(Optional)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Company / Institute Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Density Electronics Pvt Ltd" className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">GSTIN Number</label>
                  <input type="text" name="gstin" value={formData.gstin} onChange={handleInputChange} placeholder="27AAAAA0000A1Z5" className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white uppercase" maxLength="15" />
                </div>
              </div>
            </div>

            {/* Contact Details Box */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8">
              <h2 className="text-lg font-black mb-6 text-[#1e293b] uppercase tracking-wide flex items-center gap-3">
                <User size={24} className="text-orange-500" /> Contact Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Mobile Number <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border-2 border-r-0 border-gray-200 bg-gray-100 text-gray-600 text-base font-black">+91</span>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} pattern="[0-9]{10}" maxLength="10" placeholder="10-digit number" className="w-full border-2 border-gray-200 rounded-r-lg px-4 py-3 text-base text-gray-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white" />
                </div>
              </div>
            </div>

            {/* Shipping Address Box */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8">
              <h2 className="text-lg font-black mb-6 text-[#1e293b] uppercase tracking-wide flex items-center gap-3">
                <MapPin size={24} className="text-orange-500" /> Shipping Destination
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Complete Address <span className="text-red-500">*</span></label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Building, Street, Area" className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">State <span className="text-red-500">*</span></label>
                  <select required name="state" value={formData.state} onChange={handleInputChange} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-bold focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white cursor-pointer">
                    <option value="" disabled>Select State</option>
                    {Object.keys(INDIA_STATES_CITIES).sort().map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">City <span className="text-red-500">*</span></label>
                  <select required name="city" value={formData.city} onChange={handleInputChange} disabled={!formData.state} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-bold focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="" disabled>Select City</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Pincode <span className="text-red-500">*</span></label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} maxLength="6" pattern="[0-9]{6}" placeholder="6-digit pincode" className="w-full md:w-1/2 border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-gray-50 focus:bg-white tracking-widest" />
                </div>
              </div>

              {/* Save Information Checkbox */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                  <input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleInputChange} className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" />
                  <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors select-none">Securely save this address for future orders</span>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Proceed Button */}
          <div className="w-full xl:w-1/3 sticky top-28 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-black text-[#1e293b] uppercase tracking-wide flex items-center gap-3">
                  <Package size={22} className="text-orange-500" /> Order Summary
                </h2>
              </div>
              
              <div className="p-6 sm:p-8">
                {/* Condensed Cart Items */}
                <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1e293b] line-clamp-1">{item.name}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase mt-0.5">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-sm font-black text-[#1e293b] shrink-0">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="space-y-4 text-sm mb-8 border-b border-gray-200 pb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-bold">Subtotal (Excl. Tax)</span>
                    <span className="font-black text-[#1e293b] text-base">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-bold">Shipping Cost</span>
                    <span className="font-black text-[#1e293b] text-base">
                      {shipping === 0 
                        ? <span className="text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-xs uppercase tracking-widest">Free</span> 
                        : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                
                {/* Massive Total */}
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="block text-lg font-black uppercase text-[#1e293b] tracking-tight">Total to Pay</span>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Inclusive of all taxes</span>
                  </div>
                  <span className="text-4xl font-black text-orange-600 tracking-tighter">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Navigation Action Button */}
                <button 
                  type="submit" 
                  className="w-full bg-[#1e293b] hover:bg-black text-white font-black text-base sm:text-lg uppercase tracking-widest py-5 rounded-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  Proceed to Payment <ArrowRight size={20} />
                </button>
                
                {/* Trust Badge below button */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Secure processing on next step <ShieldCheck size={14} className="text-emerald-500"/>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}