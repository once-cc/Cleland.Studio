import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  number, 
  title, 
  subtitle,
  align = 'left',
  className = ''
}) => {
  const alignment = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  return (
    <div className={`flex flex-col gap-6 mb-16 ${alignment[align]} ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 font-syne text-xs font-bold tracking-widest text-gold uppercase"
      >
        <span>[{number}]</span>
        <div className="h-[1px] w-12 bg-gold/50"></div>
        <span>{title}</span>
      </motion.div>
      
      {subtitle && (
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-ivory font-light leading-tight max-w-3xl"
        >
          {subtitle}
        </motion.h2>
      )}
    </div>
  );
};