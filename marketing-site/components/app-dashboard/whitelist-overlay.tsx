"use client";

import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMainUrl } from "../../lib/url-utils";

// Countdown Timer Component
function CountdownTimer() {
  // Set launch date to May 20, 2025
  const launchDate = new Date("May 20, 2025").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    let animationFrameId: number;
    let lastUpdateTime = 0;
    
    const updateCountdown = (timestamp: number) => {
      // Only update the state every second (1000ms) to reduce rendering
      if (timestamp - lastUpdateTime >= 1000 || lastUpdateTime === 0) {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        if (distance < 0) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
        
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        
        lastUpdateTime = timestamp;
      }
      
      animationFrameId = requestAnimationFrame(updateCountdown);
    };
    
    // Start the animation frame loop
    animationFrameId = requestAnimationFrame(updateCountdown);
    
    return () => {
      // Clean up the animation frame when component unmounts
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="grid grid-cols-4 gap-1 sm:gap-2 my-4">
      <div className="bg-muted/30 rounded-lg p-1 sm:p-2 text-center">
        <div className="text-base sm:text-xl font-bold">{timeLeft.days}</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground">Days</div>
      </div>
      <div className="bg-muted/30 rounded-lg p-1 sm:p-2 text-center">
        <div className="text-base sm:text-xl font-bold">{timeLeft.hours}</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground">Hours</div>
      </div>
      <div className="bg-muted/30 rounded-lg p-1 sm:p-2 text-center">
        <div className="text-base sm:text-xl font-bold">{timeLeft.minutes}</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground">Minutes</div>
      </div>
      <div className="bg-muted/30 rounded-lg p-1 sm:p-2 text-center">
        <div className="text-base sm:text-xl font-bold">{timeLeft.seconds}</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground">Seconds</div>
      </div>
    </div>
  );
}

interface WhitelistOverlayProps {
  topOffset?: string; // Optional prop to control the top offset of the overlay
}

export function WhitelistOverlay({ topOffset = "top-0 md:top-[70px]" }: WhitelistOverlayProps) {
  // Add useEffect to disable scrolling when overlay is mounted
  useEffect(() => {
    // Store the original overflow value
    const originalOverflow = document.body.style.overflow;
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className={`fixed inset-0 ${topOffset} z-40 bg-gradient-to-br from-white/80 to-gray-100/90 dark:from-black/70 dark:to-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300`}>
      <div className="bg-card/98 border border-border/50 rounded-xl max-w-md w-full p-4 sm:p-8 shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-500 delay-150 relative mt-[-5vh] mx-auto overflow-y-auto max-h-[90vh]">
        <div className="text-center flex flex-col gap-4 sm:gap-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Join the Future of Tokenized AI</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Be part of the revolution in AI infrastructure. Join our whitelist to access exclusive tokenized AI resources and early investment opportunities.
          </p>
          
          <div>
            <p className="text-sm font-medium mb-2">Whitelist closes in:</p>
            <CountdownTimer />
          </div>
          
          <div className="space-y-2 sm:space-y-3 -mt-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-left">
              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] sm:text-xs text-primary font-medium">1</span>
              </div>
              <p>Access to tokenized AI compute resources</p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-left">
              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] sm:text-xs text-primary font-medium">2</span>
              </div>
              <p>Early investment in AI infrastructure tokens</p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-left">
              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] sm:text-xs text-primary font-medium">3</span>
              </div>
              <p>Exclusive governance rights in the RWAi ecosystem</p>
            </div>
          </div>
          
          <Link 
            href={getMainUrl('whitelist')}
            rel="noopener noreferrer"
          >
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Join the Whitelist
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground">
            Limited spots available. Secure your position in the future of decentralized AI infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
} 