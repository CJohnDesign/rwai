import React from 'react';
import { AccentGradientText } from './accent-gradient-text';

interface UnderlinedTextProps {
  children: React.ReactNode;
  className?: string;
}

export function UnderlinedText({ 
  children, 
  className = ""
}: UnderlinedTextProps) {
  // Use the new AccentGradientText component instead
  return (
    <AccentGradientText 
      className={className}
      gradientFrom="var(--purple-500, #8b5cf6)"
      gradientTo="var(--pink-500, #ec4899)"
      showUnderline={true}
    >
      {children}
    </AccentGradientText>
  );
}

// Export previous component name for backward compatibility
export const UnderlinedText = AccentGradientText; 