import { useState } from 'react';
import { Building2, Globe, MapPin, MessageCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sell() {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    websiteUrl: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { companyName, country, websiteUrl, address } = formData;
    
    // Construct WhatsApp Message
    const message = `*New Seller Application (Density Electronics)*%0A%0A*Company Name:* ${companyName}%0A*Country:* ${country}%0A*Website:* ${websiteUrl}%0A*Address:* ${address}%0A%0A_I would like to apply to sell my components on your platform._`;
    
    // Redirect to WhatsApp using the Founder's Number
    window.open(`https://wa.me/919890400165?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      
      {/* 1. INDUSTRIAL HEADER */}
      <div className="bg-[#1e293b] border-b border-gray-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600 opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-gray-400">Seller Form</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Seller Form</h1>
          <p className="text-gray-400 text-sm font-medium border-l-2 border-orange-500 pl-3">
            Partner with India's premier industrial electronics supplier.
          </p>
        </div>
      </div>

      {/* 2. FORM CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden">
          
          <div className="bg-gray-50 border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight">Enterprise Onboarding</h2>
            <ShieldCheck size={28} className="text-orange-500" />
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider flex items-center gap-2">
                  <Building2 size={14} className="text-gray-400" /> Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                  className="w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Country Selection */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider flex items-center gap-2">
                  <Globe size={14} className="text-gray-400" /> Country Based Enterprises <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select Country</option>
                  <option value="India">India</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="China">China</option>
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Website URL */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider flex items-center gap-2">
                <Globe size={14} className="text-gray-400" /> Company Website URL <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://www.yourcompany.com"
                className="w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Company Address */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} className="text-gray-400" /> Company Address
              </label>
              <textarea
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full operational or registered address..."
                className="w-full bg-white border-2 border-gray-200 rounded px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-colors shadow-lg shadow-green-500/20"
              >
                <MessageCircle size={20} strokeWidth={2.5} /> Send Application via WhatsApp
              </button>
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase mt-4">
                You will be securely redirected to WhatsApp to submit your details directly to our procurement team.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}