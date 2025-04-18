import React from 'react';

interface AccentGradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
  showUnderline?: boolean;
}

export function AccentGradientText({ 
  children, 
  className = "",
  gradientFrom = "var(--purple-500, #8b5cf6)", 
  gradientTo = "var(--pink-500, #ec4899)",
  gradientAngle = 45,
  showUnderline = true
}: AccentGradientTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        style={{
          background: `linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 500
        }}
      >
        {children}
      </span>
      {showUnderline && (
        <span 
          className="absolute -bottom-1 left-0 w-full h-1 -z-1"
          style={{
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            opacity: 0.8,
            borderRadius: '2px'
          }}
        ></span>
      )}
    </span>
  );
} 