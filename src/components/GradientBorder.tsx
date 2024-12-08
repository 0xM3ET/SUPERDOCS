import React from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBorder({ children, className = '' }: GradientBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/30 transition-all duration-500 animate-border-shine" />
      <div className="relative h-full rounded-xl border border-gray-800 bg-[#0F0F0F]">
        {children}
      </div>
    </div>
  );
}