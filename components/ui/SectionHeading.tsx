import React from 'react';

interface SectionHeadingProps {
  title: string;
  highlightedText?: string;
  prefix?: string;
  subtitle?: string;
  className?: string;
  gradientDirection?: 'horizontal' | 'diagonal';
}

const SectionHeading = ({ 
  title, 
  highlightedText, 
  prefix = '', 
  subtitle = '',
  className = '',
  gradientDirection = 'horizontal'
}: SectionHeadingProps) => {
  // If no highlighted text, just render the title
  if (!highlightedText) {
    return (
      <div className={`text-center mb-16 ${className}`}>
        <h2 className="text-3xl md:text-5xl mb-6">
          {prefix && <span>{prefix} </span>}
          {title}
        </h2>
        {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
      </div>
    );
  }
  
  // Determine gradient class based on direction
  const gradientClass = gradientDirection === 'diagonal' 
    ? 'chaos-strike' 
    : 'gradient-text gradient-orange';
  
  // Replace the highlighted text with a span
  const parts = title.split(highlightedText);
  
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-5xl mb-6">
        {prefix && <span>{prefix} </span>}
        {parts[0]}
        <span className={gradientClass}>
          {highlightedText}
        </span>
        {parts[1] || ''}
      </h2>
      {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading; 