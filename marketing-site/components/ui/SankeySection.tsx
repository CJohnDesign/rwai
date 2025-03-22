'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { sankeyData } from '../../data/sankey-data';

// Import the Sankey diagram component with dynamic import to avoid SSR issues with D3
const SankeyDiagram = dynamic(
  () => import('../../components/ui/SankeyDiagram'),
  { ssr: false }
);

// Import the Sankey legend component
const SankeyLegend = dynamic(
  () => import('../../components/ui/SankeyLegend'),
  { ssr: false }
);

const SankeySection: React.FC = () => {
  return (
    <div className="mt-24 -mx-4 md:-mx-6 px-4 md:px-6 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sora text-gray-900 dark:text-white">Investment Flow & Yield Distribution</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Illustrates the flow of investment into fractional ownership, GPU rig operations, and yield distribution to $RWAi token holders, emphasizing the movement of funds and returns in USDC.
          </p>
          
          {/* Sankey Legend */}
          <SankeyLegend className="mb-6" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 h-[450px] md:h-[550px]">
          {/* D3 Sankey Diagram */}
          <SankeyDiagram data={sankeyData} />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="font-medium text-lg mb-2">Investment</h3>
            <p className="text-gray-600 dark:text-gray-300">Token holders purchase fractional ownership in AI GPU infrastructure</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="font-medium text-lg mb-2">Operations</h3>
            <p className="text-gray-600 dark:text-gray-300">GPU rigs run top open-source models at state-of-the-art data centers</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="font-medium text-lg mb-2">Yield</h3>
            <p className="text-gray-600 dark:text-gray-300">Revenue from AI compute services distributed as USDC to token holders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SankeySection; 