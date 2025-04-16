'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Quote {
  quote: string;
  author: string;
  title: string;
}

interface AnimatedQuoteProps {
  quotes: Quote[];
  autoRotate?: boolean;
  rotationInterval?: number;
}

export default function AnimatedQuote({ 
  quotes, 
  autoRotate = true,
  rotationInterval = 5000
}: AnimatedQuoteProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [isLineAnimating, setIsLineAnimating] = useState(false);
  const [lineAnimationMode, setLineAnimationMode] = useState<'entry' | 'idle' | 'exit'>('entry');
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchDirection, setTouchDirection] = useState<'left' | 'right' | null>(null);
  const lineOffsetRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineAnimationDuration = isMobile ? 1800 : 2000; // Slightly faster on mobile
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Adjust container height if needed based on content
      if (containerRef.current && isMobileView) {
        const contentHeight = containerRef.current.scrollHeight;
        if (contentHeight > containerRef.current.clientHeight) {
          containerRef.current.style.minHeight = `${contentHeight}px`;
        }
      }
    };
    
    // Check on initial load
    checkMobile();
    
    // Add resize listener with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Auto-rotate quotes
  useEffect(() => {
    if (autoRotate && !isPaused) {
      // Quote rotation
      intervalRef.current = setInterval(() => {
        if (!isAnimating) {
          const nextIndex = (currentQuoteIndex + 1) % quotes.length;
          changeQuote(nextIndex);
        }
      }, rotationInterval);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate, currentQuoteIndex, isAnimating, isPaused, quotes.length, rotationInterval]);
  
  // Split the current quote into words when the quote changes
  useEffect(() => {
    const currentQuote = quotes[currentQuoteIndex].quote;
    // Split by spaces but preserve markdown bold syntax
    setWords(currentQuote.split(/(\*\*[^*]+\*\*|\s+)/).filter(Boolean));
  }, [currentQuoteIndex, quotes]);
  
  // Initial line animation on mount
  useEffect(() => {
    // Start with entry animation
    setLineAnimationMode('entry');
    
    // After entry animation completes, switch to idle
    const timer = setTimeout(() => {
      setLineAnimationMode('idle');
    }, lineAnimationDuration);
    
    return () => clearTimeout(timer);
  }, [lineAnimationDuration]);
  
  // Handle quote transition
  const changeQuote = (index: number) => {
    if (isAnimating || index === currentQuoteIndex) return;
    
    setIsAnimating(true);
    
    // Start exit animation for lines
    setLineAnimationMode('exit');
    
    // Wait for exit animation, then change quote and start entry animation
    setTimeout(() => {
      setCurrentQuoteIndex(index);
      setLineAnimationMode('entry');
      
      // After entry animation completes, switch to idle
      setTimeout(() => {
        setLineAnimationMode('idle');
      setIsAnimating(false);
      }, lineAnimationDuration);
    }, lineAnimationDuration);
  };
  
  // Get unique line positions based on the current quote index
  const getLinePositions = (index: number) => {
    // Create different line position sets for each quote
    const positionSets = [
      // Position set for quote 0
      {
        lines: [
          { left: 0, width: isMobile ? 120 : 350, position: 'top' },
          { right: 0, width: isMobile ? 80 : 250, position: 'bottom' },
          { left: 0, width: isMobile ? 100 : 280, position: 'citation' }
        ]
      },
      // Position set for quote 1
      {
        lines: [
          { left: 0, width: isMobile ? 100 : 320, position: 'top' },
          { right: 0, width: isMobile ? 90 : 240, position: 'bottom' },
          { left: 0, width: isMobile ? 80 : 220, position: 'citation' }
        ]
      },
      // Position set for quote 2
      {
        lines: [
          { left: 0, width: isMobile ? 110 : 330, position: 'top' },
          { right: 0, width: isMobile ? 70 : 210, position: 'bottom' },
          { left: 0, width: isMobile ? 90 : 230, position: 'citation' }
        ]
      }
    ];
    
    // Use modulo to handle more quotes than position sets
    return positionSets[index % positionSets.length];
  };
  
  // Get current line positions
  const currentPositions = getLinePositions(currentQuoteIndex);
  
  // Get the highlight phrase for the current quote
  const getHighlightPhraseForQuote = (quoteText: string): string => {
    // Key phrases about AI growth and GPU demand to highlight
    const defaultPhrases = [
      "usage skyrocket",
      "exponentially more GPUs",
      "billions of users",
      "insanely large GPU fleet",
      "millions of customers in real time",
      "scale of compute that is almost unimaginable",
      "GPU capacities that dwarf today's clusters by several orders of magnitude",
      "no ceiling",
      "scaling GPU fleets by orders of magnitude",
      "hundreds or even thousands of times greater",
      "paradigm shift in scale",
      "dramatically more GPUs",
      "scaling our infrastructure by hundreds of times"
    ];
    
    // Find the first phrase that exists in the quote
    for (const phrase of defaultPhrases) {
      if (quoteText.toLowerCase().includes(phrase.toLowerCase())) {
        return phrase;
      }
    }
    
    // If no match, return empty string to avoid highlighting
    return "";
  };
  
  // Improved touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    setTouchDirection(null);
    setIsPaused(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const diffX = touchStartRef.current - touchX;
    const diffY = touchStartYRef.current - touchY;
    
    // Only handle horizontal swipes if the horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Determine swipe direction
      setTouchDirection(diffX > 0 ? 'left' : 'right');
      
      // Prevent default to avoid page scrolling during swipe
      e.preventDefault();
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isAnimating || !touchDirection) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    // Swipe detection for quote navigation - reduced minimum distance
    if (Math.abs(diff) > 30) { // Reduced from 50 to 30 for easier triggering
      if (diff > 0) {
        // Swipe left - next quote
        const nextIndex = (currentQuoteIndex + 1) % quotes.length;
        changeQuote(nextIndex);
      } else {
        // Swipe right - previous quote
        const prevIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
        changeQuote(prevIndex);
      }
    }
    
    // Reset touch direction
    setTouchDirection(null);
    
    // Small delay before resuming auto-rotation
    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };
  
  // Get line animation based on mode and position
  const getLineAnimation = (pos: any, isHorizontal: boolean = true) => {
    const axis = isHorizontal ? 'x' : 'y';
    const fromLeft = pos.left !== undefined;
    const range = isMobile ? 120 : 120; // Restore mobile range to match desktop
    
    switch (lineAnimationMode) {
      case 'entry':
        // Entry animation - from outside to center with smooth deceleration
        return {
          [axis]: fromLeft 
            ? [`-${range}%`, '0%'] 
            : [`${range}%`, '0%']
        };
      case 'exit':
        // Exit animation - from center to outside with rapid acceleration
        return {
          [axis]: fromLeft 
            ? ['0%', `-${range + 60}%`] 
            : ['0%', `${range + 60}%`]
        };
      case 'idle':
      default:
        // More noticeable idle animation with smooth transitions
        const idleRange = isMobile ? 1.5 : 3;
        return {
          [axis]: fromLeft 
            ? [`0%`, `${idleRange}%`, `-${idleRange}%`, `0%`] 
            : [`0%`, `-${idleRange}%`, `${idleRange}%`, `0%`]
        };
    }
  };
  
  
  // Get line animation transition based on mode
  const getLineTransition = (index: number, mode: 'entry' | 'idle' | 'exit') => {
    // Adjust timings for mobile
    const mobileFactor = isMobile ? 0.8 : 1;
    
    switch (mode) {
      case 'entry':
        return { 
          duration: (1.6 + index * 0.08) * mobileFactor, 
          ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier for smoother entry
          delay: index * 0.06 * mobileFactor
        };
      case 'exit':
        return { 
          duration: (1.8 + index * 0.05) * mobileFactor, // Even longer exit motion
          ease: [0.36, 0, 0.66, -0.56], // Dramatic ease-out with overshoot
          delay: index * 0.03 * mobileFactor // Faster staggering
        };
      case 'idle':
      default:
        // Reduce duration on mobile for better performance
        const baseDuration = isMobile ? 15 : 20;
        const increment = isMobile ? 1.5 : 2;
        return { 
          duration: baseDuration + index * increment, 
          ease: [0.37, 0, 0.63, 1], // pronounced ease-in-out for idle
          repeat: Infinity, 
          repeatType: "mirror" 
        };
    }
  };
  
  // Get opacity transition based on mode - separate from motion transition
  const getOpacityTransition = (mode: 'entry' | 'idle' | 'exit') => {
    switch (mode) {
      case 'entry':
        return {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1.0]
        };
      case 'exit':
        // Much faster opacity fade on exit - completes before motion ends
        return {
          duration: 0.3,
          ease: [0.36, 0, 0.66, -0.56]
        };
      default:
        return {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1.0]
        };
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full border-b border-gray-200 dark:border-gray-800 pb-12 sm:pb-16 mt-8 sm:mt-12 mb-12 sm:mb-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Visual swipe indicator for mobile */}
      {isMobile && touchDirection && (
        <div 
          className={`absolute inset-0 z-10 bg-gradient-to-${touchDirection === 'left' ? 'l' : 'r'} from-transparent via-transparent to-orange-500/10 pointer-events-none`}
          aria-hidden="true"
        />
      )}
      
      {/* Quote content with structured lines */}
      <div className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8 md:px-16 text-center">
        {/* Line 1: Top line from left, positioned lower */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`top-line-${currentQuoteIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={getOpacityTransition(lineAnimationMode)}
            className="absolute left-0 right-0 z-10"
            style={{ top: isMobile ? '60px' : '70px' }} // Moved lower
          >
            {currentPositions.lines
              .filter(line => line.position === 'top')
              .map((pos, i) => (
                <div 
                  key={`top-${i}`} 
                  className="absolute h-[3px] sm:h-[3px] overflow-visible"
                  style={{ 
                    left: pos.left !== undefined ? pos.left : 'auto', 
                    right: pos.right !== undefined ? pos.right : 'auto',
                  }}
                >
                  <div 
                    className="absolute h-full z-10"
                    style={{ 
                      left: pos.left !== undefined ? 0 : 'auto', 
                      right: pos.right !== undefined ? 0 : 'auto',
                      width: `${pos.width}px`
                    }}
                  >
                    <motion.div 
                      className="bg-orange-500 w-full h-full"
                      initial={{ x: pos.left !== undefined ? (isMobile ? '-120%' : '-120%') : (isMobile ? '120%' : '120%') }}
                      animate={getLineAnimation(pos)}
                      transition={getLineTransition(0, lineAnimationMode)}
                    />
                  </div>
                </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-orange-500 mb-3 sm:mb-4 md:mb-6">"</div>
        
        <div className="min-h-[200px] sm:min-h-[180px] md:min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuoteIndex}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-tight mb-4 sm:mb-6 md:mb-8 text-gray-900 dark:text-white max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: lineAnimationMode === 'exit' ? 0.3 : 0.8, 
                ease: lineAnimationMode === 'exit' ? [0.36, 0, 0.66, -0.56] : [0.25, 0.1, 0.25, 1.0]
              }}
            >
              {words.map((word, i) => {
                const isBold = word.startsWith('**') && word.endsWith('**');
                const displayWord = isBold ? word.slice(2, -2) : word;
                
                return (
                  <motion.span
                    key={`${currentQuoteIndex}-${i}`}
                    className="inline-block mx-[0.1rem] sm:mx-[0.15rem]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ 
                      duration: lineAnimationMode === 'exit' ? 0.3 : 0.6, 
                      delay: lineAnimationMode === 'entry' ? 0.6 + i * (isMobile ? 0.02 : 0.025) : i * (isMobile ? 0.01 : 0.015),
                      ease: lineAnimationMode === 'exit' ? [0.36, 0, 0.66, -0.56] : [0.25, 0.1, 0.25, 1.0]
                    }}
                  >
                    {isBold ? (
                      <span className="font-medium text-orange-500">{displayWord}</span>
                    ) : displayWord}
                  </motion.span>
                );
              })}
            </motion.p>
          </AnimatePresence>
        </div>
        
        {/* Line 2: Right line, positioned higher */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`bottom-line-${currentQuoteIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={getOpacityTransition(lineAnimationMode)}
            className="absolute left-0 right-0"
            style={{ bottom: isMobile ? '120px' : '140px' }} // Positioned higher
          >
            {currentPositions.lines
              .filter(line => line.position === 'bottom')
              .map((pos, i) => (
                <div 
                  key={`bottom-${i}`} 
                  className="absolute h-[2px] sm:h-1 overflow-visible"
                  style={{ 
                    left: pos.left !== undefined ? pos.left : 'auto', 
                    right: pos.right !== undefined ? pos.right : 'auto',
                  }}
                >
                  <div 
                    className="absolute h-full z-10"
                    style={{ 
                      left: pos.left !== undefined ? 0 : 'auto', 
                      right: pos.right !== undefined ? 0 : 'auto',
                      width: `${pos.width}px`
                    }}
                  >
                    <motion.div 
                      className="bg-orange-500 w-full h-full"
                      initial={{ x: pos.left !== undefined ? (isMobile ? '-120%' : '-120%') : (isMobile ? '120%' : '120%') }}
                      animate={getLineAnimation(pos)}
                      transition={getLineTransition(1, lineAnimationMode)}
                    />
                  </div>
                </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Line 3: Bottom left line, positioned lower */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`citation-line-${currentQuoteIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={getOpacityTransition(lineAnimationMode)}
            className="absolute left-0 right-0"
            style={{ bottom: isMobile ? '30px' : '35px' }} // Positioned lower
          >
            {currentPositions.lines
              .filter(line => line.position === 'citation')
              .map((pos, i) => (
                <div 
                  key={`citation-${i}`} 
                  className="absolute h-[2px] sm:h-1 overflow-visible"
                  style={{ 
                    left: pos.left !== undefined ? pos.left : 'auto', 
                    right: pos.right !== undefined ? pos.right : 'auto',
                  }}
                >
                  <div 
                    className="absolute h-full z-10"
                    style={{ 
                      left: pos.left !== undefined ? 0 : 'auto', 
                      right: pos.right !== undefined ? 0 : 'auto',
                      width: `${pos.width}px`
                    }}
                  >
                    <motion.div 
                      className="bg-orange-500 w-full h-full"
                      initial={{ x: pos.left !== undefined ? (isMobile ? '-120%' : '-120%') : (isMobile ? '120%' : '120%') }}
                      animate={getLineAnimation(pos)}
                      transition={getLineTransition(2, lineAnimationMode)}
                    />
                  </div>
                </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`attribution-${currentQuoteIndex}`}
            className="flex items-center justify-center space-x-3 sm:space-x-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: lineAnimationMode === 'exit' ? 0.3 : 0.6, 
              delay: lineAnimationMode === 'entry' ? 1.0 : 0.02,
              ease: lineAnimationMode === 'exit' ? [0.36, 0, 0.66, -0.56] : [0.25, 0.1, 0.25, 1.0]
            }}
          >
            <div className="h-px w-8 sm:w-12 bg-gray-300 dark:bg-gray-700"></div>
            <div>
              <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{quotes[currentQuoteIndex].author}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{quotes[currentQuoteIndex].title}</p>
            </div>
            <div className="h-px w-8 sm:w-12 bg-gray-300 dark:bg-gray-700"></div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation indicators - now showing on both mobile and desktop */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-3">
        {quotes.map((_, i) => (
          <button
            key={`nav-${i}`}
            className={`w-2.5 h-2.5 rounded-full ${i === currentQuoteIndex ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'} touch-manipulation`}
            onClick={() => changeQuote(i)}
            aria-label={`Go to quote ${i + 1}`}
            aria-current={i === currentQuoteIndex ? 'true' : 'false'}
          />
        ))}
      </div>
      
      {/* Mobile swipe hint - shows briefly on component mount */}
      {isMobile && (
        <motion.div 
          className="absolute inset-x-0 bottom-10 flex justify-center items-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.1, 0.9, 1], delay: 1 }}
        >
          <div className="bg-gray-800/70 dark:bg-gray-200/20 text-white dark:text-gray-200 px-3 py-1.5 rounded-full text-xs flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Swipe to navigate</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
} 