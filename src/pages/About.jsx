import { 
  ShieldCheck, Truck, Building2, Target, Eye, Cpu, Quote, 
  CheckCircle2, BarChart, Globe, Microscope, ArrowRight, Box, Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  // B2B CONFIGURATION: 
  // Change this to 'true' when you are ready to display the Founders/CEO section.
  const showLeadershipTeam = false;

  return (
    <div className="bg-[#f8fafc] font-sans pb-20">
      
      {/* 1. MASSIVE B2B HERO SECTION */}
      <section className="relative w-full py-24 bg-[#0f172a] overflow-hidden border-b-8 border-orange-600">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="PCB Tech Background" 
            className="w-full h-full object-cover"
            fetchpriority="high" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="inline-flex items-center justify-center md:justify-start gap-2 text-orange-400 font-bold text-xs tracking-[0.2em] uppercase border border-orange-500/30 bg-orange-500/10 px-4 py-2 rounded mb-6 shadow-sm">
            <Cpu size={16} aria-hidden="true" /> ISO 9001:2015 Certified Supply Chain
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black text-white tracking-tighter uppercase leading-[1.05] mb-6">
            Building India's <br /> 
            <span className="text-orange-500">Hardware Future.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl font-medium border-l-4 border-orange-500 pl-5 mx-auto md:mx-0 leading-relaxed">
            What started as a vision to eliminate procurement friction has grown into an enterprise-grade digital destination. We bring authentic silicon, transparent pricing, and AIML-driven logistics to engineers across the nation.
          </p>
        </div>
      </section>

      {/* ENTERPRISE METRICS STRIP */}
      <div className="bg-white border-b-4 border-gray-200 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-2 divide-gray-100">
          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">99.8%</div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">Order Accuracy</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">2PM</div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">Same-Day Dispatch SLA</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">100%</div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">Genuine Traceable Silicon</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">B2B</div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">Institutional Support</div>
          </div>
        </div>
      </div>

      {/* 2. CORPORATE OVERVIEW SECTION (Smaller Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white border-4 border-gray-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col xl:flex-row">
          
          {/* Changed to w-1/3 and min-h-[300px] to make the image much smaller */}
          <div className="xl:w-1/3 relative bg-[#0f172a]/50 min-h-[300px] xl:min-h-full">
            <img 
              src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Density Global Supply Facility" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-overlay opacity-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent xl:bg-gradient-to-r"></div>
            
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <span className="bg-orange-600 text-white font-black text-[10px] tracking-widest uppercase px-3 py-1.5 rounded mb-3 inline-block">
                Global Operations
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
                Engineering <br/> The World's <br/> <span className="text-orange-500">Supply Chain.</span>
              </h3>
            </div>
          </div>

          {/* Changed to w-2/3 to give text more room, complementing the smaller image */}
          <div className="xl:w-2/3 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white">
            <span className="text-orange-600 font-black text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <Globe size={16} aria-hidden="true" /> Enterprise Scale & Distribution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tighter uppercase mb-6">
              Global Component Sourcing, <br /> Built for OEMs.
            </h2>
            <p className="text-gray-600 text-base font-medium leading-relaxed mb-10 pb-10 border-b-2 border-gray-100">
              As one of the largest and most robust electronic component suppliers in India, Density Electronics operates a vast, borderless procurement network. We ship highly traceable, industrial-grade silicon to engineers and manufacturers worldwide. From single-board prototypes to multi-million unit production runs, our infrastructure is engineered to absorb your supply chain complexity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-500 rounded-full"></div>
                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                  <Globe size={18} className="text-orange-500" aria-hidden="true" /> Worldwide Logistics
                </h4>
                <p className="text-gray-500 text-xs font-bold leading-relaxed">
                  We bridge the gap between global semiconductor fabs and local manufacturing floors, exporting premium hardware internationally with real-time tracking and strict compliance.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-500 rounded-full"></div>
                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                  <Box size={18} className="text-orange-500" aria-hidden="true" /> Massive Bulk Orders
                </h4>
                <p className="text-gray-500 text-xs font-bold leading-relaxed">
                  Engineered for scale. We provide aggressive BOM volume pricing, scheduled deliveries, and dedicated net-term support for enterprise OEM manufacturing.
                </p>
              </div>

              <div className="relative md:col-span-2 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm mt-4">
                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                  <Package size={18} className="text-orange-500" aria-hidden="true" /> Multi-Vendor Ecosystem
                </h4>
                <p className="text-gray-500 text-sm font-bold leading-relaxed">
                  Density is more than a supplier; it is an open hardware marketplace. We empower verified manufacturers, authorized distributors, and certified sellers to list and sell their genuine electronic products directly through our heavily trafficked digital platform, creating an infinite catalogue for buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        EXECUTIVE LEADERSHIP TEAM (HIDDEN FOR PRODUCTION)
      */}
      {showLeadershipTeam && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-black text-xs tracking-[0.2em] uppercase mb-3 block">The Minds Behind The Mission</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e293b] tracking-tighter uppercase">Executive Leadership</h2>
            <p className="text-gray-600 text-base font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
              Our core team brings decades of combined experience in Artificial Intelligence, Supply Chain Logistics, and Enterprise Hardware Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col">
              <div className="h-[320px] w-full overflow-hidden relative bg-gray-100">
                <img 
                  src="src/assets/file_0000000063788206b01466a1f3e65ade.png" 
                  alt="Milin A. Mahajan - Founder" 
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <a href="#" className="bg-[#0A66C2] p-2.5 rounded hover:bg-white hover:text-[#0A66C2] text-white transition-colors" title="Connect on LinkedIn" aria-label="LinkedIn Profile">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                   </a>
                </div>
              </div>
              <div className="p-8 border-t-4 border-orange-500 flex-1 flex flex-col relative">
                <Quote size={40} className="absolute top-6 right-6 text-gray-100 pointer-events-none" aria-hidden="true" />
                <span className="text-orange-600 font-black text-[10px] tracking-widest uppercase mb-1">Founder</span>
                <h3 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight mb-3">Milin A. Mahajan</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 flex-1 relative z-10">
                  Specializing in AIML, Milin founded Density with a vision to eliminate procurement friction and build a smarter, algorithmic supply chain for the hardware sector.
                </p>
                <a href="#" className="text-[#1e293b] font-bold text-xs uppercase tracking-wider hover:text-orange-600 transition-colors flex items-center gap-2 w-fit">
                   Connect <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col mt-0 lg:mt-8">
              <div className="h-[320px] w-full overflow-hidden relative bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                  alt="Sarah Jenkins - CEO" 
                  className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <a href="#" className="bg-[#0A66C2] p-2.5 rounded hover:bg-white hover:text-[#0A66C2] text-white transition-colors" title="Connect on LinkedIn" aria-label="LinkedIn Profile">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                   </a>
                </div>
              </div>
              <div className="p-8 border-t-4 border-[#1e293b] flex-1 flex flex-col relative">
                <Quote size={40} className="absolute top-6 right-6 text-gray-100 pointer-events-none" aria-hidden="true" />
                <span className="text-gray-500 font-black text-[10px] tracking-widest uppercase mb-1">CEO</span>
                <h3 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight mb-3">Sarah Jenkins</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 flex-1 relative z-10">
                  With 15 years in global electronics logistics, Sarah manages the strict SLA requirements, vendor relationships, and enterprise infrastructure that powers Density.
                </p>
                <a href="#" className="text-[#1e293b] font-bold text-xs uppercase tracking-wider hover:text-orange-600 transition-colors flex items-center gap-2 w-fit">
                   Connect <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col mt-0 lg:mt-16">
              <div className="h-[320px] w-full overflow-hidden relative bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                  alt="David Chen - CTO" 
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <a href="#" className="bg-[#0A66C2] p-2.5 rounded hover:bg-white hover:text-[#0A66C2] text-white transition-colors" title="Connect on LinkedIn" aria-label="LinkedIn Profile">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                   </a>
                </div>
              </div>
              <div className="p-8 border-t-4 border-[#1e293b] flex-1 flex flex-col relative">
                <Quote size={40} className="absolute top-6 right-6 text-gray-100 pointer-events-none" aria-hidden="true" />
                <span className="text-gray-500 font-black text-[10px] tracking-widest uppercase mb-1">Chief Technology Officer</span>
                <h3 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight mb-3">David Chen</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 flex-1 relative z-10">
                  A former embedded systems lead, David oversees technical compliance, API integrations for OEM clients, and ensures all shipped silicon meets strict datasheet specifications.
                </p>
                <a href="#" className="text-[#1e293b] font-bold text-xs uppercase tracking-wider hover:text-orange-600 transition-colors flex items-center gap-2 w-fit">
                   Connect <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. OUR JOURNEY (B2B Timeline Format) */}
      <section className="bg-[#1e293b] py-24 text-white border-y-8 border-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-black text-xs tracking-[0.2em] uppercase mb-3 block">Corporate History</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">Our Operational Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t-4 border-orange-500 pt-6">
              <span className="text-5xl font-black text-gray-700 opacity-50 block mb-2">01</span>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">The Inception</h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                Every great idea starts with a simple thought. We identified a critical gap in the Indian hardware market: a lack of reliable, counterfeit-free component suppliers. The idea was to build a secure, tech-driven platform.
              </p>
            </div>
            <div className="border-t-4 border-orange-500 pt-6">
              <span className="text-5xl font-black text-gray-700 opacity-50 block mb-2">02</span>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">Infrastructure Build</h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                We constructed a robust procurement network, securing direct lines with top-tier manufacturers like Espressif and DWIN. We established strict ESD-safe packaging protocols and same-day dispatch SLAs.
              </p>
            </div>
            <div className="border-t-4 border-orange-500 pt-6">
              <span className="text-5xl font-black text-gray-700 opacity-50 block mb-2">03</span>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">Scaling The Future</h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                As a rapidly expanding enterprise, we are integrating AIML to optimize supply chains. Every institutional review and maker's feedback fuels our continuous evolution into India's most trusted hardware hub.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE OFFER & OUR SERVICES (High-Density Grid) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-[#1e293b] tracking-tighter uppercase">Enterprise Capabilities</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-bold text-lg">We provide a full-stack hardware sourcing ecosystem designed for OEM scale and maker precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Globe size={24} aria-hidden="true" />, title: "Vast Product Range", desc: "Discover active and passive components, dev boards, and HMI displays across 15+ industrial categories." },
              { icon: <ShieldCheck size={24} aria-hidden="true" />, title: "Quality Assurance", desc: "100% genuine silicon. Components undergo visual and bench testing before being dispatched." },
              { icon: <BarChart size={24} aria-hidden="true" />, title: "Competitive Pricing", desc: "Direct manufacturer relationships allow us to provide aggressive BOM volume pricing." },
              { icon: <Truck size={24} aria-hidden="true" />, title: "Logistics & Delivery", desc: "Hassle-free ordering with premium nationwide couriers. 2 PM SLA for same-day dispatch." },
              { icon: <Building2 size={24} aria-hidden="true" />, title: "B2B & Institutional", desc: "Dedicated support for University POs, GST invoicing, and strict net-term enterprise purchasing." },
              { icon: <Microscope size={24} aria-hidden="true" />, title: "Tech-Driven UX", desc: "Our platform leverages AI concepts to ensure seamless browsing, secure transactions, and smart inventory mapping." }
            ].map((srv, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 p-8 rounded hover:border-orange-500 transition-colors shadow-sm flex flex-col">
                <div className="w-12 h-12 bg-white border border-gray-200 text-orange-600 flex items-center justify-center rounded mb-5 shadow-sm">
                  {srv.icon}
                </div>
                <h3 className="text-lg font-black text-[#1e293b] uppercase tracking-wide mb-3">{srv.title}</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MISSION, VISION & CORE VALUES */}
      <section className="bg-gray-100 border-y-4 border-gray-200 py-24 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border-2 border-gray-200 p-10 lg:p-14 rounded shadow-sm relative overflow-hidden">
              <Target size={120} className="absolute -top-10 -right-10 text-gray-50 pointer-events-none" aria-hidden="true" />
              <h3 className="text-3xl font-black text-[#1e293b] uppercase tracking-tighter mb-6 relative z-10">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-medium relative z-10">
                To make industrial-grade electronic procurement simple, transparent, and trustworthy. We aim to arm engineers with authentic hardware, aggressive pricing, and uncompromised technical support through a world-class digital platform.
              </p>
            </div>
            <div className="bg-[#1e293b] border-2 border-[#1e293b] p-10 lg:p-14 rounded shadow-lg relative overflow-hidden">
              <Eye size={120} className="absolute -top-10 -right-10 text-gray-800 opacity-50 pointer-events-none" aria-hidden="true" />
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6 relative z-10">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium relative z-10">
                To evolve beyond a supply hub into India's standard for hardware excellence. A brand where OEMs, researchers, and hobbyists can instantly access genuine silicon, backed by a supply chain powered by AI-driven efficiency.
              </p>
            </div>
          </div>

          <div className="text-center mb-10 mt-20">
            <h2 className="text-2xl font-black text-[#1e293b] tracking-widest uppercase">The 7 Pillars of Density</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Trust", desc: "The bedrock of every B2B relationship." },
              { title: "Quality", desc: "Maintaining zero tolerance for fakes." },
              { title: "Satisfaction", desc: "We answer to the engineer's bench." },
              { title: "Innovation", desc: "Applying AIML to supply chains." },
              { title: "Integrity", desc: "100% transparent GST & data policy." },
              { title: "Reliability", desc: "Dispatch SLAs you can set your watch to." },
              { title: "Growth", desc: "Scaling alongside our clients' businesses." },
              { title: "Focus", desc: "Eliminating friction in procurement." }
            ].map((val, idx) => (
              <div key={idx} className="bg-white p-6 rounded text-center border-b-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2">{val.title}</h4>
                <p className="text-gray-500 text-[11px] font-bold uppercase">{val.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. REVIEWS & FEEDBACK COMMITMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <CheckCircle2 size={48} className="text-orange-500 mx-auto mb-8" strokeWidth={2.5} aria-hidden="true" />
          <h2 className="text-4xl font-black text-[#1e293b] tracking-tighter uppercase mb-6">Built By Feedback.</h2>
          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
            We don't just want customers to purchase from us. We want them to confidently deploy our hardware into production. Every review and critical feedback loop helps us tighten our QC processes, improve packaging, and refine our UI.
          </p>
          <p className="text-2xl font-black text-orange-600 uppercase tracking-widest border-2 border-orange-600 inline-block px-8 py-4 rounded">
            Genuine satisfaction is our ultimate ROI.
          </p>
        </div>
      </section>

      {/* 7. OUR PROMISE & FINAL CTA */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl overflow-hidden relative shadow-2xl border-4 border-orange-700 text-center py-20 px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#1e293b] opacity-10 blur-[100px] rounded-full mix-blend-multiply pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6 text-shadow-lg">
              The Journey Continues
            </h2>
            <p className="text-orange-100 text-lg md:text-xl font-bold leading-relaxed mb-10 max-w-2xl mx-auto">
              We are committed to providing Better Products, Better Value, and Better Technology. Thank you for making Density Electronics a part of your build process.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['Quality Products', 'Secure Shopping', 'B2B Support', 'Continuous Growth'].map((promise, i) => (
                <div key={i} className="bg-[#1e293b]/80 backdrop-blur-sm text-white px-4 py-3 rounded font-black text-xs uppercase tracking-widest border border-gray-700">
                  ✓ {promise}
                </div>
              ))}
            </div>

            <Link to="/shop" className="inline-block bg-[#1e293b] hover:bg-gray-900 text-white px-12 py-5 rounded-lg font-black text-lg uppercase tracking-widest border-2 border-gray-800 shadow-xl transition-all hover:scale-105">
              Start Sourcing Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}