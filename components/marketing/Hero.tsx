"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { ShaderCanvas } from '../shaders/ShaderCanvas';
import Inference from '../d3/Inference';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full bg-transparent overflow-hidden">
      <div className="absolute inset-0">
        <ShaderCanvas />
      </div>
      
      {/* Main Content Grid */}
      <div className="container grid grid-cols-1 lg:grid-cols-12 lg:gap-16 relative z-2 h-full">
        {/* Left Column - All Content */}
        <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center space-y-4 order-2 lg:order-1 mt-8 lg:mt-0">
          <h1 className="tracking-tight animate-slide-up font-normal">
            <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-100 leading-tight">
              Decentralizing
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-100 leading-tight">
              Ownership of
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 leading-tight">
              AI Infrastructure
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-300 dark:via-pink-400 dark:to-red-400 leading-tight">
              with RWA Tokenization
            </span>
          </h1>

          <div className="animate-fade-in animation-delay-200">
            <p className="hidden lg:block text-lg md:text-xl text-gray-100 leading-relaxed mb-4">
              RWAi is the only platform where anyone can access, own, and earn passive income from state-of-the-art AI Rigs that run top open-source models.
            </p>

            <div>
              <Button 
                asChild 
                size="lg" 
                variant="default"
                className={cn(
                  "group relative overflow-hidden bg-gray-900/80 text-white hover:bg-gray-800 dark:bg-gray-800/80 dark:hover:bg-gray-700",
                  "transition-all duration-300 ease-out shadow-md hover:shadow-lg backdrop-blur-sm"
                )}
              >
                <a href="#models" className="px-8 flex items-center gap-1">
                  <span className="relative z-10">Learn More</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Force Graph */}
        <div className="lg:col-span-7 flex items-center justify-center w-full order-1 lg:order-2 mt-20 lg:mt-0">
          <div className="relative w-[400px] sm:w-[500px] lg:w-[600px]">
            <Inference />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;