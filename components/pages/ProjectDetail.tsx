import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { projects } from '../../data/projects';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();

  const project = useMemo(() => projects.find(p => p.id === id), [id]);
  const isComingSoon = project?.isComingSoon;

  if (!project) {
    return (
      <section className="min-h-screen pt-40 px-6 bg-studio-bg text-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cormorant text-4xl mb-4">Project Not Found</h1>
          <Link to="/" className="font-syne text-xs font-bold text-gold uppercase tracking-widest hover:text-white transition-colors">
            ← Return Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-40 px-6 bg-studio-bg text-ivory">
      <div className="max-w-[1400px] mx-auto">
        <Link to="/" className="inline-block mb-12">
          <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest hover:text-white transition-colors">
            ← Back to Home
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-12 flex justify-between items-end">
            <div>
              <h1 className="font-cormorant text-6xl md:text-8xl mb-4 text-ivory">{project.title}</h1>
              <p className="font-syne text-xs font-bold text-gold uppercase tracking-widest">{project.category}</p>
            </div>
            <div className="mb-2 hidden md:block">
              <span className="font-syne text-xs font-bold text-ivory/40">{project.year}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="space-y-6">
              <p className="font-body text-xl text-ivory/80 leading-relaxed">
                {isComingSoon
                  ? "This case study is currently in production. We are documenting the process, outcomes, and impact of this collaboration."
                  : "This represents a detailed view of a selected project. In a production environment, this page would populate dynamically based on the project ID."}
              </p>
              {!isComingSoon && (
                <p className="font-body text-lg text-ivory/60 leading-relaxed">
                  It serves as a destination for the routing system, demonstrating the seamless transition from the Work marquee to a dedicated content area.
                </p>
              )}
            </div>

            {/* Imagery / Placeholder Area */}
            <div className="relative aspect-video overflow-hidden bg-studio-card border border-white/5">
              {isComingSoon ? (
                <>
                  {/* Dimmed Background Image */}
                  <div className="absolute inset-0 opacity-30">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="font-cormorant text-3xl md:text-4xl text-ivory/90 tracking-wide">Coming soon…</span>
                  </div>
                </>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* CTA */}
          <div className={isComingSoon ? 'opacity-30 pointer-events-none grayscale' : ''}>
            <Button disabled={!!isComingSoon}>
              {isComingSoon ? "Site Unavailable" : "View Live Site"}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};