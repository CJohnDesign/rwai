'use client';

import React from 'react';
import ProcessVisualizer from './ProcessVisualizer';

const ProcessSection: React.FC = () => {
  return (
    <div className="mt-24 -mx-4 md:-mx-6 px-4 md:px-6 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sora text-gray-900 dark:text-white">How RWAi Works</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            A simple breakdown of how investment flows to generate yield for token holders
          </p>
        </div>
        
        <ProcessVisualizer />
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#002fa7] hover:bg-opacity-90 transition-colors">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </span>
            Learn More About RWAi Tokenomics
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection; 