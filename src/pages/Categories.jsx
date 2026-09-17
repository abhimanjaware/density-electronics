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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Ksx4UotHos3YYhN7YUWUUwPSsv0OJ8tlkK_flXQ-ow&s=10"
  },
  {
    name: "Electronic Components",
    slug: "Electronic Components",
    count: "18 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrcd0m0eDdnF4FUHmmFQufxW1vQGQE_3VmA6mKGXBLZQ&s=10"
  },
  {
    name: "Development Boards",
    slug: "Development Boards",
    count: "16 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShFeW8_20BFoGdkyS0C6XobAQg704sqi4c0B1ZrcW4xw&s=10"
  },
  {
    name: "Batteries & Power Management",
    slug: "Batteries & Power Management",
    count: "16 Products",
    img: "https://cdn.ecommercedns.uk/files/2/258392/3/40138273/inr18650-2000mah-li-ion-batteyr.jpg"
  },
  {
    name: "Motors",
    slug: "Motors",
    count: "11 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu-HJdT2TWLcgLRkn5ebbVVG5g9uOPqHWegLLHM86_gQ&s=10"
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
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr7KtNvZ0YMCvTTfn-EOZgoAiV6s6KxEHqp2rWf2nfVQ&s=10"
  },
  {
    name: "Relays",
    slug: "Relays",
    count: "7 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb1okbObI1bpuQDZxI3UPtRQlHn4SHO1Zd5p6V8N0JCg&s=10"
  },
  {
    name: "3D Printing",
    slug: "3D Printing",
    count: "7 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe9srv-6Ei8eeA0g0p6-ZAoTquKRQ2p7tVM--ZyO11BQ&s=10"
  },
  {
    name: "Motor Drivers",
    slug: "Motor Drivers",
    count: "6 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HGhFP9FJd8yLB_ts_JXAWpngRICqilcmGK96Ef9xLQ&s=10"
  },
  {
    name: "Module",
    slug: "Module",
    count: "6 Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQshl5oRd5kpr4V2_XWWvysuiqfhV2p3PWs9n63SGWuVg&s=10"
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
    img: "https://robocraze.com/cdn/shop/files/1_2d942dd3-06ad-45b4-9616-3d65740ab851_1000x.png?v=1754484573"
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