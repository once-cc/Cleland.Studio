import React from 'react';
import { Button } from '../ui/Button';
import { EmailCapture } from '../ui/EmailCapture';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative bg-[#050508] pt-nav pb-8 md:pb-12 px-6 border-t border-white/5 overflow-hidden">
      {/* Static Background Image Layer - replaces video for GPU stability */}
      <img
        src="/assets/footerstatic.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-40"
      />

      {/* Background Wordmark - Absolute & Decorative */}
      <div className="footer-watermark pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 leading-none z-[1]">
        <span className="
          font-syne font-semibold tracking-wide text-center whitespace-nowrap text-white
          opacity-[0.06]
          text-[clamp(4.5rem,16vw,7rem)]
          md:text-[clamp(6rem,18vw,10rem)]
          lg:text-[clamp(8rem,18vw,12rem)]
        ">
          CLELAND
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 mb-10 md:mb-20 lg:mb-32">
          {/* Left Column: Editorial */}
          <div className="flex flex-col justify-between">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-normal font-domaine-narrow leading-[1.05] tracking-[-0.64px] mb-6 md:mb-0">
              <span className="italic">Let's build</span> <br />
              <span style={{
                background: 'linear-gradient(135deg, #eac376 0%, #d4a853 50%, #b88c3a 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent'
              }}>what lasts.</span>
            </h2>

            <div className="mt-6 md:mt-12 max-w-sm">
              <p className="font-syne text-xs text-gold uppercase tracking-widest mb-4">Newsletter</p>
              <EmailCapture source="footer" variant="minimal" placeholder="Stay updated" buttonText="" />
            </div>
          </div>

          {/* Right Column: Contact & Studio */}
          <div className="flex flex-col justify-end space-y-6 md:space-y-10 md:pl-10 lg:pl-24">
            <div className="space-y-2">
              <p className="font-syne text-xs text-gold uppercase tracking-widest">Direct</p>
              <a href="mailto:joshua@cleland.studio" className="font-body text-2xl md:text-3xl lg:text-2xl text-ivory/80 hover:text-white transition-colors block">
                joshua@cleland.studio
              </a>
            </div>
            <div className="space-y-2">
              <p className="font-syne text-xs text-gold uppercase tracking-widest">Studio</p>
              <p className="font-body text-lg md:text-xl text-ivory/60 leading-relaxed">
                Wellington, New Zealand<br />
                Serving clients globally.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end pt-6 md:pt-12 border-t border-white/5 relative z-10">
          {/* Socials */}
          <div className="mb-6 md:mb-0 w-full md:w-auto">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                <a key={social} href="#" className="font-syne text-xs font-bold text-ivory/40 hover:text-gold uppercase tracking-widest transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center font-syne text-[10px] text-ivory/20 uppercase tracking-widest gap-4 md:gap-0">
          <span>© 2026 Cleland Studio. All rights reserved.</span>
          <span>Privacy & Terms</span>
        </div>
      </div>
    </footer>
  );
};