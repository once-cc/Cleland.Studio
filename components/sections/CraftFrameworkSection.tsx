import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent, useTransform, MotionValue, motion, AnimatePresence } from 'framer-motion';

// -----------------------------------------------------------------------------
// Data Wiring
// -----------------------------------------------------------------------------

export interface CraftStep {
  letter: string;
  title: string;
  desc: string;
  punchline: string;
}

const craftSteps: CraftStep[] = [
  {
    letter: 'C',
    title: 'Clarify',
    desc: 'Clarity · Direction · Constraints',
    punchline: 'Clarity and certainty of direction.'
  },
  {
    letter: 'R',
    title: 'Research',
    desc: 'Positioning · Messaging · Structure',
    punchline: 'Evidence-informed strategy. Market-tested.'
  },
  {
    letter: 'A',
    title: 'Architect',
    desc: 'Scope · Timelines · Accountability',
    punchline: 'A locked plan with shared accountability.'
  },
  {
    letter: 'F',
    title: 'Forge',
    desc: 'Design · Build · Optimise',
    punchline: 'A production-ready digital system.'
  },
  {
    letter: 'T',
    title: 'Transform',
    desc: 'Launch · Measure · Iterate',
    punchline: 'A live, measured digital presence.'
  },
];

// -----------------------------------------------------------------------------
// Layout Component (Unified)
// -----------------------------------------------------------------------------

interface CraftLayoutProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
  scrollYProgress: MotionValue<number>;
  isVertical: boolean;
}

