import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div 
      className={`backdrop-blur-md bg-white/60 border border-slate-200 rounded-2xl shadow-lg p-6 text-slate-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
