'use client';

import React from 'react';
import { ArrowRightIcon, ArrowDownIcon, ArrowLeftIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

const BusinessModelSection: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 py-16">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        {/* Two-column layout for top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left column - Text content */}
          <div>
            <h2 className="text-3xl font-bold mb-6 font-sora text-gray-900 dark:text-white">Business Model Overview</h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                RWAi revolutionizes hardware acquisition through fractional ownership of high-performance GPU servers (e.g., with NVIDIA RTX5090, H100, H200, Blackwells). Investors purchase fractions of the server and lease it back to the network for full life-cycle management and optimization.
              </p>
            </div>
          </div>
          
          {/* Right column - 2x2 Clockwise Flowchart */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* 2x2 Grid Layout */}
              <div className="grid grid-cols-2 grid-rows-2 h-full gap-4">
                {/* Step 1: Top Left */}
                <div className="relative">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-3 h-full flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">1. Fractional Ownership</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Investors purchase fractions of GPU servers</p>
                  </div>
                  {/* Right Arrow */}
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-orange-500 z-10">
                    <ArrowRightIcon className="h-5 w-5" />
                  </div>
                </div>
                
                {/* Step 2: Top Right */}
                <div className="relative">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-3 h-full flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">2. Lease Back</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Hardware is leased back to the RWAi network</p>
                  </div>
                  {/* Down Arrow */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-orange-500 z-10">
                    <ArrowDownIcon className="h-5 w-5" />
                  </div>
                </div>
                
                {/* Step 4: Bottom Left */}
                <div className="relative">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-3 h-full flex flex-col justify-center border border-orange-500">
                    <h3 className="text-sm font-bold text-orange-500">4. USDC Yield</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Investors receive ongoing yield in USDC</p>
                  </div>
                  {/* Up Arrow */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-orange-500 z-10">
                    <ArrowUpIcon className="h-5 w-5" />
                  </div>
                </div>
                
                {/* Step 3: Bottom Right */}
                <div className="relative">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-3 h-full flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">3. Network Operation</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">RWAi manages and optimizes the hardware</p>
                  </div>
                  {/* Left Arrow */}
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-orange-500 z-10">
                    <ArrowLeftIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-6 font-sora text-gray-900 dark:text-white">A Vertically Integrated Ecosystem: Hardware and Software</h3>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            In addition to fractionalizing best in class hardware, we run a custom software stack to provide our AI compute users with next-generation compute orchestration to optimize AI and cloud computing workloads. Its core features include:
          </p>
          
          {/* Two-column layout for bullet points on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <strong className="text-gray-900 dark:text-white">GPU Access and AI Datacenters:</strong>
                <p className="mt-2">High-end GPU and CPUs placed in cutting edge AI datacenters to handle complex AI workloads and energy demand. These scarce resources and placements are currently very difficult to attain without deeply curated relationships.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <strong className="text-gray-900 dark:text-white">LLM Model Execution:</strong>
                <p className="mt-2">Efficient inference execution for AI apps and users of open-source LLM models (ex: DeepSeek, Llama, Flux, etc) across GPU clusters, supporting high concurrency via sharded model weight architecture.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm md:hidden">
                <strong className="text-gray-900 dark:text-white">Formation Marketplace: Model Fine-Tuning:</strong>
                <p className="mt-2">Tools for users to fine-tune and deploy AI models, earning royalties when others use them — a unique revenue-sharing feature for AI developers. We are very uniquely positioned to become a market leader in this cutting edge sector to create an additional source of revenue and growth.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <strong className="text-gray-900 dark:text-white">GPU Rentals: Virtual Private Servers (VPS):</strong>
                <p className="mt-2">Linux-based VPS with automated replication and fail-over, ensuring 100% uptime for applications like web hosting and AI training for AI builders and enterprises with high and consistent demands.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <strong className="text-gray-900 dark:text-white">Optimization Layer:</strong>
                <p className="mt-2">A custom cutting edge orchestration layer optimizes distribution & resource use, provides security and tracing (metrics & logging), and more.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hidden md:block">
                <strong className="text-gray-900 dark:text-white">Formation Marketplace: Model Fine-Tuning:</strong>
                <p className="mt-2">Tools for users to fine-tune and deploy AI models, earning royalties when others use them — a unique revenue-sharing feature for AI developers. We are very uniquely positioned to become a market leader in this cutting edge sector to create an additional source of revenue and growth.</p>
              </div>
            </div>
          </div>
          
          <p className="mt-6">
            The RWAi vertically integrated ecosystem is built to operate next generation AI compute while creating a competitive advantage and moat on both the software and infrastructure stacks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelSection; 