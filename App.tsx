import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Layout/Navigation';
import { Menu } from './components/Layout/Menu';
import { Footer } from './components/sections/Footer';
import { Home } from './components/pages/Home';
import { ProjectDetail } from './components/pages/ProjectDetail';
import { ServicesPage } from './components/pages/ServicesPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Calculate footer height for the reveal effect
  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        // Safety check: Only enable reveal (fixed position) if the footer fits within the viewport.
        // If the footer is taller than the screen, we must keep it static to ensure it's fully scrollable.
        const fitsInViewport = height <= window.innerHeight;

        if (fitsInViewport) {
          setFooterHeight(height);
        } else {
          setFooterHeight(0);
        }
      }
    };

    updateHeight();

    // Observe changes in footer size (for responsiveness)
    const resizeObserver = new ResizeObserver(updateHeight);
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  const isFooterRevealActive = footerHeight > 0;

  return (
    <div className="bg-studio-bg min-h-screen text-ivory selection:bg-gold/30 selection:text-white">
      <Navigation
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* 
        Main content wrapper 
        - z-10 and relative to sit on top of the footer
        - bg-studio-bg to obscure the footer until revealed
        - marginBottom equals footer height (if reveal active) to allow scrolling "past" the content
      */}
      <main
        className="relative z-10 bg-studio-bg shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </main>

      {/* 
        Footer 
        - Reveal Active: Fixed at bottom, z-0
        - Reveal Inactive (Tall Footer): Relative, flows normally, z-10
      */}
      <div
        ref={footerRef}
        className={`w-full ${isFooterRevealActive ? 'fixed bottom-0 left-0 z-0' : 'relative z-10'}`}
      >
        <Footer />
      </div>
    </div>
  );
}

export default App;