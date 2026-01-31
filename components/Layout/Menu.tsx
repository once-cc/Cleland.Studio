import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavItem } from '../../types';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', number: '01' },
  { label: 'Blueprint', href: '/#authority', number: '02' },
  { label: 'Work', href: '/#work', number: '03' },
  { label: 'Services', href: '/#services', number: '04' },
  { label: 'The C.R.A.F.T', href: '/#blueprint', number: '05' },
  { label: 'Contact', href: '/#contact', number: '06' },
];

const MotionLink = motion(Link);

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Separate Layer for Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              exit: { duration: 1.2 }
            }}
            className="fixed inset-0 z-40 bg-[#050508]/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sliding Menu Shell - Contains both panel and wordmark as siblings */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              exit: { duration: 1.2 }
            }}
            className="fixed inset-0 z-50 flex justify-end pointer-events-none overflow-visible"
          >
            {/* Container for Menu + Wordmark (mechanically attached) */}
            <div className="relative flex items-center overflow-visible">

              {/* Wordmark - Mechanically pinned to left edge of menu panel */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none select-none overflow-visible">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                    exit: { duration: 1.2, delay: 0 }
                  }}
                  className="flex items-center justify-center"
                >
                  <div className="-rotate-90 whitespace-nowrap transform-gpu origin-center">
                    <span className="font-syne font-bold text-[clamp(8rem,12vh,12rem)] leading-none text-white opacity-[0.03] tracking-tighter mix-blend-difference">
                      CLELAND
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Menu Panel */}
              <div
                className="w-full max-w-lg h-screen bg-[#0a0a0f] border-l border-white/5 relative shadow-2xl pointer-events-auto overflow-y-auto scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="min-h-full flex flex-col justify-center px-8 md:px-16 py-12 md:py-16">

                  <nav className="flex flex-col gap-2 md:gap-3 w-full">
                    {navItems.map((item, index) => (
                      <MotionLink
                        key={item.label}
                        to={item.href}
                        onClick={onClose}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + (index * 0.1),
                          ease: [0.22, 1, 0.36, 1],
                          exit: { duration: 0.5, delay: 0 }
                        }}
                        className="group flex items-baseline gap-4 md:gap-8 py-3 md:py-4 border-b border-white/5 hover:border-gold/30 transition-colors w-full"
                      >
                        <span className="font-syne text-[clamp(0.75rem,1.5vw,1rem)] text-gold/50 font-bold group-hover:text-gold transition-colors w-6 md:w-8 shrink-0">
                          [{item.number}]
                        </span>
                        <span className="font-cormorant text-[clamp(2rem,3.5vw,3.5rem)] leading-[0.9] text-ivory group-hover:text-gold group-hover:translate-x-4 transition-all duration-500 ease-studio">
                          {item.label}
                        </span>
                      </MotionLink>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.8, exit: { duration: 0.5 } }}
                    className="mt-8 md:mt-12 pt-8 border-t border-white/10"
                  >
                    {/* Contact Content */}
                    <div>
                      <p className="font-syne text-xs tracking-widest text-ivory/40 uppercase mb-4">Get in touch</p>
                      <a href="mailto:joshua@cleland.studio" className="font-body text-lg text-ivory hover:text-gold transition-colors block">
                        joshua@cleland.studio
                      </a>
                    </div>
                  </motion.div>

                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};