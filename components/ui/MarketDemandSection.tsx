'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the chart component with dynamic import to avoid SSR issues with D3
const InferenceGrowthChart = dynamic(
  () => import('./InferenceGrowthChart'),
  { ssr: false }
);

const MarketDemandSection: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 font-sora text-gray-900 dark:text-white">Market Demand</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p className="mb-4">
                To grasp the future trajectory of AI, it is essential to first evaluate the current landscape of compute demand. As of today there are roughly 2 billion inference requests per day querying AI LLM models. With AI-powered users and applications proliferating across every industry, it is projected that global inference requests will grow by a 1,000-fold increase in daily inference requests, completely overwhelming the existing GPU infrastructure.
              </p>
              <p className="mb-4">
                According to estimates, meeting such demand with hardware alone would necessitate on the order of $6 trillion worth of NVIDIA's forthcoming B200 GPUs. Even for the world's largest technology companies, an investment of this magnitude is untenable. In addition, these estimates do not account for the demand on GPU infrastructure to continue to train new models in the extremely competitive field.
              </p>
            </div>
          </div>
          
          {/* Right Column - Chart */}
          <div className="flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full">
              <InferenceGrowthChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDemandSection; 