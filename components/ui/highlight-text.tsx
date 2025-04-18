import React from 'react';
import { GradientText } from './gradient-text';

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
}

export function HighlightText({ 
  children, 
  className = "",
  highlightColor = "var(--primary)"
}: HighlightTextProps) {
  // Use the new GradientText component instead
  return (
    <GradientText 
      className={className}
      gradientFrom="var(--cyan-500, #06b6d4)"
      gradientTo="var(--primary, #3b82f6)"
    >
      {children}
    </GradientText>
  );
}

// Export previous component name for backward compatibility
export const HighlightText = GradientText; 