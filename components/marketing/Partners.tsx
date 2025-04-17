import React from 'react';
import Image from 'next/image';
import { UnderlinedText } from '../ui/underlined-text';

const partners = [
  { name: 'NVIDIA', logo: '/images/logo-nvidia-1.svg' },
  { name: 'HPE', logo: '/images/logo-hpe-1.svg' },
  { name: 'PNY', logo: '/images/logo-pny-1.svg' },
  { name: 'Intel', logo: '/images/logo-intel-1.svg' },
  { name: 'Dell', logo: '/images/logo-dell-1.svg' },
];

const Partners = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="tracking-tight text-3xl md:text-4xl mb-4 text-foreground relative inline-block">
            Custom Built for 
            <UnderlinedText>High Performance</UnderlinedText>
            <UnderlinedText>AI Compute</UnderlinedText>
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div 
              key={partner.name} 
              className="w-32 md:w-40 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners; 