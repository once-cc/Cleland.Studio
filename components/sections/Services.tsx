import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Service } from '../../types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const services: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'Brand Identity',
    description: 'Define positioning, sharpen your offer, and align your brand for scale.',
    tags: ['Market Positioning Report', 'Ideal Customer Profile (ICP)', 'Strategic Brand Documentation']
  },
  {
    id: 's2',
    number: '02',
    title: 'Digital Design',
    description: 'Design conversion-ready experiences that feel effortless to use.',
    tags: ['Conversion-Optimised Layouts', 'UX / UI Design System', 'Mobile Performance Pass']
  },
  {
    id: 's3',
    number: '03',
    title: 'Product Design',
    description: 'Turn ideas into structured, usable systems before anything is built.',
    tags: ['Website Blueprint Architecture', 'Customer Journey Framework', 'Functional System Mapping']
  },
  {
    id: 's4',
    number: '04',
    title: 'Marketing & Growth',
    description: 'Build growth infrastructure that compounds without chaos.',
    tags: ['Funnel & Lead System Design', 'Lifecycle Automation Setup', 'Analytics & Conversion Framework']
  },
  {
    id: 's5',
    number: '05',
    title: 'Development',
    description: 'Implement scalable systems cleanly, reliably, and correctly.',
    tags: ['CRM & Platform Integration', 'Custom Workflow Automation', 'Performance & Accessibility Pass']
  }
];

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('s1');

  return (
    <section id="services" className="pt-8 pb-32 px-6 bg-studio-bg relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

        {/* Left: Sticky Title */}
        <div className="lg:col-span-4">
          <div className="sticky top-[calc(var(--nav-height)+2rem)]">
            <SectionTitle
              number="03"
              title="SERVICES"
              subtitle={<span className="font-domaine-narrow font-normal tracking-[-0.64px] leading-[1.05]">Design from a different vantage point.</span>}
              className="!gap-8 !mb-8"
            />
            <p className="font-body text-ivory/60 max-w-sm">
              No noise. No theatre. Just craftsmanship that moves the needle. Premium-built for businesses building upward.
            </p>

            <div className="mt-8 lg:mt-12">
              <Button variant="primary">
                Configure Blueprint
              </Button>
              <p className="mt-4 font-syne text-[10px] tracking-widest text-ivory/30 uppercase">
                Start your system architecture
              </p>
            </div>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="lg:col-span-8 flex flex-col">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="border-b border-white/10"
              initial={false}
            >
              <button
                onClick={() => setActiveId(activeId === service.id ? null : service.id)}
                className="w-full py-10 flex items-baseline justify-between group text-left transition-colors hover:bg-white/5 px-4 -mx-4 rounded-lg"
              >
                <span className="font-syne text-xs font-bold text-gold/50 mr-8">[{service.number}]</span>
                <h3 className={`font-cormorant text-4xl md:text-5xl transition-colors duration-300 ${activeId === service.id ? 'text-gold' : 'text-ivory group-hover:text-white'}`}>
                  {service.title}
                </h3>
                <span className="ml-auto pl-8">
                  <ArrowUpRight className={`w-6 h-6 transition-transform duration-500 ${activeId === service.id ? 'rotate-90 text-gold' : 'text-ivory/30'}`} />
                </span>
              </button>

              <AnimatePresence>
                {activeId === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-16 pr-4 max-w-2xl">
                      <p className="font-body text-lg text-ivory/70 leading-relaxed mb-8">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap xl:flex-nowrap gap-3">
                        {service.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 border border-white/10 rounded-full font-syne text-[10px] tracking-widest text-ivory/50 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};