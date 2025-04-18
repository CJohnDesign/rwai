'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const InferenceGrowthChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });
  const [isMobile, setIsMobile] = useState(false);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Set mobile state
        setIsMobile(width < 640);
        // Maintain aspect ratio with smaller height
        const height = Math.min(300, width * 0.6);
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create the chart
  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    
    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set margins based on screen size
    const margin = {
      top: isMobile ? 30 : 40,
      right: isMobile ? 20 : 30,
      bottom: isMobile ? 35 : 45, // Increased bottom margin
      left: isMobile ? 40 : 50
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Generate growth data with faster initial growth
    // Starting with 2B requests in 2025, growing to ~2000B by 2029
    const startValue = 2; // 2 billion requests per day in 2025
    const endValue = 2000; // ~2000 billion requests per day in 2029
    
    // Generate data points using a modified growth formula for faster initial growth
    const generateGrowthData = () => {
      const data = [];
      const numPoints = 100;
      
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const year = 2025 + t * 4; // 4 years from 2025 to 2029
        
        // Use a power function that grows faster initially but still reaches the same end value
        const power = 2.5; // Adjust this value to control the curve shape
        const value = startValue + (endValue - startValue) * Math.pow(t, power);
        
        data.push({ year, value });
      }
      return data;
    };
    
    const growthData = generateGrowthData();
    
    // Create key annotations - only keep start and end points
    const annotations = [
      { year: 2025, value: startValue },
      { year: 2029, value: endValue }
    ];

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([2025, 2029])
      .range([0, innerWidth]);

    // Using linear scale to show growth curve with adjusted domain
    const yScale = d3.scaleLinear()
      .domain([startValue * 0.5, endValue * 1.1])
      .range([innerHeight, 0]);

    // Create the SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create a group for the chart content
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add grid lines with theme-aware colors
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(5)  // Only show whole years
          .tickSize(-innerHeight)
          .tickFormat(() => '')
      )
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1);

    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1);

    // Create line generator
    const line = d3.line<{ year: number, value: number }>()
      .x(d => xScale(d.year))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);  // Smooth curve

    // Add the line path
    g.append('path')
      .datum(growthData)
      .attr('fill', 'none')
      .attr('stroke', '#073ABC')  // Primary color
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add area under the curve
    const area = d3.area<{ year: number, value: number }>()
      .x(d => xScale(d.year))
      .y0(innerHeight)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(growthData)
      .attr('fill', '#073ABC')
      .attr('fill-opacity', 0.1)
      .attr('d', area);

    // Add annotations (dots only, no labels)
    annotations.forEach(annotation => {
      const x = xScale(annotation.year);
      const y = yScale(annotation.value);

      // Add dot
      g.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 5)
        .attr('fill', '#073ABC');
    });

    // Add x-axis with years (only whole years)
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .ticks(5)  // Show only whole years
        .tickFormat(d => d.toString()))
      .attr('font-size', '12px')
      .attr('color', 'currentColor')
      .selectAll('text')  // Select all tick texts
      .style('text-anchor', 'middle'); // Center align the year numbers

    // Add y-axis without values
    g.append('g')
      .call(d3.axisLeft(yScale)
        .tickSize(0)
        .tickFormat(() => ''))
      .attr('font-size', '12px')
      .attr('color', 'currentColor');

    // Add axis labels with theme-aware colors
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + (isMobile ? 30 : 35)) // Increased distance from axis
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', 'currentColor')
      .text('Year');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', 'currentColor')
      .text('Inference Requests');

    // Add title with theme-aware colors and responsive text
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', isMobile ? 15 : 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', isMobile ? '14px' : '16px')
      .attr('font-weight', 'bold')
      .attr('fill', 'currentColor')
      .text(isMobile ? 'AI Growth (2025-2029)' : 'Projected AI Inference Growth (2025-2029)');

  }, [dimensions, isMobile]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{ maxHeight: '100%', overflow: 'visible' }}
      />
    </div>
  );
};

export default InferenceGrowthChart; 