import {
  ShieldCheck,
  Truck,
  Building2,
  Target,
  Eye,
  Cpu,
  Quote,
  CheckCircle2,
  BarChart,
  Globe,
  Microscope,
  ArrowRight,
  Box,
  Package,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function About() {
  const leadershipTeam = [
    {
      name: "Milin A. Mahajan",
      role: "Founder",
      email: "founder@densityelectronics.com",
      image: "",
      description:
        "Founder of Density Electronics, focused on building a trusted and technology-driven electronics procurement platform for engineers, students, makers, and businesses.",
    },
    {
      name: "Chief Executive Officer",
      role: "CEO",
      email: "ceo@densityelectronics.com",
      image: "",
      description:
        "Responsible for business operations, customer experience, strategic growth, partnerships, and building a reliable electronics supply ecosystem.",
    },
    {
      name: "Technical Lead",
      role: "Technician",
      email: "technical@densityelectronics.com",
      image: "",
      description:
        "Responsible for technical product support, hardware specifications, product verification, and helping customers select the right components for their projects.",
    },
  ];

  return (
    <div className="bg-[#f8fafc] font-sans pb-20">

      {/* HERO */}
      <section className="relative w-full py-24 bg-[#0f172a] overflow-hidden border-b-8 border-orange-600">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1200&auto=format&fit=crop"
            alt="PCB Technology"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs tracking-[0.2em] uppercase border border-orange-500/30 bg-orange-500/10 px-4 py-2 rounded mb-6">
            <Cpu size={16} />
            Electronics Technology & Supply
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black text-white tracking-tighter uppercase leading-[1.05] mb-6">
            Building India's
            <br />
            <span className="text-orange-500">Hardware Future.</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl font-medium border-l-4 border-orange-500 pl-5 mx-auto md:mx-0 leading-relaxed">
            Density Electronics is built to make electronic component
            procurement simple, reliable, transparent, and accessible for
            engineers, students, makers, institutions, and businesses.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <div className="bg-white border-b-4 border-gray-200 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-2 divide-gray-100">

          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">
              99.8%
            </div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">
              Order Accuracy
            </div>
          </div>

          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">
              2PM
            </div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">
              Dispatch Target
            </div>
          </div>

          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">
              100%
            </div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">
              Product Focus
            </div>
          </div>

          <div className="text-center px-4">
            <div className="text-4xl font-black text-[#1e293b]">
              B2B
            </div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">
              Institutional Support
            </div>
          </div>

        </div>
      </div>

      {/* CORPORATE OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white border-4 border-gray-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col xl:flex-row">

          <div className="xl:w-1/3 relative bg-[#0f172a] min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1200&auto=format&fit=crop"
              alt="Density Electronics"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 z-10">
              <span className="bg-orange-600 text-white font-black text-[10px] tracking-widest uppercase px-3 py-1.5 rounded mb-3 inline-block">
                Density Electronics
              </span>

              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
                Engineering
                <br />
                The Future
                <br />
                <span className="text-orange-500">
                  Together.
                </span>
              </h3>
            </div>
          </div>

          <div className="xl:w-2/3 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white">

            <span className="text-orange-600 font-black text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <Globe size={16} />
              Electronics Distribution
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tighter uppercase mb-6">
              Electronics Sourcing,
              <br />
              Built for Everyone.
            </h2>

            <p className="text-gray-600 text-base font-medium leading-relaxed mb-10 pb-10 border-b-2 border-gray-100">
              Density Electronics provides electronic components,
              development boards, sensors, displays, motors, wireless
              modules, robotics products, tools, batteries, and other
              hardware solutions through a modern digital marketplace.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">

              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-500 rounded-full" />

                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                  <Globe size={18} className="text-orange-500" />
                  Wide Product Range
                </h4>

                <p className="text-gray-500 text-xs font-bold leading-relaxed">
                  Development boards, sensors, displays, motors, wireless
                  modules, robotics products and more.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-500 rounded-full" />

                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                  <Box size={18} className="text-orange-500" />
                  Bulk Procurement
                </h4>

                <p className="text-gray-500 text-xs font-bold leading-relaxed">
                  Supporting students, makers, institutions, startups,
                  laboratories, and businesses.
                </p>
              </div>

              <div className="relative md:col-span-2 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm mt-4">

                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                  <Package size={18} className="text-orange-500" />
                  Technology Marketplace
                </h4>

                <p className="text-gray-500 text-sm font-bold leading-relaxed">
                  Our goal is to create a reliable electronics ecosystem
                  where customers can discover products, compare options,
                  purchase securely, and get the technical information
                  required to complete their projects.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#0f172a] py-24 border-y-8 border-orange-600">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">

            <span className="text-orange-500 font-black text-xs tracking-[0.2em] uppercase mb-3 block">
              The Team Behind Density
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">
              Our Leadership
            </h2>

            <p className="text-gray-400 text-base font-medium mt-4 max-w-2xl mx-auto">
              A focused team working across business, operations, and
              technical electronics expertise.
            </p>

          </div>

          {/* THREE CARDS IN ONE ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {leadershipTeam.map((person, index) => (

              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200 group"
              >

                {/* PHOTO */}
                <div className="h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">

                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-white border-4 border-orange-500 flex items-center justify-center shadow-lg">
                        <UserPlaceholder />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-5 left-5 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded">
                    {person.role}
                  </div>

                </div>

                {/* INFO */}
                <div className="p-7 border-t-4 border-orange-500">

                  <span className="text-orange-600 font-black text-[10px] tracking-widest uppercase">
                    {person.role}
                  </span>

                  <h3 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight mt-1 mb-4">
                    {person.name}
                  </h3>

                  <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 min-h-[90px]">
                    {person.description}
                  </p>

                  {/* CONTACT */}
                  <div className="border-t border-gray-200 pt-5">

                    <div className="flex items-center gap-3 text-gray-600">

                      <div className="w-9 h-9 rounded bg-orange-50 flex items-center justify-center">
                        <Mail
                          size={17}
                          className="text-orange-600"
                        />
                      </div>

                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          Email
                        </div>

                        <a
                          href={`mailto:${person.email}`}
                          className="text-xs font-bold text-[#1e293b] hover:text-orange-600 transition-colors"
                        >
                          {person.email}
                        </a>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* JOURNEY */}
      <section className="bg-[#1e293b] py-24 text-white border-b-8 border-orange-600">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-orange-500 font-black text-xs tracking-[0.2em] uppercase mb-3 block">
              Corporate History
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">
              Our Operational Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="border-t-4 border-orange-500 pt-6">
              <span className="text-5xl font-black text-gray-700 block mb-2">
                01
              </span>

              <h3 className="text-xl font-black uppercase tracking-wider mb-4">
                The Inception
              </h3>

              <p className="text-gray-400 font-medium leading-relaxed">
                We identified a need for a reliable and technology-driven
                electronics marketplace.
              </p>
            </div>

            <div className="border-t-4 border-orange-500 pt-6">
              <span className="text-5xl font-black text-gray-700 block mb-2">
                02
              </span>

              <h3 className="text-xl font-black uppercase tracking-wider mb-4">
                Infrastructure
              </h3>

              <p className="text-gray-400 font-medium leading-relaxed">
                We built a digital platform focused on product discovery,
                secure purchasing, and customer support.
              </p>
            </div>

            <div className="border-t-4 border-orange-500 pt-6">
              <span className="text-5xl font-black text-gray-700 block mb-2">
                03
              </span>

              <h3 className="text-xl font-black uppercase tracking-wider mb-4">
                The Future
              </h3>

              <p className="text-gray-400 font-medium leading-relaxed">
                We continue improving the platform with smarter technology,
                better products, and better customer experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">

            <h2 className="text-4xl sm:text-5xl font-black text-[#1e293b] tracking-tighter uppercase">
              Enterprise Capabilities
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-bold text-lg">
              A complete hardware sourcing ecosystem designed for
              professionals and makers.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                icon: <Globe size={24} />,
                title: "Vast Product Range",
                desc: "Development boards, sensors, displays, motors, wireless products and more.",
              },
              {
                icon: <ShieldCheck size={24} />,
                title: "Quality Assurance",
                desc: "Focused on genuine products, accurate specifications, and reliable sourcing.",
              },
              {
                icon: <BarChart size={24} />,
                title: "Competitive Pricing",
                desc: "Designed to provide practical pricing for individual and bulk requirements.",
              },
              {
                icon: <Truck size={24} />,
                title: "Logistics & Delivery",
                desc: "Secure ordering and delivery support for customers across India.",
              },
              {
                icon: <Building2 size={24} />,
                title: "B2B & Institutional",
                desc: "Support for colleges, universities, startups, businesses, and institutional purchasing.",
              },
              {
                icon: <Microscope size={24} />,
                title: "Technical Support",
                desc: "Product specifications and technical assistance for electronics projects.",
              },
            ].map((service, index) => (

              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-8 rounded hover:border-orange-500 transition-colors shadow-sm"
              >

                <div className="w-12 h-12 bg-white border border-gray-200 text-orange-600 flex items-center justify-center rounded mb-5 shadow-sm">
                  {service.icon}
                </div>

                <h3 className="text-lg font-black text-[#1e293b] uppercase tracking-wide mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  {service.desc}
                </p>

              </div>

            ))}

          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-100 border-y-4 border-gray-200 py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            <div className="bg-white border-2 border-gray-200 p-10 lg:p-14 rounded shadow-sm relative overflow-hidden">

              <Target
                size={120}
                className="absolute -top-10 -right-10 text-gray-50"
              />

              <h3 className="text-3xl font-black text-[#1e293b] uppercase tracking-tighter mb-6 relative z-10">
                Our Mission
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed font-medium relative z-10">
                To make electronic procurement simple, transparent,
                reliable, and accessible for engineers, students, makers,
                institutions, and businesses.
              </p>

            </div>

            <div className="bg-[#1e293b] border-2 border-[#1e293b] p-10 lg:p-14 rounded shadow-lg relative overflow-hidden">

              <Eye
                size={120}
                className="absolute -top-10 -right-10 text-gray-800 opacity-50"
              />

              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6 relative z-10">
                Our Vision
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed font-medium relative z-10">
                To build a trusted digital destination where people can
                discover, purchase, and learn about electronic hardware
                through a modern technology platform.
              </p>

            </div>

          </div>

          <div className="text-center mb-10 mt-20">

            <h2 className="text-2xl font-black text-[#1e293b] tracking-widest uppercase">
              The Pillars of Density
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[
              ["Trust", "The foundation of every relationship."],
              ["Quality", "Reliable hardware and information."],
              ["Satisfaction", "Customer experience comes first."],
              ["Innovation", "Technology for better procurement."],
              ["Integrity", "Transparent business practices."],
              ["Reliability", "Consistent service and support."],
              ["Growth", "Growing with our customers."],
              ["Focus", "Removing procurement friction."],
            ].map(([title, desc], index) => (

              <div
                key={index}
                className="bg-white p-6 rounded text-center border-b-4 border-orange-500 shadow-sm"
              >

                <h4 className="text-[#1e293b] font-black uppercase tracking-wider text-sm mb-2">
                  {title}
                </h4>

                <p className="text-gray-500 text-[11px] font-bold uppercase">
                  {desc}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

        <div className="max-w-3xl mx-auto">

          <CheckCircle2
            size={48}
            className="text-orange-500 mx-auto mb-8"
          />

          <h2 className="text-4xl font-black text-[#1e293b] tracking-tighter uppercase mb-6">
            Built By Feedback.
          </h2>

          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
            We want customers to confidently use the hardware they purchase.
            Every review and feedback helps us improve our products,
            packaging, support, and overall experience.
          </p>

          <p className="text-2xl font-black text-orange-600 uppercase tracking-widest border-2 border-orange-600 inline-block px-8 py-4 rounded">
            Better Products. Better Value. Better Technology.
          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">

        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl overflow-hidden relative shadow-2xl border-4 border-orange-700 text-center py-20 px-8">

          <div className="relative z-10 max-w-4xl mx-auto">

            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6">
              The Journey Continues
            </h2>

            <p className="text-orange-100 text-lg md:text-xl font-bold leading-relaxed mb-10 max-w-2xl mx-auto">
              Better Products, Better Value, and Better Technology for
              every electronics journey.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

              {[
                "Quality Products",
                "Secure Shopping",
                "B2B Support",
                "Continuous Growth",
              ].map((promise, index) => (

                <div
                  key={index}
                  className="bg-[#1e293b]/80 text-white px-4 py-3 rounded font-black text-xs uppercase tracking-widest border border-gray-700"
                >
                  ✓ {promise}
                </div>

              ))}

            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#1e293b] hover:bg-gray-900 text-white px-12 py-5 rounded-lg font-black text-lg uppercase tracking-widest border-2 border-gray-800 shadow-xl transition-all hover:scale-105"
            >
              Start Sourcing Now
              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}


/* ============================================================
   SIMPLE PLACEHOLDER ICON
   ============================================================ */

function UserPlaceholder() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-gray-400"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}