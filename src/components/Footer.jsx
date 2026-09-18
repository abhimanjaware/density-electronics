import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Package,
  FileText,
  AlertCircle,
  X
} from 'lucide-react'; // Removed Linkedin, Twitter, Youtube, Instagram

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeModal]);

  const closeModal = () => setActiveModal(null);

  return (
    <footer id="footer" className="bg-[#0f172a] text-gray-400 text-base border-t-4 border-orange-600 mt-auto selection:bg-orange-500 selection:text-white font-sans relative z-40">
      
      {/* 1. HEAVY HIGHLIGHT STRIP */}
      <div className="border-b border-gray-800 bg-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-start gap-4">
              <span className="p-3 rounded bg-[#0f172a] text-orange-500 border border-gray-700 shadow-sm">
                <Zap size={24} />
              </span>
              <div>
                <div className="font-black text-white text-base uppercase tracking-wide">Direct Bench Stock</div>
                <div className="text-sm text-gray-400 mt-1 font-medium">Tested & verified before packaging</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="p-3 rounded bg-[#0f172a] text-orange-500 border border-gray-700 shadow-sm">
                <ShieldCheck size={24} />
              </span>
              <div>
                <div className="font-black text-white text-base uppercase tracking-wide">Genuine Silicon</div>
                <div className="text-sm text-gray-400 mt-1 font-medium">Authorized distributor, no cheap clones</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="p-3 rounded bg-[#0f172a] text-orange-500 border border-gray-700 shadow-sm">
                <Package size={24} />
              </span>
              <div>
                <div className="font-black text-white text-base uppercase tracking-wide">Instant Dispatch</div>
                <div className="text-sm text-gray-400 mt-1 font-medium">Daily Pan-India pickups by 2 PM IST</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="p-3 rounded bg-[#0f172a] text-orange-500 border border-gray-700 shadow-sm">
                <FileText size={24} />
              </span>
              <div>
                <div className="font-black text-white text-base uppercase tracking-wide">B2B & GST Ready</div>
                <div className="text-sm text-gray-400 mt-1 font-medium">18% Input tax credit on all POs</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. MASSIVE MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center">
              <img
                src="src/assets/headerlogo33.png"
                alt="Density Electronics Logo"
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 font-medium max-w-sm">
              Industrial hardware supply for engineers, OEMs, and university labs. From robust ESP32 modules to heavy-duty HMI touch panels.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#1e293b] text-white text-xs font-bold border border-gray-700 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ISO 9001:2015 CERTIFIED
              </span>
            </div>
          </div>
          {/* Quick Hardware Catalog */}
          <div className="space-y-5">
            <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-3">
              Inventory
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Dev Boards & MCUs</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Sensors & Modules</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">OLED & TFT Displays</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Industrial HMI Panels</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">RF & Patch Antennas</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Power Management</Link></li>
              <li className="pt-2">
                <Link to="/categories" className="text-orange-500 hover:text-orange-400 font-bold inline-flex items-center gap-1 uppercase tracking-wider text-xs">
                  Full Catalog <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Socials */}
          <div className="space-y-5">
            <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-3">
              Company
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/bulk" className="hover:text-orange-500 transition-colors">Bulk Enquiries</Link></li>
              <li><Link to="/sell" className="hover:text-orange-500 transition-colors">Sell on Density</Link></li>
            </ul>

            <div className="pt-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Connect</h4>
              <div className="flex items-center gap-3">
                {/* LinkedIn SVG */}
                <a href="#" className="w-8 h-8 rounded bg-[#1e293b] border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition-colors" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                {/* Twitter SVG */}
                <a href="#" className="w-8 h-8 rounded bg-[#1e293b] border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition-colors" title="Twitter / X">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                {/* YouTube SVG */}
                <a href="#" className="w-8 h-8 rounded bg-[#1e293b] border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition-colors" title="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6C4 3.7 5.1 3.7 5.6 3.6C8.8 3.4 12 3.4 12 3.4C12 3.4 15.2 3.4 18.4 3.6C18.9 3.7 20 3.7 20.9 4.6C21.7 5.4 21.5 7.1 21.5 7.1C21.5 7.1 21.7 8.9 21.7 10.7V13.3C21.7 15.1 21.5 16.9 21.5 16.9C21.5 16.9 21.7 18.6 20.9 19.4C20 20.3 18.7 20.3 18.2 20.4C14.7 20.7 12 20.6 12 20.6C12 20.6 8.8 20.6 5.6 20.4C5.1 20.3 4 20.3 3.1 19.4C2.3 18.6 2.5 16.9 2.5 16.9C2.5 16.9 2.3 15.1 2.3 13.3V10.7C2.3 8.9 2.5 7.1 2.5 7.1Z"></path><polygon points="9.75 15.02 15.5 11.97 9.75 8.92 9.75 15.02"></polygon></svg>
                </a>
                {/* Instagram SVG */}
                <a href="#" className="w-8 h-8 rounded bg-[#1e293b] border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition-colors" title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-5">
            <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-3">
              Policies
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><button onClick={() => setActiveModal('shipping')} className="hover:text-orange-500 transition-colors">Shipping & Delivery</button></li>
              <li><button onClick={() => setActiveModal('returns')} className="hover:text-orange-500 transition-colors">Return & Replacement</button></li>
              <li><button onClick={() => setActiveModal('terms')} className="hover:text-orange-500 transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => setActiveModal('privacy')} className="hover:text-orange-500 transition-colors">Privacy Policy</button></li>
              <li>
                <button onClick={() => setActiveModal('ewaste')} className="hover:text-emerald-400 text-emerald-500 transition-colors flex items-center gap-1.5 font-bold">
                  <AlertCircle size={14} /> E-Waste Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Line / Contact */}
          <div className="space-y-5">
            <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-3">
              Direct Line
            </h4>
            <div className="space-y-4 text-sm font-medium">
              <a href="tel:+919890400165" className="flex items-center gap-3 text-white hover:text-orange-500 transition-colors">
                <span className="p-2 bg-[#1e293b] rounded"><Phone size={16} className="text-orange-500" /></span>
                <span className="font-bold">+91 9890400165</span>
              </a>

              <a href="mailto:sales.densityelectronics@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors break-all">
                <span className="p-2 bg-[#1e293b] rounded shrink-0"><Mail size={16} className="text-orange-500" /></span>
                <span className="text-[13px]">sales.densityelectronics@gmail.com</span>
              </a>

              <div className="flex items-start gap-3 text-gray-400">
                <span className="p-2 bg-[#1e293b] rounded mt-1 shrink-0"><MapPin size={16} className="text-orange-500" /></span>
                <span className="leading-relaxed text-[13px]">
                  Law College, Near Sinhgad,<br />Vadgaon, Pune, Maharashtra
                </span>
              </div>

              {/* Interactive Map Visual */}
              {/* <a 
                href="https://maps.google.com/?q=Sinhgad+Law+College+Vadgaon+Pune" 
                target="_blank" 
                rel="noreferrer" 
                className="block w-full h-24 mt-2 bg-[#1e293b] rounded border border-gray-700 hover:border-orange-500 relative overflow-hidden group transition-colors"
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  <MapPin size={20} className="text-orange-500 group-hover:animate-bounce mb-1" />
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">View on Map</span>
                </div>
              </a> */}
            </div>
          </div>

        </div>
      </div>

      {/* 3. TERMINAL BOTTOM BAR */}
      <div className="border-t border-gray-800 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-gray-500">
          <div>
            © {currentYear} Density Electronics. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-2">
            Engineered by <span className="text-gray-300">AAKAAR Digital</span>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MODAL POP-UP SCREENS                      */}
      {/* ========================================= */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="bg-[#0f172a] border border-gray-700 text-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#1e293b] border-b border-gray-800 flex items-center justify-between shrink-0">
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-orange-400 flex items-center gap-2">
                <FileText size={22} className="hidden sm:block" /> 
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'shipping' && 'Shipping & Delivery Policy'}
                {activeModal === 'returns' && 'Return & Replacement Policy'}
                {activeModal === 'terms' && 'Terms & Conditions'}
                {activeModal === 'ewaste' && 'E-Waste Compliance'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-gray-300 font-medium leading-relaxed custom-scrollbar">
              
              {activeModal === 'privacy' && (
                <>
                  <p>At Density Electronics, accessible from sales.densityelectronics@gmail.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Density Electronics and how we use it.</p>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">1. Information We Collect</h4>
                    <p>We collect personal information such as name, corporate email address (sales.densityelectronics@gmail.com), phone number (+91 9890400165), billing/shipping address in Pune, Maharashtra, and GSTIN when registering for wholesale or retail purchases.</p>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">2. How We Use Your Information</h4>
                    <p>We use the information we collect in various ways, including to provide, operate, and maintain our website, improve and personalize user experience, process transactions, and send order updates.</p>
                  </div>
                </>
              )}

              {activeModal === 'shipping' && (
                <>
                  <p>Density Electronics operates its central shipping hub from Vadgaon, Pune, Maharashtra. We partner with top-tier nationwide logistics couriers to ensure secure, damage-free delivery.</p>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">1. Dispatch SLA</h4>
                    <p>Orders placed before 2:00 PM IST qualify for same-day dispatch. Standard domestic transit takes between 3 to 5 business days depending on the pin code destination across India.</p>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">2. ESD-Safe Packaging</h4>
                    <p>All sensitive silicon microchips, ICs, and development boards are packed in anti-static ESD bags and reinforced packaging to prevent electrostatic discharge during transit.</p>
                  </div>
                </>
              )}

              {activeModal === 'returns' && (
                <>
                  <p>We stand by the authenticity of our components. If you receive a defective or incorrect component, our return policy covers replacements within 7 business days of receipt.</p>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">1. Eligibility for Return</h4>
                    <p>Items must be unused, in their original anti-static packaging, and accompanied by the official GST invoice generated during purchase. Components damaged due to improper soldering or over-voltage are not eligible.</p>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">2. Refund Processing</h4>
                    <p>Once inspected at our Pune facility, approved replacements or refunds are initiated back to the original payment method within 3-5 business days.</p>
                  </div>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p>By accessing or purchasing from Density Electronics (located near Sinhgad College, Vadgaon, Pune), you agree to be bound by these Terms and Conditions.</p>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">1. B2B & Institutional Orders</h4>
                    <p>All bulk quotes and Purchase Orders (POs) are subject to verification. 18% GST inputs are provided strictly against valid corporate GSTIN credentials provided at checkout.</p>
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-orange-500 mb-2">2. Limitation of Liability</h4>
                    <p>Density Electronics is not liable for component failure resulting from incorrect voltage application, improper soldering, or electrostatic discharge (ESD) at the customer's bench.</p>
                  </div>
                </>
              )}

              {activeModal === 'ewaste' && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-lg space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400 font-black uppercase text-base tracking-wider border-b border-emerald-500/30 pb-3">
                    <AlertCircle size={24} /> E-Waste Management Rules
                  </div>
                  <p className="text-gray-300">
                    Electronic waste (E-Waste) is hazardous to the environment. Density Electronics is committed to environmental sustainability under the guidelines of the Central Pollution Control Board (CPCB).
                  </p>
                  <div>
                    <h4 className="font-black text-white uppercase text-sm tracking-widest text-emerald-500 mb-2">Proper Disposal Instructions:</h4>
                    <p className="text-gray-300">
                      Never dispose of electronic components, batteries (e.g., 18650 cells), or circuit boards in municipal regular waste bins. Return obsolete electronic modules directly to our Pune facility or certified e-waste recycling collection points.
                    </p>
                  </div>
                  <p className="text-xs text-emerald-200/70 italic pt-2">
                    Contact our compliance team at sales.densityelectronics@gmail.com for safe disposal guidance or take-back support.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-5 bg-[#1e293b] border-t border-gray-800 flex justify-end shrink-0">
              <button 
                onClick={closeModal}
                className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded font-black text-xs uppercase tracking-widest transition-colors shadow-lg active:scale-95"
              >
                Accept & Close
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </footer>
  );
}