const CraftLayout: React.FC<CraftLayoutProps> = ({ activeIndex, onNavigate, scrollYProgress, isVertical }) => {
  const [isObstructed, setIsObstructed] = useState(true);

  // Transform for the obstruction panel: slides up to reveal content
  const slideY = useTransform(scrollYProgress, [0, 0.05], ["0%", "-100%"]);

  // Monitor scroll progress to release pointer events once the obstruction has cleared
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (latest > 0.05 && isObstructed) {
      setIsObstructed(false);
    } else if (latest <= 0.05 && !isObstructed) {
      setIsObstructed(true);
    }
  });

  return (
    // Container Area: Switches direction based on device
    <div className={`relative w-full h-full overflow-hidden bg-studio-bg flex ${isVertical ? 'flex-col' : 'flex-row border-t border-white/5'}`}>

      {/* Sidebar / Header Area */}
      <div className={`
        relative shrink-0 bg-studio-bg z-10 flex flex-col justify-between
        ${isVertical
          ? 'w-full h-auto p-6 border-b border-white/5'
          : 'w-[400px] h-full border-r border-white/5 p-10 lg:p-12 flex flex-col'
        }
      `}>

        {/* Header Content with Obstruction */}
        <div className="relative">
          <div className="flex justify-between items-start">
            {isVertical ? (
              <div className="flex items-stretch w-full">
                {/* Left: Title Block (Aligned Right to Marker) */}
                <div className="flex-[1.4] border-r border-gold/50 pr-6 py-4 flex flex-col justify-center text-right">
                  <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest mb-3 block">
                    [04] — FRAMEWORK
                  </span>
                  <h2 className="font-normal text-editorial-gradient font-domaine-narrow leading-[1.05] tracking-[-0.64px] text-4xl sm:text-5xl">
                    The C.R.A.F.T. <span className="text-white/[0.03]">Model</span>
                  </h2>
                </div>

                {/* Right: Punchline Slab (Aligned Left to Marker) */}
                <div className="flex-1 bg-white/[0.02] pl-6 py-4 flex flex-col justify-center">
                  <div className="grid grid-cols-1">
                    <AnimatePresence>
                      <motion.p
                        key={activeIndex}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="font-cormorant text-xl text-ivory/90 leading-[1.55] text-left col-start-1 row-start-1"
                      >
                        {craftSteps[activeIndex].punchline}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ) : (
              <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest mb-4 block">[04] — FRAMEWORK</span>
            )}

            {/* Mobile Punchline Readout (Legacy position removed in favor of split-pane above) */}
            {isVertical && null}
          </div>

          {!isVertical ? (
            <h2 className="font-normal text-editorial-gradient font-domaine-narrow leading-[1.05] tracking-[-0.64px] text-5xl lg:text-7xl mt-6">
              The <br />
              C.R.A.F.T. <br />
              <span className="text-white/[0.03]">Model</span>
            </h2>
          ) : null}
          {!isVertical && (
            <>
              <div className="w-12 h-[1px] bg-gold/50 mt-8 mb-8"></div>
              {/* Desktop Punchline Readout - Moved to Header Group */}
              <div className="relative h-[80px] w-full">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="font-cormorant text-2xl text-ivory/90 leading-tight absolute top-0 left-0 w-full"
                  >
                    {craftSteps[activeIndex].punchline}
                  </motion.p>
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Sliding Obstruction Panel */}
          <motion.div
            style={{ y: slideY }}
            className={`absolute inset-0 bg-studio-bg z-20 origin-bottom -m-4 p-4 ${!isObstructed ? 'pointer-events-none' : ''}`}
            aria-hidden="true"
          />
        </div>

        {/* Navigation Pills (State Interaction) - Hide on mobile to save space, or keep compact */}
        {!isVertical && (
          <>
            <div className="flex flex-col gap-2 mt-auto">
              {craftSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={`text-left font-syne text-[10px] uppercase tracking-widest transition-colors duration-300 flex items-center gap-3 py-2 ${activeIndex === index ? 'text-gold' : 'text-ivory/30 hover:text-ivory/60'
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-gold' : 'bg-white/10'
                    }`}></span>
                  Phase 0{index + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Desktop Description (Bottom of Sidebar) */}
        {!isVertical && (
          <div className="space-y-6">
            <p className="font-body text-sm text-ivory/50 leading-relaxed max-w-[280px]">
              Our proprietary framework for deconstructing complexity and engineering digital authority.
            </p>
          </div>
        )}
      </div>

      {/* Panel Grid: Switches direction based on device */}
      <div className={`flex-1 flex min-h-0 min-w-0 ${isVertical ? 'flex-col' : 'flex-row'}`}>
        {craftSteps.map((step, index) => {
          const isActive = index === activeIndex;
          const isAdjacent = Math.abs(index - activeIndex) === 1;

          // Flex-Based Expansion Logic (Shared across axes)
          const flexValue = isActive ? 2.6 : isAdjacent ? 0.8 : 0.4;

          return (
            <motion.div
              key={index}
              onClick={() => onNavigate(index)}
              initial={false}
              animate={{ flexGrow: flexValue }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 26,
                mass: 0.6
              }}
              style={{
                flexBasis: 0, // Critical for proper flex distribution
                minWidth: 0,
                minHeight: 0,
                opacity: isActive ? 1 : 0.55,
                pointerEvents: isActive ? "auto" : "none"
              }}
              className={`
                relative group flex items-center overflow-hidden cursor-pointer
                ${isVertical
                  ? 'w-full border-b border-white/5 flex-row px-6 justify-between'
                  : 'h-full border-r border-white/5 flex-col py-12 justify-between'
                }
                ${isActive ? 'bg-white/[0.03]' : 'bg-studio-bg'}
              `}
            >

              {/* Top Indicator */}
              <div className={`${isVertical ? '' : 'w-full flex justify-center'}`}>
                <span className={`font-syne text-[10px] uppercase tracking-widest transition-colors duration-500 ${isVertical ? '' : '[writing-mode:vertical-rl] rotate-180'
                  } ${isActive ? 'text-gold' : 'text-ivory/20'}`}>
                  Phase 0{index + 1}
                </span>
              </div>

              {/* Center Content */}
              <div className={`flex items-center gap-8 ${isVertical
                ? 'flex-row-reverse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                : 'flex-col'
                }`}>
                <span className={`font-syne font-bold leading-none transition-all duration-500 ${isVertical ? 'text-4xl' : 'text-[8rem]'
                  } ${isActive ? 'text-gold/20' : 'text-outline group-hover:text-gold/5'}`}>
                  {step.letter}
                </span>

                {/* Decoration Line */}
                <div className={`transition-colors duration-500 ${isVertical
                  ? 'w-8 h-[1px]'
                  : 'h-16 w-[1px]'
                  } ${isActive ? 'bg-gold' : 'bg-white/10 group-hover:bg-gold/30'}`}></div>
              </div>

              {/* Bottom Title */}
              <div className={`${isVertical ? '' : 'h-[200px] flex items-end pb-8'}`}>
                <h3 className={`font-cormorant transition-colors duration-500 whitespace-nowrap ${isVertical
                  ? 'text-2xl'
                  : 'text-4xl [writing-mode:vertical-rl] rotate-180'
                  } ${isActive ? 'text-ivory' : 'text-ivory/40 group-hover:text-ivory/60'}`}>
                  {step.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

// -----------------------------------------------------------------------------
// Root Component
// -----------------------------------------------------------------------------

export function CraftFrameworkSection(props: { id?: string }) {
  const [isVertical, setIsVertical] = useState<boolean>(false);

  // State Logic
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lockTimeoutRef = useRef<number | null>(null);

  // Scroll Observation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Responsive Check (Breakpoint: 1024px)
  useEffect(() => {
    const checkResponsive = () => {
      setIsVertical(window.innerWidth < 1024);
    };

    // Initial check
    checkResponsive();

    // Listener
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Update Active Index based on Scroll Progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isLocked) return;

    // Map 0-1 progress to 0-4 index
    const numberOfSteps = craftSteps.length;
    const stepSize = 1 / numberOfSteps;

    // Calculate index, clamping between 0 and length-1
    const newIndex = Math.min(
      Math.floor(latest / stepSize),
      numberOfSteps - 1
    );

    if (newIndex !== activeIndex && newIndex >= 0) {
      setActiveIndex(newIndex);
    }
  });

  // Navigation Handler (Intent Locking)
  const handleNavigate = (index: number) => {
    if (lockTimeoutRef.current) {
      window.clearTimeout(lockTimeoutRef.current);
    }

    setIsLocked(true);
    setActiveIndex(index);

    // Lock intent for a moment to prevent scroll overrides
    lockTimeoutRef.current = window.setTimeout(() => {
      setIsLocked(false);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id={props.id}
      className="relative isolate bg-transparent"
      style={{ minHeight: "600vh" }}
    >
      <div className={`
        sticky w-full overflow-hidden top-nav
        ${isVertical
          ? 'h-[calc(100vh-var(--nav-height))]'
          : 'h-[calc(100vh-var(--nav-height))] top-nav'
        }
      `}>
        <CraftLayout
          activeIndex={activeIndex}
          onNavigate={handleNavigate}
          scrollYProgress={scrollYProgress}
          isVertical={isVertical}
        />
      </div>
    </section>
  );
}
