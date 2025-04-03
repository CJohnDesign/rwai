"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
// import { ShaderCanvas } from '../shaders/ShaderCanvas';
import { HeroForceGraph } from './d3-force-graph/components/hero-force-graph';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col bg-transparent overflow-hidden">
      {/* <div className="absolute inset-0">
        <ShaderCanvas />
      </div> */}
      
      {/* Main Content Grid */}
      <div className="container flex-1 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-16 relative z-10 py-12 lg:py-16">
        {/* Left Column - All Content */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Typography & Headings */}
          <div className="space-y-4 mt-12 lg:mt-0">
            <h1 className="tracking-tight animate-slide-up font-normal">
              <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-100 leading-tight">
                Decentralizing
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-100 leading-tight">
                Ownership of
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 leading-tight">
                AI Infrastructure
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-700 leading-tight">
                with RWA Tokenization
              </span>
            </h1>
          </div>

          {/* Content Section */}
          <div className="animate-fade-in animation-delay-200 space-y-6">
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              RWAi is the first platform where anyone can access, own, and earn passive income from state-of-the-art AI Rigs that run top open-source models like DeepSeek & Llama, delivering inference and other AI optimized compute services to a high demand market.
            </p>
            
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              By 2028, the AI infrastructure market is expected to reach $1 trillion, RWAi is positioned to capture this explosive growth.
            </p>

            <div className="pt-4">
              <Button 
                asChild 
                size="lg" 
                variant="default"
                className={cn(
                  "group relative overflow-hidden bg-gray-900/80 text-white hover:bg-gray-800 dark:bg-gray-800/80 dark:hover:bg-gray-700",
                  "transition-all duration-300 ease-out shadow-md hover:shadow-lg backdrop-blur-sm"
                )}
              >
                <a href="#models" className="py-6 px-8 flex items-center gap-2">
                  <span className="relative z-10">Learn More</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Force Graph */}
        <div className="relative hidden lg:block">
          {mounted && (
            <div className="absolute inset-0">
              <HeroForceGraph className="animate-fade-in animation-delay-300" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;