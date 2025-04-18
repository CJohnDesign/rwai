'use client';

import React from 'react';

interface LegendItem {
  category: string;
  color: string;
  label: string;
}

interface SankeyLegendProps {
  className?: string;
}

const SankeyLegend: React.FC<SankeyLegendProps> = ({ className = '' }) => {
  const legendItems: LegendItem[] = [
    { category: 'investors', color: '#073ABC', label: 'Investors' },
    { category: 'platform', color: '#3B82F6', label: 'Platform' },
    { category: 'infrastructure', color: '#10B981', label: 'Infrastructure' },
    { category: 'services', color: '#8B5CF6', label: 'Services' },
    { category: 'revenue', color: '#EC4899', label: 'Revenue' },
    { category: 'costs', color: '#F59E0B', label: 'Costs' },
    { category: 'reinvestment', color: '#6366F1', label: 'Reinvestment' },
    { category: 'yield', color: '#F59E0B', label: 'Yield' },
  ];

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {legendItems.map((item) => (
        <div key={item.category} className="flex items-center">
          <div
            className="w-4 h-4 mr-2 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SankeyLegend; 