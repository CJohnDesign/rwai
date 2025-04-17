import React from 'react';

interface UnderlinedTextProps {
  children: React.ReactNode;
  className?: string;
}

export function UnderlinedText({ children, className = "" }: UnderlinedTextProps) {
  return (
    <span className={`relative mx-2 ${className}`}>
      {children}
      <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary -z-1"></span>
    </span>
  );
} 