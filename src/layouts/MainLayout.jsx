import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F0EBF8] text-[#1A1726] font-sans antialiased">
      <Header />
      
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}