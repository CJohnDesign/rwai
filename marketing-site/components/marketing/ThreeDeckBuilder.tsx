'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThreeDeckBuilder() {
  return (
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
      <div className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Start Building Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6600ff] to-[#ff33cc]">
            AI Infrastructure
          </span>{' '}
          Portfolio Today
        </h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Ready to Generate{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33ccff] to-[#6600ff]">
            Passive Income
          </span>?
        </h3>
        <p className="text-xl text-gray-300 mt-6">
          Join thousands of investors who are already earning returns from the growing AI compute market.
          Own a piece of enterprise-grade AI infrastructure and let us handle the technical details.
        </p>
        <div className="pt-8">
          <Button 
            asChild 
            size="lg" 
            className={cn(
              "group relative overflow-hidden bg-gradient-to-r from-[#6600ff] to-[#ff33cc]",
              "hover:from-[#5500cc] hover:to-[#ff1ab3]",
              "transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
            )}
          >
            <a href="#start-building" className="py-6 px-8 flex items-center gap-2">
              <span className="relative z-10">Start Investing Now</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
} 