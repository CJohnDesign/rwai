'use client';

import React from 'react';
import Image from 'next/image';

// GPU data with specifications
const gpuData = [
  {
    id: 'h100',
    name: 'NVIDIA HGX H100',
    specs: '80GB 700W SXM5',
    image: '/images/GPU_H100-SGX.png',
    architecture: 'Hopper',
    memory: '80GB HBM3',
    performance: 'Up to 4 petaFLOPS AI performance',
    tdp: '700W'
  },
  {
    id: 'h200',
    name: 'NVIDIA HGX H200',
    specs: '141GB 700W SXM5',
    image: '/images/GPU_H200-SGX.png',
    architecture: 'Hopper',
    memory: '141GB HBM3e',
    performance: 'Up to 4.8 petaFLOPS AI performance',
    tdp: '700W'
  },
  {
    id: 'gb200',
    name: 'NVIDIA GB200 NVL72',
    specs: 'Blackwell',
    image: '/images/GPU_gb200-nvl4.png',
    architecture: 'Blackwell',
    memory: '192GB HBM3e',
    performance: 'Up to 20 petaFLOPS AI performance',
    tdp: '1000W'
  },
  {
    id: 'rtx5090',
    name: 'GeForce RTX 5090',
    specs: 'NVIDIA Series',
    image: '/images/GPU_RTX-5090-PNY.png',
    architecture: 'Blackwell',
    memory: '32GB GDDR7',
    performance: 'Up to 1.5 petaFLOPS AI performance',
    tdp: '450W'
  }
];

