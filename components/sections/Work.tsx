import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { InfiniteCarouselRow } from '../ui/InfiniteCarouselRow';

import { projects } from '../../data/projects';

const cardVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const imageVariants: Variants = {
  rest: {
    scale: 1,
    filter: 'grayscale(100%)'
  },
  hover: {
    scale: 1.05,
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const overlayVariants: Variants = {
  rest: {
    opacity: 0,
    y: 20
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// --- Reusable Components ---

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const isComingSoon = project.isComingSoon;

  const CardContent = (
    <motion.div
      initial="rest"
      whileHover={isComingSoon ? undefined : "hover"}
      animate="rest"
      variants={cardVariants}
      className={`group relative w-full h-full block ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-studio-card border border-white/5">
        {/* Dark Overlay that fades out on hover - Live projects only */}
        {!isComingSoon && (
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
        )}

        <motion.img
          src={project.image}
          alt={project.title}
          variants={imageVariants}
          className={`w-full h-full object-cover ${isComingSoon ? 'opacity-30' : ''}`}
        />

        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <span className="font-cormorant text-2xl md:text-3xl text-ivory">Coming soon…</span>
          </div>
        )}

        {/* Overlay Details (Button) - Live projects only */}
        {!isComingSoon && (
          <motion.div
            variants={overlayVariants}
            className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end z-20 pointer-events-none"
          >
            <div className="bg-studio-bg/90 backdrop-blur px-4 py-2 border border-white/10">
              <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest">View Case Study</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Text Details */}
      <div className={`mt-4 md:mt-6 flex justify-between items-start border-t border-white/10 pt-4 ${!isComingSoon ? 'group-hover:border-white/30' : ''} transition-colors duration-500 ${isComingSoon ? 'opacity-40' : ''}`}>
        <div>
          <h3 className={`font-cormorant text-2xl md:text-3xl text-ivory ${!isComingSoon ? 'group-hover:text-gold' : ''} transition-colors duration-300`}>{project.title}</h3>
          <p className="font-body text-xs md:text-sm text-ivory/50 mt-1">{project.category}</p>
        </div>
        <div className="text-right">
          <span className="font-syne text-xs font-bold text-ivory/30">{project.year}</span>
        </div>
      </div>
    </motion.div>
  );

  if (isComingSoon) {
    return <div className={className}>{CardContent}</div>;
  }

  return (
    <Link to={`/project/${project.id}`} className={className}>
      {CardContent}
    </Link>
  );
};

// --- Main Component ---

export const Work: React.FC = () => {
  return (
    <section
      id="work"
      data-section="motion-content"
      className="relative w-full bg-studio-bg"
    >
      {/* Centering Wrapper - defines horizontal origin */}
      <div className="w-full flex justify-center">
        {/* GPU Rendering Canvas - defines the compositing boundary */}
        <div className="w-full xl:w-[1280px]">

          {/* Docked Section Header - Left-Anchored Tab */}
          <div className="
            sticky
            top-[calc(var(--nav-height)-1rem)]
            z-40
            flex
            justify-start
            pointer-events-none
          ">
            <div className="
               editorial-surface
               border-l border-white/5
               px-6
               py-3
               flex
               items-center
               gap-4
               pointer-events-auto
            ">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-4">
                  <span className="font-syne text-xs tracking-widest text-gold/70 uppercase">[02] — SELECTED WORKS</span>
                  <h2 className="font-cormorant text-2xl md:text-3xl text-ivory leading-tight">Case Studies</h2>
                </div>
                <p className="font-body text-[10px] text-ivory/40">Select engagements are private, long-term, or under NDA.</p>
              </div>
            </div>
          </div>

          {/* Sticky Viewport - NO height constraints, NO overflow-hidden */}
          <div className="
            relative w-full
            lg:sticky lg:top-[var(--nav-height)]
          ">
            {/* 
              RAF-Based Infinite Carousels (Scroll-Independent)
              - Row A (medium): 28 px/sec, left direction
              - Row B (slow): 16 px/sec, right direction (counterflow)
              - Row C (fast): 44 px/sec, left direction
            */}
            <div className="flex flex-col gap-10 md:gap-14 lg:gap-16 xl:gap-24 w-full overflow-x-hidden pt-8 pb-[8vh] md:pb-[12vh] lg:pb-[16vh]">
              {/* Row A: Medium Speed (28 px/sec) → Left */}
              <InfiniteCarouselRow
                items={projects}
                speedPxPerSec={28}
                direction="left"
                slowDownOnHover={false}
                className="gap-4 md:gap-6 lg:gap-8 px-4 md:px-12 lg:px-24"
                renderItem={(project) => (
                  <div className="w-[80vw] md:w-[380px] lg:w-[480px] xl:w-[500px]">
                    <ProjectCard project={project} />
                  </div>
                )}
              />

              {/* Row B: Slow Speed (16 px/sec) → Right (Counterflow) */}
              <InfiniteCarouselRow
                items={projects}
                speedPxPerSec={16}
                direction="right"
                slowDownOnHover={false}
                className="gap-4 md:gap-6 lg:gap-8 px-4 md:px-12 lg:px-24"
                renderItem={(project) => (
                  <div className="w-[80vw] md:w-[380px] lg:w-[480px] xl:w-[500px]">
                    <ProjectCard project={project} />
                  </div>
                )}
              />

              {/* Row C: Fast Speed (44 px/sec) → Left */}
              <InfiniteCarouselRow
                items={projects}
                speedPxPerSec={44}
                direction="left"
                slowDownOnHover={false}
                className="gap-4 md:gap-6 lg:gap-8 px-4 md:px-12 lg:px-24"
                renderItem={(project) => (
                  <div className="w-[80vw] md:w-[380px] lg:w-[480px] xl:w-[500px]">
                    <ProjectCard project={project} />
                  </div>
                )}
              />
            </div>

            <div className="absolute bottom-12 right-12 hidden lg:block">
              <p className="font-syne text-xs tracking-widest text-ivory/20 uppercase">Drag to Explore</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};