'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThreeFiberHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
        {/* Left Column - Typography & Headings */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="tracking-tight animate-slide-up">
            <span className="block text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Decentralizing
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              The Future of
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#6600ff] to-[#ff33cc] leading-tight">
              AI Infrastructure
            </span>
          </h1>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col justify-center space-y-8 animate-fade-in animation-delay-200">
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Experience the elegance of React's component model applied to 3D graphics. Build complex scenes declaratively using familiar React patterns and hooks.
            </p>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Seamlessly integrate your 3D visualizations with React's ecosystem while maintaining the full power of Three.js under the hood.
            </p>

            <div className="pt-4">
              <Button 
                asChild 
                size="lg" 
                className={cn(
                  "group relative overflow-hidden bg-[#6600ff] text-white hover:bg-[#5500cc]",
                  "transition-all duration-300 ease-out shadow-md hover:shadow-lg"
                )}
              >
                <a href="#features" className="py-6 px-8 flex items-center gap-2">
                  <span className="relative z-10">Explore Features</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 