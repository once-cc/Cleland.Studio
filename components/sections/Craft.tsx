import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';

const steps = [
  { letter: 'C', title: 'Consult', desc: 'Deep dive into business goals and blockers.' },
  { letter: 'R', title: 'Research', desc: 'Market analysis and competitor auditing.' },
  { letter: 'A', title: 'Architect', desc: 'System design and strategic mapping.' },
  { letter: 'F', title: 'Formulate', desc: 'Visual execution and technical build.' },
  { letter: 'T', title: 'Test', desc: 'Optimization and launch assurance.' },
];

export const Craft: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-studio-bg border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <SectionTitle number="03" title="Methodology" subtitle="The C.R.A.F.T. Framework" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-16">
          {steps.map((step, index) => (
             <div key={index} className="group p-8 border border-white/5 hover:border-gold/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 min-h-[300px] flex flex-col justify-between">
                <span className="font-syne font-bold text-6xl text-white/10 group-hover:text-gold/20 transition-colors">
                  {step.letter}.
                </span>
                <div>
                  <h4 className="font-cormorant text-2xl text-ivory mb-2 group-hover:text-gold transition-colors">{step.title}</h4>
                  <p className="font-body text-sm text-ivory/50 leading-relaxed group-hover:text-ivory/80 transition-colors">
                    {step.desc}
                  </p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};