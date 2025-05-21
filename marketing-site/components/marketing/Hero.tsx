"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  // Safe client-side theme detection
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full pt-24 pb-16 lg:pt-32 lg:pb-24 flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Main Content Grid */}
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10 mb-12">
        {/* Left Column - Typography & Headings */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="tracking-tight animate-slide-up font-normal">
            <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-gray-200 leading-tight">
              Decentralizing
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-gray-200 leading-tight">
              Ownership of
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 leading-tight">
              AI Infrastructure
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-300 dark:via-pink-400 dark:to-red-400 leading-tight">
              with RWA Tokenization
            </span>
          </h1>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col justify-center space-y-8 animate-fade-in animation-delay-200">
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              RWAi is the first platform where anyone can purchase fractional
              ownership and earn passive yield from tokenized AI GPU rigs that
              run top open-source models like DeepSeek and Llama at state of the
              art AI data centers delivering inference and other AI compute
              services.
            </p>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              By 2028, the AI infrastructure market is expected to reach $1
              trillion, RWAi is positioned to capture this explosive growth.
            </p>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                variant="default"
                className={cn(
                  "group relative overflow-hidden bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700",
                  "transition-all duration-300 ease-out shadow-md hover:shadow-lg"
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
      </div>

      {/* Bottom GPU Image */}
      <div className="w-full container px-4 md:px-6 mt-4">
        <div className="relative w-full h-[300px] lg:h-[400px]">
          <Image
            src="/images/RWAi_00060_.png"
            alt="AI GPU Infrastructure"
            fill
            priority
            className="object-cover object-center rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
