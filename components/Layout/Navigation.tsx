import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import logoAnimation from '../../assets/logo-animation.webm';
import logoStatic from '../../assets/logo-static.webp';

interface NavigationProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onMenuToggle, isMenuOpen }) => {
  const [time, setTime] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Measure and set nav height as CSS variable
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
      }
    };

    // Initial measurement
    updateNavHeight();

    // Update on resize
    window.addEventListener('resize', updateNavHeight);

    return () => {
      window.removeEventListener('resize', updateNavHeight);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-NZ', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Pacific/Auckland'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] px-8 py-6 transition-all duration-500 ${scrolled ? 'editorial-surface' : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Logo Mark */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
              poster={logoStatic}
            >
              <source src={logoAnimation} type="video/webm" />
              <img src={logoStatic} alt="Cleland Studio" className="w-full h-full object-contain" />
            </video>
          </div>
          <span className="font-syne text-[10px] tracking-widest text-ivory/40 uppercase hidden md:block">
            © {new Date().getFullYear()}
          </span>
        </div>

        {/* Center Time/Location */}
        <div className="hidden md:flex items-center gap-8 font-syne text-[10px] tracking-widest text-ivory/60 uppercase">
          <span>Aotearoa (NZ)</span>
          <span className="w-px h-3 bg-ivory/20"></span>
          <span>{time}</span>
        </div>

        {/* Burger */}
        <button
          onClick={onMenuToggle}
          className="group relative flex items-center gap-3"
        >
          <span className="font-syne text-[10px] font-bold tracking-widest text-ivory uppercase group-hover:text-gold transition-colors duration-300">
            {isMenuOpen ? 'Close' : 'Menu'}
          </span>
          <div className="relative w-8 h-8 flex items-center justify-center border border-ivory/20 rounded-full group-hover:border-gold transition-colors duration-300">
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-3 h-3 text-gold" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-[3px]"
                >
                  <div className="w-3 h-[1px] bg-ivory group-hover:bg-gold transition-colors"></div>
                  <div className="w-3 h-[1px] bg-ivory group-hover:bg-gold transition-colors"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.nav>
  );
};