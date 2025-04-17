import React from 'react';

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
  return (
    <span 
      className={`inline leading-[1.4] ${className}`}
      style={{
        background: 'transparent',
        boxShadow: `0.25em 0 0 ${highlightColor}, -0.25em 0 0 ${highlightColor}`,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
        backgroundColor: highlightColor,
        paddingTop: '0.1em',
        paddingBottom: '0.1em'
      }}
    >
      {children}
    </span>
  );
} 