const TokenSaleSection: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray-950 dark:bg-white text-white dark:text-gray-900 py-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 font-sora text-white dark:text-gray-900">Token Sale Structure</h2>
          
          <div className="prose prose-lg prose-invert dark:prose-gray max-w-none">
            <p className="mb-6 text-gray-200 dark:text-gray-600">
              RWAi is the first platform where anyone can purchase fractional ownership and earn passive income from state-of-the-art AI Rigs. This is accomplished through a sale-lease back model to the RWAi network. This model allows for tokenization of the ownership of cutting edge AI rigs, which are managed at state of the art AI data centers. The $RWAi token is not designed to be a highly volatile asset, but rather to designate ownership stake to pass through USDC yield to on-chain token holders.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-white dark:text-gray-900">Token Sale Details:</h3>
            <h2 className="text-5xl font-sora font-light mb-6 bg-gradient-to-r from-white to-orange-300 dark:from-gray-900 dark:to-orange-500 bg-clip-text text-transparent">$RWAi</h2>
            
            <p className="mb-4 text-gray-200 dark:text-gray-600">
              The initial funds raised will purchase fractional shares in the following rigs:
            </p>
            
            {/* GPU Cards - 4 across on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {gpuData.map((gpu) => (
                <div key={gpu.id} className="bg-gray-800/80 dark:bg-gray-100/80 rounded-lg overflow-hidden shadow-lg flex flex-col">
                  {/* GPU Image */}
                  <div className="relative h-48 w-full bg-black dark:bg-white">
                    <Image 
                      src={gpu.image} 
                      alt={gpu.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  {/* GPU Details */}
                  <div className="p-4 flex-grow">
                    <h4 className="text-lg font-bold mb-2 text-white dark:text-gray-900">{gpu.name}</h4>
                    <p className="text-sm text-orange-400 dark:text-orange-600 mb-3">{gpu.specs}</p>
                    
                    <div className="space-y-2 text-gray-200 dark:text-gray-600 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 dark:text-gray-500">Architecture:</span>
                        <span>{gpu.architecture}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 dark:text-gray-500">Memory:</span>
                        <span>{gpu.memory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 dark:text-gray-500">TDP:</span>
                        <span>{gpu.tdp}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Badge */}
                  <div className="bg-gray-900/80 dark:bg-gray-200/80 p-3 text-xs text-center text-gray-300 dark:text-gray-600">
                    {gpu.performance}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800/80 dark:bg-gray-100/80 rounded-lg p-4 shadow-lg">
                <h4 className="text-lg font-bold mb-2 text-white dark:text-gray-900">$RWAi Token</h4>
                <p className="text-gray-200 dark:text-gray-600">The $RWAi token will be generated on Ethereum mainnet as an ERC-20, all yield will generate as USCD ERC-20.</p>
              </div>
              
              <div className="bg-gray-800/80 dark:bg-gray-100/80 rounded-lg p-4 shadow-lg">
                <h4 className="text-lg font-bold mb-2 text-white dark:text-gray-900">Yield Representations</h4>
                <p className="text-gray-200 dark:text-gray-600">Investors receive 90% of the net operating income generated by the AI rigs which is distributed on a pro-rata basis.</p>
              </div>
              
              <div className="bg-gray-800/80 dark:bg-gray-100/80 rounded-lg p-4 shadow-lg">
                <h4 className="text-lg font-bold mb-2 text-white dark:text-gray-900">Pro-Rata $RWAi Rights</h4>
                <p className="text-gray-200 dark:text-gray-600">For future sales as we expand operations, token holders will have the right to continue to purchase their pro-rate percentage of all new $RWAi offerings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fundraising & Deployment Timeline Section */}
      <div className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 font-sora">Fundraising & Deployment Timeline</h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Our approach leverages a phased fundraising and deployment strategy:
            </p>
            
            <div className="space-y-10">
              {/* Timeline Item 1 */}
              <div className="relative pl-6 md:pl-6 border-l-2 border-orange-400 ml-2 md:ml-8">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-950"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 font-sora">Pilot Infrastructure <span className="text-orange-500 font-normal">(March 25)</span></h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The RWAi team has completed the initial acquisition of $1,625,000.00 of fully purchased GPU hardware and rig components to deploy our pilot clusters and run live compute orchestration with our early adoptor client base. This phase validates performance and provides an MVP for future customers.
                </p>
              </div>
              
              {/* Timeline Item 2 */}
              <div className="relative pl-6 md:pl-6 border-l-2 border-orange-400 ml-2 md:ml-8">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-950"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 font-sora">Beta Portal Live and $RWAi Token Sale <span className="text-orange-500 font-normal">(April - May 2025)</span></h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To showcase our vertically integrated AI infrastructure, in April 2025 we will open beta access to our AI compute and inference marketplace. During this phase, our infrastructure will be fully operational with state-of-the-art LLMs for users and investors to analyze. Post Beta launch, we will open our initial $RWAi token sale with a hard cap of a $25,000,000 USDC purchase. This capital will purchase the additional NVIDIA GPUs & rigs. The closing date on this sale is projected to be May 15, 2025.
                </p>
              </div>
              
              {/* Timeline Item 3 */}
              <div className="relative pl-6 md:pl-6 border-l-2 border-orange-400 ml-2 md:ml-8">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-950"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 font-sora">Full Deployment of Infrastructure and $RWAi Claim <span className="text-orange-500 font-normal">(June 2025)</span></h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Full deployment completed of the new clusters in higher performance AI multiple datacenters across. In addition, our software stack comes out of Beta for public launch. During the start of this phase all $RWAi tokens will be claimable with yield payment to begin on a weekly basis.
                </p>
              </div>
              
              {/* Timeline Item 4 */}
              <div className="relative pl-6 md:pl-6 border-l-2 border-orange-400 ml-2 md:ml-8">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-950"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 font-sora">Scale-Up with Demand <span className="text-orange-500 font-normal">(Q3+)</span></h3>
                <p className="text-gray-700 dark:text-gray-300">
                  As utilization approaches capacity (around 70%–80%), we trigger the next purchase order for additional GPU acquisitions. All $RWAi token holders reserve first right to all additional sales on a pro-rata basis. Only unpurchased additional allocation will be available to the public.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  The phased approach ensures each expansion is justified by actual revenue and utilization, while our exclusive MSP partnership allows temporary scale by tapping into latent resources from their enterprise customers during demand surges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenSaleSection; 