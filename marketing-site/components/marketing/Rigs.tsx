import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';

const Rigs = () => {
  return (
    <section id="rigs" className="py-24 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Decentralizing Ownership of AI Infrastructure with RWA Tokenization"
          highlightedText="AI Infrastructure with RWA Tokenization"
          gradientDirection="diagonal"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-600/10 rounded-3xl animate-pulse animation-duration-4000" />
            <div className="relative w-full h-full overflow-hidden rounded-3xl">
              <Image
                src="/images/RWAi_00060_.png"
                alt="AI Rig"
                width={1200}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary animate-fade-in">
              Dell XE9680 with 8 H100 GPUs
            </div>
            
            <h3 className="text-2xl md:text-3xl leading-tight animate-slide-up">
              High-Performance AI Rigs for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-700">
                Passive Income
              </span>
            </h3>
            
            <p className="text-lg text-muted-foreground animate-slide-up animation-delay-200">
              Each AI rig is tokenized into AI Compute Tokens (ACTs), allowing fractional ownership and weekly USDC distributions from AI compute and inference revenue.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">8x NVIDIA H100 GPUs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">2x Intel Xeon CPUs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">2TB RAM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">100TB NVMe Storage</span>
              </div>
            </div>
            
            <Button asChild className="animate-slide-up animation-delay-400">
              <Link href="/whitelist">
                Join Whitelist
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rigs; 