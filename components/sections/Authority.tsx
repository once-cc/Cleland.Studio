import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';
import blueprintAsset from '../../assets/sectionanimations/blueprint.webp';

export const Authority: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const shouldReduceMotion = useReducedMotion();



  // Animation Replay Logic
  const [replayKey, setReplayKey] = useState(0);

  const triggerAnimation = () => {
    setReplayKey(prev => prev + 1);
  };

  useEffect(() => {
    if (isInView) {
      triggerAnimation();
    }
  }, [isInView]);

  // Animation constants
  const SECTION_ENTRY_DURATION = 0.4;

  // Headline
  const HEADLINE_DELAY = 0.15;
  const HEADLINE_DURATION = 0.3;

  // Subline (Starts 120ms after headline finishes)
  // 0.15 + 0.3 + 0.12 = 0.57
  const SUBLINE_DELAY = HEADLINE_DELAY + HEADLINE_DURATION + 0.12;
  const SUBLINE_DURATION = 0.25;

  // Bullets (Start after subline finishes? Prompt says "sequential reveal")
  // Assuming bullets start shortly after subline or with it?
  // Prompt says: "Bullet items... Triggered by scroll progression" but usually relative to parent.
  // Standard flow: Headline -> Subline -> Bullets.
  // Let's start bullets after subline. 0.57 + 0.25 = 0.82
  // Or maybe a bit tighter overlap? 
  // "Subline Reveal... Duration: 250ms". "Bullet List... Sequential Reveal" 
  // Let's stick to a procedural flow. 
  const BULLET_START_DELAY = SUBLINE_DELAY + 0.1; // Small gap
  const BULLET_STAGGER = 0.09;
  const BULLET_DURATION = 0.2;

  // Reassurance (After last bullet?)
  // 4 bullets * 0.09 stagger + duration?  
  // Let's rely on variants for cleaner sequencing if possible, or manual calcs.
  // Actually, standard manual delay calc might be safer for strict adherence.
  // Bullet 1: Start 0.92
  // Bullet 2: Start 1.01
  // Bullet 3: Start 1.10
  // Bullet 4: Start 1.19. Finishes at 1.19 + 0.2 = 1.39

  // Reassurance: "Reveal as a single grouped fade"
  // Let's start it after bullets resolve? Or strictly after the list block?
  // Let's aim for ~1.4s start.
  const REASSURANCE_DELAY = 1.4;
  const REASSURANCE_DURATION = 0.25;

  // CTA: "Begin 120ms after authority block is visible"
  // 1.4 + 0.25 = 1.65. Plus 0.12 = 1.77
  const CTA_DELAY = REASSURANCE_DELAY + REASSURANCE_DURATION + 0.12;
  const CTA_DURATION = 0.3;

  const easing = [0.22, 1, 0.36, 1]; // cubic-bezier(0.22, 1, 0.36, 1)

  const processSteps = [
    { type: 'label', content: 'Discovery' },
    { type: 'bullet', content: 'What your website should actually be doing' },
    { type: 'bullet', content: 'Where you’re leaking leads, time, or momentum' },
    { type: 'label', content: 'Design' },
    { type: 'bullet', content: 'What systems you actually need — and don’t' },
    { type: 'bullet', content: 'How your brand, messaging, and structure should align' },
    { type: 'label', content: 'Deliver' },
    { type: 'bullet', content: 'What a production-ready setup looks like for your business' }
  ];

  return (
    <section
      id="authority"
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 bg-studio-bg overflow-hidden"
    >
      {/* Background mountain abstract or gradient could go here - preserved from original */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-studio-bg via-studio-bg/90 to-transparent pointer-events-none"></div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: SECTION_ENTRY_DURATION, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center text-center relative z-10">
          {/* 1. Headline */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-normal font-domaine-narrow leading-[1.05] tracking-[-0.64px] mb-8"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
            transition={{
              delay: HEADLINE_DELAY,
              duration: HEADLINE_DURATION,
              ease: easing
            }}
          >
            Start with the Blueprint.
          </motion.h2>

          {/* 2. Subline */}
          <motion.p
            className="font-raela text-lg md:text-xl text-ivory/70 leading-relaxed max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              delay: SUBLINE_DELAY,
              duration: SUBLINE_DURATION,
              ease: "linear"
            }}
          >
            A guided starting point that brings clarity across:
          </motion.p>

          {/* 3. Bullet List */}
          <div className="flex flex-col items-start text-left space-y-4 mb-16 max-w-xl mx-auto w-full">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-start gap-4 ${step.type === 'label' ? 'mt-2 first:mt-0' : ''}`}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
                transition={{
                  delay: BULLET_START_DELAY + (index * BULLET_STAGGER),
                  duration: BULLET_DURATION,
                  ease: "easeOut"
                }}
              >
                {step.type === 'bullet' ? (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/50 mt-2 shrink-0" />
                    <span className="font-raela text-ivory/80 text-lg">{step.content}</span>
                  </>
                ) : (
                  <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest pt-1">{step.content}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* 4. Reassurance Lines */}
          <motion.div
            className="space-y-1 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              delay: REASSURANCE_DELAY,
              duration: REASSURANCE_DURATION,
              ease: "linear"
            }}
          >
            <p className="font-syne text-xs font-bold text-gold uppercase tracking-widest">No sales call.</p>
            <p className="font-syne text-xs font-bold text-gold uppercase tracking-widest">No commitment.</p>
            <p className="font-syne text-xs font-bold text-gold uppercase tracking-widest">Just clarity.</p>
          </motion.div>

          {/* 5. CTA */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            transition={{
              delay: CTA_DELAY,
              duration: CTA_DURATION,
              ease: easing
            }}
          >
            <Button variant="primary">
              Configure Your Blueprint
            </Button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};