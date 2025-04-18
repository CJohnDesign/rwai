import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
}

export function GradientText({ 
  children, 
  className = "",
  gradientFrom = "var(--cyan-500, #06b6d4)",
  gradientTo = "var(--primary, #3b82f6)",
  gradientAngle = 135
}: GradientTextProps) {
  return (
    <span 
      className={`inline-block font-medium ${className}`}
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        textShadow: '0 0 1px rgba(0, 0, 0, 0.05)'
      }}
    >
      {children}
    </span>
  );
} 