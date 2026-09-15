import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Package,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#0f172a] text-gray-400 text-base border-t-4 border-orange-600 mt-auto selection:bg-orange-500 selection:text-white font-sans">
      
      {/* 1. HEAVY HIGHLIGHT STRIP (Increased text sizes and icons) */}
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
          
          {/* Brand & Mission (Takes up 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="h-12 w-12 rounded bg-orange-600 flex items-center justify-center font-black text-white text-2xl shadow-sm">
                D
              </span>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  DENSITY
                </span>
                <span className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mt-1">
                  Electronics
                </span>
              </div>
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
                <Link to="/shop" className="text-orange-500 hover:text-orange-400 font-bold inline-flex items-center gap-1 uppercase tracking-wider text-xs">
                  Full Catalog <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Practical Store Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-3">
              Company
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors flex items-center justify-between group">BOM Upload Tool <span className="bg-orange-600 text-white text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider group-hover:bg-orange-500">New</span></Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Bulk Enquiries</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Sell on Density</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Track Consignment</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Student Programs</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-5">
            <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-3">
              Policies
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Return & Replacement</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors flex items-center gap-1.5"><AlertCircle size={14} className="text-emerald-500"/> E-Waste Compliance</Link></li>
            </ul>
          </div>

          {/* Direct Line / Contact */}
          <div className="space-y-5">
            <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-3">
              Direct Line
            </h4>
            <div className="space-y-4 text-sm font-medium">
              <a href="tel:+919588679367" className="flex items-center gap-3 text-white hover:text-orange-500 transition-colors">
                <span className="p-2 bg-[#1e293b] rounded"><Phone size={16} className="text-orange-500" /></span>
                <span className="font-bold">+91 95886 79367</span>
              </a>

              <a href="mailto:support@densityelectronics.com" className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors">
                <span className="p-2 bg-[#1e293b] rounded"><Mail size={16} className="text-orange-500" /></span>
                <span className="truncate">support@densityelectronics.com</span>
              </a>

              <div className="flex items-start gap-3 text-gray-400">
                <span className="p-2 bg-[#1e293b] rounded mt-1"><MapPin size={16} className="text-orange-500" /></span>
                <span className="leading-relaxed">Central Dispatch Hub,<br />Maharashtra, India</span>
              </div>
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
    </footer>
  );
}