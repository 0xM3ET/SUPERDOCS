"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-lg bg-gradient-to-br from-indigo-500 border border-white/20 transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};