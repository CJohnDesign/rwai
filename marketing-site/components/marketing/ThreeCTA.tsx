'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThreeCTA() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Transform Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6600ff] to-[#ff33cc] mt-2">
              AI Infrastructure?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join us in revolutionizing AI infrastructure management with our cutting-edge platform powered by Three.js visualizations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className={cn(
                "group relative overflow-hidden bg-[#6600ff] text-white hover:bg-[#5500cc]",
                "transition-all duration-300 ease-out shadow-md hover:shadow-lg w-full sm:w-auto"
              )}
            >
              <a href="#" className="py-6 px-8 flex items-center gap-2 justify-center">
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className={cn(
                "group relative overflow-hidden border-[#6600ff] text-[#6600ff] hover:bg-[#6600ff]/10",
                "transition-all duration-300 ease-out w-full sm:w-auto"
              )}
            >
              <a href="#" className="py-6 px-8 flex items-center gap-2 justify-center">
                <span className="relative z-10">Learn More</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-[#9933ff] mb-2">24/7</h3>
              <p className="text-gray-300">Real-time monitoring and visualization</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-[#9933ff] mb-2">100%</h3>
              <p className="text-gray-300">Decentralized infrastructure management</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-[#9933ff] mb-2">10x</h3>
              <p className="text-gray-300">Better infrastructure insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 