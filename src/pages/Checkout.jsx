import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, ArrowRight, User, MapPin, ShieldCheck, 
  Building2, Lock, CreditCard, Receipt, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

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
    
    // Premium Toast Validation
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit postal code.");
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
    <div className="bg-slate-50 min-h-screen font-sans pb-24 pt-6 sm:pt-12">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-5">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 text-xs font-black uppercase tracking-widest transition-colors mb-4 w-fit">
              <ArrowLeft size={16} strokeWidth={3} /> Return to Draft
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Finalize Procurement
            </h1>
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-sm shadow-sm flex items-center gap-2 w-fit">
            <Lock size={16} /> 256-Bit SSL Secured
          </div>
        </div>

        <form onSubmit={handleCheckoutSubmit} className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* LEFT COLUMN: Clean, Enterprise Forms */}
          <div className="w-full xl:w-2/3 space-y-6">
            
            {/* Business Information Box */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 sm:p-8">
              <h2 className="text-[15px] sm:text-base font-black mb-6 text-slate-900 uppercase tracking-widest flex items-center gap-3 border-b border-gray-100 pb-4">
                <Building2 size={22} className="text-orange-500" /> Enterprise Details <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-sm ml-2 tracking-widest">OPTIONAL</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">Company / Institution Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Density Electronics Pvt Ltd" className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">GSTIN Number</label>
                  <input type="text" name="gstin" value={formData.gstin} onChange={handleInputChange} placeholder="27AAAAA0000A1Z5" className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white uppercase shadow-sm" maxLength="15" />
                </div>
              </div>
            </div>

            {/* Contact Details Box */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 sm:p-8">
              <h2 className="text-[15px] sm:text-base font-black mb-6 text-slate-900 uppercase tracking-widest flex items-center gap-3 border-b border-gray-100 pb-4">
                <User size={22} className="text-orange-500" /> Point of Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                  <div className="flex shadow-sm rounded-sm">
                    <span className="inline-flex items-center px-4 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-black rounded-l-sm">+91</span>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} pattern="[0-9]{10}" maxLength="10" placeholder="10-digit number" className="w-full border border-gray-300 rounded-r-sm px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="purchasing@company.com" className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white shadow-sm" />
                </div>
              </div>
            </div>

            {/* Shipping Logistics Box */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 sm:p-8">
              <h2 className="text-[15px] sm:text-base font-black mb-6 text-slate-900 uppercase tracking-widest flex items-center gap-3 border-b border-gray-100 pb-4">
                <MapPin size={22} className="text-orange-500" /> Shipping Logistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">Complete Delivery Address <span className="text-red-500">*</span></label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Facility/Building, Street, Tech Park" className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white shadow-sm" />
                </div>
                
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">State <span className="text-red-500">*</span></label>
                  <select required name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white cursor-pointer shadow-sm">
                    <option value="" disabled>Select State</option>
                    {Object.keys(INDIA_STATES_CITIES).sort().map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">City <span className="text-red-500">*</span></label>
                  <select required name="city" value={formData.city} onChange={handleInputChange} disabled={!formData.state} className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white cursor-pointer disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed shadow-sm">
                    <option value="" disabled>Select City</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">Postal Code (PIN) <span className="text-red-500">*</span></label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} maxLength="6" pattern="[0-9]{6}" placeholder="6-digit PIN" className="w-full md:w-1/2 border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white tracking-widest shadow-sm" />
                </div>
              </div>

              {/* Save Information Checkbox */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                  <input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleInputChange} className="w-5 h-5 text-orange-600 border-gray-300 rounded-sm focus:ring-orange-500 cursor-pointer" />
                  <span className="text-[13px] font-bold text-gray-600 group-hover:text-slate-900 transition-colors select-none">Securely save routing information for future orders</span>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Proceed Button */}
          <div className="w-full xl:w-1/3 sticky top-28 space-y-6">
            
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 bg-slate-100 border-b border-gray-200">
                <h2 className="text-[18px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
                  <Receipt size={22} className="text-orange-500" /> Payment Summary
                </h2>
              </div>
              
              <div className="p-6 sm:p-8">
                
                {/* Condensed Cart Summary */}
                <div className="mb-6">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Requisition Items ({cartItems.length})</div>
                  <div className="space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-2">
                        <div className="text-xs font-bold text-slate-700 line-clamp-1 flex-1">
                          {item.quantity}x {item.name}
                        </div>
                        <span className="text-xs font-black text-slate-900 shrink-0">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotals */}
                <div className="space-y-3 text-sm mb-6 border-y border-gray-100 py-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-bold">Subtotal (Excl. Tax)</span>
                    <span className="font-black text-slate-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-bold">Logistics & Handling</span>
                    <span className="font-black text-slate-900">
                      {shipping === 0 
                        ? <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest">Complimentary</span> 
                        : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                
                {/* Massive Total */}
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="block text-lg font-black uppercase text-slate-900 tracking-tight">Amount Due</span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Excludes GST</span>
                  </div>
                  <span className="text-3xl font-black text-orange-600 tracking-tighter">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Navigation Action Button */}
                <button 
                  type="submit" 
                  className="w-full bg-slate-900 hover:bg-black text-white font-black text-[14px] sm:text-[15px] uppercase tracking-widest py-4 rounded-sm shadow-md flex items-center justify-center gap-3 transition-all active:scale-95 border border-slate-800"
                >
                  <CreditCard size={18} /> Initialize Payment
                </button>
                
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-gray-200 text-center flex items-center justify-center gap-2">
                <FileText size={14} className="text-gray-400" />
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  18% GST invoice provided upon fulfillment.
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}