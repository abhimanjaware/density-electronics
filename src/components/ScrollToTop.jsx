import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Uses 'auto' instead of 'smooth' for instant page transitions
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}