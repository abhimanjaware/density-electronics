import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();

  // Complete catalog mapped dynamically from the provided Excel sheet
  const allCategories = [
  {
    name: "Sensor Modules",
    slug: "Sensor Modules",
    count: "38 Products",
    img: "https://images.unsplash.com/photo-1595692682118-774e5182f484?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Electronic Components",
    slug: "Electronic Components",
    count: "18 Products",
    img: "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/1/300/308/999/MFG_DFR0216_sml.jpg"
  },
  {
    name: "Development Boards",
    slug: "Development Boards",
    count: "16 Products",
    img: "https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/766/NUCLEO-F401RE.JPG?hidebanner=true"
  },
  {
    name: "Batteries & Power Management",
    slug: "Batteries & Power Management",
    count: "16 Products",
    img: "https://images.unsplash.com/photo-1550496923-a0e3ef948e3a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Motors",
    slug: "Motors",
    count: "11 Products",
    img: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2016%2F05%2FNEMA17-4.2-kg-cm-Stepper-Motor.png&w=1920&q=90"
  },
  {
    name: "Memory",
    slug: "Memory",
    count: "9 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXQwcopzeUCuusX8vYXzl198sUyUihDQwke9AeFvOBA&s=10"
  },
  {
    name: "Display",
    slug: "Display",
    count: "7 Products",
    img: "https://quartzcomponents.com/cdn/shop/products/OLEDDisplay0.96InchI2CInterface4PinBlueSSD1306.jpg?v=1698321495"
  },
  {
    name: "Relays",
    slug: "Relays",
    count: "7 Products",
    img: "https://quartzcomponents.com/cdn/shop/files/12V30ASingleChannelRelayModulewithOptocouplerHigh_LowLevelTrigger_2.jpg?v=1755932707"
  },
  {
    name: "3D Printing",
    slug: "3D Printing",
    count: "7 Products",
    img: "https://3dprintingperth.com/cdn/shop/products/V177-AL-MBMP07825-1_Replicator__Right_Giza_web__08720-02_2048x2048.png?v=1662006047"
  },
  {
    name: "Motor Drivers",
    slug: "Motor Drivers",
    count: "6 Products",
    img: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2015%2F12%2F32.jpg&w=1920&q=90"
  },
  {
    name: "Module",
    slug: "Module",
    count: "6 Products",
    img: "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/6/003/233/001/MFG_1528_6331_web%28640x640%29.jpg?hidebanner=true"
  },
  {
    name: "Power",
    slug: "Power",
    count: "6 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7ZknwPCQ_Pk8ay0tZQPqQovb7hz-zEqm6AEVlSoSlQ&s=10"
  },
  {
    name: "RF Antenna",
    slug: "RF Antenna",
    count: "6 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWAxI2H3YEo5RXosWDj7u9X8Nvp56DPabBTFdTwrxSw&s"
  },
  {
    name: "Supplier Brand",
    slug: "Supplier Brand",
    count: "6 Products",
    img: "https://ecdn6.globalso.com/upload/p/1355/source/2024-11/673c3a82ae33158189.jpg"
  },
  {
    name: "Robotics Project Kits",
    slug: "Robotics Project Kits",
    count: "6 Products",
    img: "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/6/003/217/524/MFG_ROB0182_web%28640x640%29.jpg?hidebanner=true"
  },
  {
    name: "Wireless",
    slug: "Wireless",
    count: "5 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vKXeylmE575Iw8HKkgI9fICfXgbpqTgUyOA0a0mzRQ&s=10"
  },
  {
    name: "Mechanical Equipments",
    slug: "Mechanical Equipments",
    count: "4 Products",
    img: "https://content.misumi-ec.com/image/upload/t_product_main/v1/p/cn/product/series/110310971639/110310971639_20240123141158.jpg"
  },
  {
    name: "Wiring & Breadboards",
    slug: "Wiring & Breadboards",
    count: "3 Products",
    img: "https://sfxpcb.com/wp-content/uploads/2023/09/Breadboard-600x450.jpg"
  },
  {
    name: "Tools & Soldering",
    slug: "Tools & Soldering",
    count: "1 Product",
    img: "https://thumbs.dreamstime.com/b/soldering-electronic-components-onto-pcb-electronics-repair-digital-technology-257617553.jpg"
  },
  {
    name: "Cellular",
    slug: "Cellular",
    count: "1 Product",
    img: "https://img.freepik.com/premium-photo/closeup-view-cell-phones-circuit-board-revealing-intricate-electronic-components-glimpse-into-world-smartphone-repair_248459-33198.jpg?w=2000"
  },
  {
    name: "Camera Modules",
    slug: "Camera Modules",
    count: "1 Product",
    img: "https://tse3.mm.bing.net/th/id/OIP.jWcPgfkAfksilzRyzNqSiwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  }
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
                loading="lazy"
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