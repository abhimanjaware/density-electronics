import { useState } from 'react';
import { 
  Building2, PackageOpen, MessageSquare, ChevronRight, 
  ShieldCheck, Zap, Headphones, FileText, Truck, 
  HelpCircle, CheckCircle2, Factory, ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bulk() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    partNumber: '',
    quantity: '',
    timeline: 'Immediate',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, companyName, partNumber, quantity, timeline, message } = formData;
    
    // Construct Enterprise WhatsApp Message
    const text = `*B2B Bulk Enquiry (Density Electronics)*%0A%0A*Name:* ${name}%0A*Company:* ${companyName}%0A*Component / Part No:* ${partNumber}%0A*Quantity Required:* ${quantity}%0A*Expected Timeline:* ${timeline}%0A%0A*Additional Specs:* ${message}%0A%0A_Please provide a bulk quotation and lead time for the above._`;
    
    // Redirects to the Owner/Founder WhatsApp (+91 7499175707)
    window.open(`https://wa.me/917499175707?text=${text}`, '_blank');
  };

  const brands = [
    { name: "Sinda Display", logo: "https://www.sindadisplay.com/public/uploads/images/20230912/f1f854951d533bdd87fd4b9ea0e957d4.png" },
    { name: "Stone Display", logo: "https://www.stoneitech.com/wp-content/uploads/2022/06/cropped-%E5%85%AC%E5%8F%B8Logo-300x100-1-131x44.jpg" },
    { name: "Sonytek", logo: "https://sonytech.in/Final%20Logo.png" },
    { name: "Sky Mirr", logo: "https://skymirr.com/wp-content/uploads/2023/04/skymirr-logo-3d-768x188.png" },
    { name: "Arduino", logo: "https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg" },
    { name: "Puya", logo: "https://www.rflambda.com/assets/images/logo.png?v=20260820" },
    { name: "UMT", logo: "https://en.umtek.com/uploads/20250718/df54371f296d496b675eb09dc63c70e2.png" },
    { name: "Espressif", logo: "https://www.espressif.com/sites/all/themes/espressif/logo-black.svg" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-16">
      
      {/* 1. INDUSTRIAL HEADER */}
      <div className="bg-[#1e293b] border-b border-gray-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-gray-400">Bulk Enquiries</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
            Enterprise Procurement
          </h1>
          <p className="text-gray-300 text-base font-medium max-w-2xl border-l-4 border-orange-500 pl-4">
            Secure high-volume silicon, development boards, and industrial displays at wholesale pricing. Submit your Bill of Materials (BOM) below.
          </p>
        </div>
      </div>

      {/* 2. SPLIT LAYOUT: FORM & BENEFITS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: B2B Benefits */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight mb-6 flex items-center gap-3">
                <Factory size={28} className="text-orange-500" />
                Why Buy In Bulk?
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-5 border border-gray-200 rounded shadow-sm flex items-start gap-4">
                  <div className="bg-orange-50 text-orange-600 p-2 rounded shrink-0 border border-orange-100">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1e293b] font-black text-sm uppercase tracking-wide mb-1">Custom Tiered Pricing</h4>
                    <p className="text-xs text-gray-500 font-medium">Bypass retail markup. Get direct-from-factory pricing based on your exact volume requirements.</p>
                  </div>
                </div>
                <div className="bg-white p-5 border border-gray-200 rounded shadow-sm flex items-start gap-4">
                  <div className="bg-orange-50 text-orange-600 p-2 rounded shrink-0 border border-orange-100">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1e293b] font-black text-sm uppercase tracking-wide mb-1">Scheduled Deliveries</h4>
                    <p className="text-xs text-gray-500 font-medium">Lock in your price today and schedule split deliveries over 12 months to match your production line.</p>
                  </div>
                </div>
                <div className="bg-white p-5 border border-gray-200 rounded shadow-sm flex items-start gap-4">
                  <div className="bg-orange-50 text-orange-600 p-2 rounded shrink-0 border border-orange-100">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1e293b] font-black text-sm uppercase tracking-wide mb-1">18% GST Input Credit</h4>
                    <p className="text-xs text-gray-500 font-medium">All bulk orders are processed with formal B2B GST invoices allowing you to claim full input tax credit.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e293b] p-6 rounded border-l-4 border-orange-500 shadow-md">
              <h4 className="text-white font-black uppercase tracking-wider mb-2">Direct Owner Access</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-medium">
                Your bulk enquiry bypasses standard support and goes directly to the Founder & CEO's desk for immediate negotiation and fulfillment scheduling.
              </p>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-gray-200 rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-8 py-5 flex items-center justify-between">
                <h3 className="text-xl font-black text-[#1e293b] uppercase tracking-tight">Request Quotation</h3>
                <PackageOpen size={24} className="text-orange-500" />
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider">
                      Company / College <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Part Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider">
                      Component P/N or Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="partNumber"
                      value={formData.partNumber}
                      onChange={handleChange}
                      placeholder="e.g. ESP32-WROOM-32E"
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider">
                      Quantity Required <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="number"
                      name="quantity"
                      min="10"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Min. 10 pcs"
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider">
                    Expected Timeline <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors cursor-pointer appearance-none"
                  >
                    <option value="Immediate">Immediate Dispatch</option>
                    <option value="Within 2 Weeks">Within 2 Weeks</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="Scheduled Production Run">Scheduled Production Run</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#1e293b] uppercase tracking-wider">
                    Additional Specs / Target Price
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Include specific variants, target pricing, or attach BOM details..."
                    className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-colors shadow-lg shadow-green-500/20"
                  >
                    <MessageSquare size={20} strokeWidth={2.5} /> Request Quote via WhatsApp
                  </button>
                  <p className="text-center text-[10px] font-bold text-gray-400 uppercase mt-4">
                    Connects directly to Founder's Desk (+91 7499175707)
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 3. REUSED COMPONENT: WHY CHOOSE US? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <div className="text-center mb-12">
          <span className="text-orange-600 font-black text-xs tracking-[0.2em] uppercase mb-3 block">Enterprise Infrastructure</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tight uppercase">Why Density Electronics?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", icon: <ShieldCheck size={28} />, title: "100% Genuine Silicon", desc: "No clones. We source directly from official manufacturers like Espressif and DWIN." },
            { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", icon: <Zap size={28} />, title: "Same-Day Dispatch", desc: "Strict SLA logistics. Orders placed before 2 PM IST are handed to our premium couriers the same day." },
            { img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800", icon: <Truck size={28} />, title: "ESD-Safe Packaging", desc: "Sensitive ICs are packed in rigid corrugated boxes and ESD bags." }
          ].map((feature, idx) => (
            <div key={idx} className="group relative h-[280px] rounded-lg overflow-hidden border border-gray-200 hover:border-orange-500 shadow-md transition-all">
              <img src={feature.img} alt={feature.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/40"></div>
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

      {/* 4. REUSED COMPONENT: PROCUREMENT F.A.Q. */}
      <section className="bg-[#1e293b] py-20 text-white border-t-4 border-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            <div className="w-full md:w-1/3 shrink-0">
              <HelpCircle size={48} className="text-orange-500 mb-6" strokeWidth={2} />
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-4">
                B2B <br /> F.A.Q.
              </h2>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Quick answers regarding mass procurement and logistics.
              </p>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-6">
              {[
                { q: "Do you provide GST invoices for corporate orders?", a: "Yes, standard 18% GST invoices are automatically generated for all institutional and corporate purchases to claim input." },
                { q: "Do you accept Enterprise Purchase Orders (POs)?", a: "Absolutely. We actively work with educational institutions and hardware startups on official POs." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-[#0f172a] border border-gray-700 p-6 rounded-lg shadow-lg">
                  <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-wide leading-snug">
                    <span className="text-orange-500 mr-2">Q.</span>{faq.q}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. REUSED COMPONENT: MARQUEE BRANDS */}
      <section className="bg-white border-b border-gray-200 py-10 overflow-hidden relative">
        <style>{`
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: scrollRight 25s linear infinite;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <h2 className="text-sm font-black text-gray-400 tracking-[0.2em] uppercase">Authorized Manufacturer Brands</h2>
        </div>
        <div className="w-full relative overflow-hidden">
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="animate-marquee-right">
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="flex-shrink-0 flex items-center justify-center w-[160px] md:w-[200px] h-16 mx-4">
                <img src={brand.logo} alt={brand.name} className="max-h-12 max-w-[120px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}