import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Whitelist = () => {
  return (
    <section id="whitelist" className="relative py-24 bg-[#000414] dark:bg-[#000414]">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            
            <h2 className="text-3xl md:text-5xl leading-tight animate-slide-up text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
                Fractional Ownership of GPU Infrastructure
              </span>
            </h2>
            
            <p className="text-lg text-gray-200 animate-slide-up animation-delay-200">
              RWAi is the first platform where anyone can purchase fractional ownership and earn passive income from tokenized AI GPU rigs that run top open-source models like DeepSeek and Llama at state of the art AI data centers.
            </p>
            
            <p className="text-lg text-gray-200 animate-slide-up animation-delay-300">
              By delivering inference and other AI optimized compute services to the rapidly growing AI market, our vertically integrated business model monetizes AI workload to create a rapid scaling ecosystem free from traditional high-capital-expenditure constraints, while generating an ongoing yield paid in USDC to our $RWAi token holders.
            </p>
          </div>
          
          <div className="lg:ml-auto lg:max-w-md">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl animate-slide-up animation-delay-400">
              <h3 className="text-xl mb-4 text-gray-900 dark:text-white">$RWAi Whitelist</h3>
              <h4 className="text-2xl mb-6 text-gray-900 dark:text-white">Tokenizing Enterprise-Grade GPUs and Their Cash Flow</h4>
              
              <div className="mb-4 text-gray-900 dark:text-white">Fractionalized into the $RWAi Token</div>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Each High-Performance RIG is fractionalized into $RWAi Tokens on Ethereum mainnet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Real yield in USDC from AI compute and inference is distributed to token holders on a weekly basis.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Plus additional ecosystem partner opportunities for $RWAi token holders.</span>
                </li>
              </ul>
              
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                <Link href="/whitelist">
                  Join Our Whitelist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whitelist; 