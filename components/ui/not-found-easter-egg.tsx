'use client';

import React, { useRef } from 'react';
import { Mail } from 'lucide-react';
import { GameOfLifeBackground } from './game-of-life-background';

export function NotFoundEasterEgg() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center pt-48 pb-32 px-4">
      <GameOfLifeBackground containerRef={containerRef} />
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="space-y-4 text-center">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            You've Wandered into Uncharted Territory
          </h2>
          
          <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
            <p className="text-sm text-muted-foreground font-mono">
              {'>'}  Well done, explorer! You've discovered our secret <span className="font-bold text-[rgb(234,88,12)]">404 realm</span>.
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              {'>'}  While this page doesn't exist (yet), here's something special:
            </p>
            <div className="pl-4 border-l-2 border-primary/30">
              <p className="text-sm text-foreground">
                "Hey adventurer! Chris here. You've stumbled upon a path less traveled. 
                Got an idea for what should be here? I'd love to hear it!"
              </p>
            </div>
            <div className="flex items-center justify-center pt-4">
              <a 
                href="mailto:chris@rwai.xyz"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="font-mono">chris@rwai.xyz</span>
              </a>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-8">
            Plot twist: This page might exist in a parallel universe...
          </p>
        </div>
      </div>
    </div>
  );
} 