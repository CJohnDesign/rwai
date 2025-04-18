'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyGraph, SankeyNode, SankeyLink } from 'd3-sankey';
import { SankeyData } from '../../data/sankey-data';

interface SankeyDiagramProps {
  data: SankeyData;
  width?: number;
  height?: number;
  nodeWidth?: number;
  nodePadding?: number;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({
  data,
  width = 960,
  height = 500,
  nodeWidth = 20,
  nodePadding = 15,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Maintain aspect ratio
        const height = width * 0.55;
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create the Sankey diagram
  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const { width, height } = dimensions;
    
    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create the Sankey generator
    const sankeyGenerator = sankey<any, any>()
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .extent([[1, 5], [width - 1, height - 5]]);

    // Format the data for the Sankey layout
    const sankeyData = {
      nodes: data.nodes.map((d, i) => ({ ...d, id: i })),
      links: data.links.map(d => ({
        ...d,
        source: data.nodes.findIndex(node => node.name === d.source),
        target: data.nodes.findIndex(node => node.name === d.target),
      })),
    };

    // Generate the Sankey layout
    const { nodes, links } = sankeyGenerator(sankeyData as any);

    const svg = d3.select(svgRef.current);

    // Add links with improved styling
    svg.append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d: any) => d.color || '#aaa')
      .attr('stroke-width', (d: any) => Math.max(1, d.width))
      .attr('fill', 'none')
      .attr('opacity', 0.6)
      .style('mix-blend-mode', 'multiply')
      .on('mouseover', function() {
        d3.select(this)
          .attr('opacity', 0.9)
          .attr('stroke-width', (d: any) => Math.max(1, d.width + 3));
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('opacity', 0.6)
          .attr('stroke-width', (d: any) => Math.max(1, d.width));
      })
      .append('title')
      .text((d: any) => `${d.source.name} → ${d.target.name}\nValue: ${d.value}`);

    // Add nodes with improved styling
    const node = svg.append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('height', (d: any) => Math.max(d.y1 - d.y0, 1))
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('fill', (d: any) => {
        const categoryColors: Record<string, string> = {
          investors: '#073ABC',
          platform: '#3B82F6',
          infrastructure: '#10B981',
          services: '#8B5CF6',
          revenue: '#EC4899',
          costs: '#F59E0B',
          reinvestment: '#6366F1',
          yield: '#F59E0B',
          beneficiaries: '#F59E0B'
        };
        return categoryColors[d.category] || '#aaa';
      })
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.2)
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', function() {
        d3.select(this)
          .attr('stroke-opacity', 0.5)
          .attr('stroke-width', 2);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('stroke-opacity', 0.2)
          .attr('stroke-width', 1);
      });

    node.append('title')
      .text((d: any) => `${d.name}\nValue: ${d.value}`);

    // Add node labels with improved visibility
    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', (d: any) => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < width / 2 ? 'start' : 'end')
      .attr('font-size', '11px')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', '500')
      .attr('pointer-events', 'none')
      .text((d: any) => d.name)
      .attr('fill', 'currentColor')
      .filter((d: any) => (d.y1 - d.y0) < 15)
      .remove();

    // Add value labels for nodes
    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .filter((d: any) => (d.y1 - d.y0) >= 25)
      .attr('x', (d: any) => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2 + 15)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < width / 2 ? 'start' : 'end')
      .attr('font-size', '9px')
      .attr('font-family', 'sans-serif')
      .attr('opacity', 0.7)
      .attr('pointer-events', 'none')
      .text((d: any) => `Value: ${d.value}`)
      .attr('fill', 'currentColor');

  }, [data, dimensions, nodeWidth, nodePadding]);

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

export default SankeyDiagram; 