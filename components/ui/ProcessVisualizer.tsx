'use client';

import React from 'react';

interface ProcessStep {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const ProcessVisualizer: React.FC = () => {
  const steps: ProcessStep[] = [
    { 
      title: "Investment", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ), 
      description: "Token holders purchase fractional ownership in AI GPU infrastructure",
      color: "#073ABC" // Primary color
    },
    { 
      title: "Deployment", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ), 
      description: "Capital is used to acquire and deploy GPUs in data centers",
      color: "#3B82F6" // Blue
    },
    { 
      title: "Operation", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ), 
      description: "GPUs run AI models providing inference and compute services",
      color: "#10B981" // Green
    },
    { 
      title: "Revenue", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      ), 
      description: "Services generate revenue from AI compute customers",
      color: "#8B5CF6" // Purple
    },
    { 
      title: "Distribution", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
          <circle cx="9" cy="13" r="1"></circle>
          <circle cx="13" cy="13" r="1"></circle>
          <path d="M21 9h-6m0 0v6m0-6-3-3m3 3-3 3"></path>
        </svg>
      ), 
      description: "Revenue is distributed as USDC yield to token holders",
      color: "#F59E0B" // Amber
    }
  ];
  
  return (
    <div className="py-12">
      {/* Desktop version - horizontal with connecting line */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
          
          {/* Process steps */}
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div 
                  className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center z-10 mb-4"
                  style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: step.color }}
                >
                  <div className="text-center" style={{ color: step.color }}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-12 -right-2 text-gray-400 dark:text-gray-500 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile version - vertical with connecting line */}
      <div className="md:hidden">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-12 w-1 bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Process steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                <div 
                  className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center z-10 mr-4"
                  style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: step.color }}
                >
                  <div className="text-center" style={{ color: step.color }}>
                    {step.icon}
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-6 left-12 transform -translate-x-1/2 text-gray-400 dark:text-gray-500 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessVisualizer; 