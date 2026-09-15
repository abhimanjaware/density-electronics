import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();

  // Complete catalog mapped exactly to your 4.xlsx source of truth
  const allCategories = [
    { name: "Development Boards", slug: "Development Board", count: "6 Products", img: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&q=80&w=600" },
    { name: "Sensor Modules", slug: "Sensor", count: "6 Products", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600" },
    { name: "Displays & OLEDs", slug: "Display", count: "7 Products", img: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600" },
    { name: "Motors & Actuators", slug: "Motors", count: "3 Products", img: "https://images.unsplash.com/photo-1580828369019-2238f6982fa7?auto=format&fit=crop&q=80&w=600" },
    { name: "Power", slug: "Power", count: "1 Product", img: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&q=80&w=600" },
    { name: "Wireless Modules", slug: "Wireless", count: "1 Product", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" },
    { name: "Cellular Modules", slug: "Cellular", count: "1 Product", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600" },
    { name: "RF Antennas", slug: "RF Antenna", count: "5 Products", img: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&q=80&w=600" },
    { name: "Memory", slug: "Memory", count: "7 Products", img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=600" },
    { name: "Supplier Brands (HMI)", slug: "Supplier Brand", count: "6 Products", img: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=600" },
    { name: "Robotics Projects", slug: "Robotics Project", count: "8 Products", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600" },
    { name: "Soldering Guns", slug: "Soldering Gun", count: "1 Product", img: "https://images.unsplash.com/photo-1504916298517-8e6922fb6896?auto=format&fit=crop&q=80&w=600" },
    { name: "Jumper Wires", slug: "Jumper wires", count: "2 Products", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600" },
    { name: "Breadboards", slug: "Breadboard", count: "1 Product", img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600" },
    { name: "RGB Lights Modules", slug: "RGB Lights Module", count: "1 Product", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600" },
    { name: "Laser Sensor Modules", slug: "Laser Sensor Module", count: "1 Product", img: "https://images.unsplash.com/photo-1620023419330-1c86e0881180?auto=format&fit=crop&q=80&w=600" },
    { name: "Motor Drivers", slug: "Motor Driver", count: "1 Product", img: "https://images.unsplash.com/photo-1580828369019-2238f6982fa7?auto=format&fit=crop&q=80&w=600" },
    { name: "Motor Driver Shields", slug: "Motor Driver shield", count: "1 Product", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" },
    { name: "NAND Flash Memory", slug: "Nand Flash Memory", count: "1 Product", img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=600" },
    { name: "Batteries", slug: "Battery", count: "2 Products", img: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&q=80&w=600" },
    { name: "Battery Holders", slug: "Battery Holder", count: "1 Product", img: "https://images.unsplash.com/photo-1585435422896-e7e008a68b57?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#2563EB] text-sm font-bold mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1A1726] tracking-tight">
              All Categories
            </h1>
            <p className="text-gray-500 mt-2">Browse our complete catalog of {allCategories.length} component categories.</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {allCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.slug)}`)}
              className="group relative w-full h-[160px] sm:h-[200px] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-200"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1726]/90 via-[#1A1726]/30 to-transparent opacity-90 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end">
                <h3 className="font-bold text-sm sm:text-base text-white leading-tight mb-1 group-hover:text-blue-200 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs font-medium text-gray-300">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}