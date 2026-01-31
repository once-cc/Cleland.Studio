import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon = true,
  className = '',
  ...props
}) => {
  const baseStyles = "group inline-flex items-center justify-center gap-2 px-8 py-4 font-syne text-xs font-bold uppercase tracking-widest leading-none transition-all duration-500 ease-studio overflow-hidden";

  const variants = {
    primary: "bg-gold text-studio-bg hover:bg-white",
    ghost: "bg-transparent text-ivory hover:text-gold",
    outline: "border border-ivory/20 text-ivory hover:border-gold hover:text-gold"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-500 ease-studio group-hover:-translate-y-1 group-hover:translate-x-1" />
      )}
    </button>
  );
};