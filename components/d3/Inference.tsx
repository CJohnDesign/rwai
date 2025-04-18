"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Image from 'next/image';

// Profile data
const profiles = [
  { image: "/images/user-pic-1.png", title: "AI Research Lead" },
  { image: "/images/user-pic-2.png", title: "Startup Founder" },
  { image: "/images/user-pic-3.png", title: "ML Engineer" },
  { image: "/images/user-pic-4.png", title: "Data Scientist" },
  { image: "/images/user-pic-5.png", title: "Product Manager" },
  { image: "/images/user-pic-6.png", title: "Tech Entrepreneur" },
  { image: "/images/user-pic-7.png", title: "Innovation Director" },
  { image: "/images/user-pic-8.png", title: "AI Developer" },
  { image: "/images/user-pic-9.png", title: "Research Scientist" },
  { image: "/images/user-pic-10.png", title: "AI Consultant" },
  { image: "/images/user-pic-11.png", title: "ML Architect" },
  { image: "/images/user-pic-12.png", title: "AI Strategist" },
  { image: "/images/user-pic-13.png", title: "Tech Lead" },
  { image: "/images/user-pic-14.png", title: "AI Engineer" }
];

// Model data
const models = [
  { id: "llama", image: "/images/logo-llana.png", size: 100, type: 'model', label: "Llama 2" },
  { id: "mistral", image: "/images/logo_mistral.png", size: 100, type: 'model', label: "Mistral AI" },
  { id: "deepseek", image: "/images/logo_deepseek.png", size: 100, type: 'model', label: "DeepSeek" },
  { id: "blackforest", image: "/images/logo_black-forest.png", size: 100, type: 'model', label: "Black Forest" }
];

// Create image patterns using Next.js Image component
const createImagePatterns = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
  // Remove existing patterns
  svg.selectAll("defs").remove();
  
  const defs = svg.append("defs");

  // Create patterns for profile images
  profiles.forEach((profile, i) => {
    const pattern = defs
      .append("pattern")
      .attr("id", `profile-${i}`)
      .attr("width", 1)
      .attr("height", 1)
      .attr("patternUnits", "objectBoundingBox");

    // Use foreignObject to embed Next.js Image component
    const fo = pattern
      .append("foreignObject")
      .attr("width", "100%")
      .attr("height", "100%");

    // Create a div to hold the Next.js Image
    const div = fo
      .append("xhtml:div")
      .style("width", "100%")
      .style("height", "100%")
      .style("position", "relative");

    // Add Next.js Image component
    const img = div
      .append("xhtml:img")
      .attr("src", profile.image)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("object-fit", "cover");
  });

  // Create patterns for model images
  models.forEach(model => {
    const pattern = defs
      .append("pattern")
      .attr("id", `model-${model.id}`)
      .attr("width", 1)
      .attr("height", 1)
      .attr("patternUnits", "objectBoundingBox");

    // Use foreignObject to embed Next.js Image component
    const fo = pattern
      .append("foreignObject")
      .attr("width", "100%")
      .attr("height", "100%");

    // Create a div to hold the Next.js Image
    const div = fo
      .append("xhtml:div")
      .style("width", "100%")
      .style("height", "100%")
      .style("position", "relative");

    // Add Next.js Image component
    const img = div
      .append("xhtml:img")
      .attr("src", model.image)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("object-fit", "contain");
  });
};

interface Node extends d3.SimulationNodeDatum {
  id: string;
  image: string;
  label?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  size?: number;
  fixed?: boolean;
  type?: 'profile' | 'central' | 'model';
}

interface Link {
  source: Node;
  target: Node;
  type?: 'profile-to-central' | 'model-to-central';
}

export const Inference = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Get random user profiles
    const getRandomUserProfiles = (count: number) => {
      const shuffled = [...profiles].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    // Initial user profiles
    const initialProfiles = getRandomUserProfiles(7);
    
    // Create profile nodes (top row)
    const profileNodes: Node[] = initialProfiles.map((profile, i) => ({
      id: `User ${i + 1}`,
      image: profile.image,
      size: 65,
      type: 'profile',
      label: profile.title
    }));

    // Create model logo nodes (bottom row)
    const modelNodes: Node[] = [
      { id: "llama", image: "/images/logo-llana.png", size: 100, type: 'model', label: "Llama 2" },
      { id: "mistral", image: "/images/logo_mistral.png", size: 100, type: 'model', label: "Mistral AI" },
      { id: "deepseek", image: "/images/logo_deepseek.png", size: 100, type: 'model', label: "DeepSeek" },
      { id: "blackforest", image: "/images/logo_black-forest.png", size: 100, type: 'model', label: "Black Forest" }
    ];

    // Create central logo node
    const centralNode: Node = {
      id: "logo",
      image: "/images/RWAi_custom-logo-1.png",
      size: 180,
      type: 'central',
      fixed: true,
      label: "RWAi GPUs"
    };

    // Combine all nodes
    const nodes = [...profileNodes, ...modelNodes, centralNode];

    // Create links with object references instead of string IDs
    const links: Link[] = [
      // Links from profile nodes to central node
      ...profileNodes.map(node => ({
        source: node,
        target: centralNode,
        type: 'profile-to-central' as const
      })),
      // Links from model nodes to central node
      ...modelNodes.map(node => ({
        source: node,
        target: centralNode,
        type: 'model-to-central' as const
      }))
    ];

    // SVG dimensions
    const width = 1400;
    const height = 1200;
    const spacing = 180;
    const modelSpacing = 260;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);
    
    // Create layers for proper z-indexing
    const linksGroup = svg.append("g").attr("class", "links");
    const dotsGroup = svg.append("g").attr("class", "dots");
    const nodesGroup = svg.append("g").attr("class", "nodes");

    // Calculate positions for top row (profile nodes)
    const totalProfileRowWidth = (profileNodes.length - 1) * spacing;
    const profileStartX = (width - totalProfileRowWidth) / 2;

    // Calculate positions for bottom row (model nodes)
    const totalModelRowWidth = (modelNodes.length - 1) * modelSpacing;
    const modelStartX = (width - totalModelRowWidth) / 2;

    // Position profile nodes in a straight horizontal line at the top
    profileNodes.forEach((node, i) => {
      node.x = profileStartX + i * spacing;
      node.y = height * 0.12; // Moved higher up
      node.fx = node.x; // Fix X position
      node.fy = node.y; // Fix Y position
    });

    // Position model nodes in a straight horizontal line at the bottom
    modelNodes.forEach((node, i) => {
      node.x = modelStartX + i * modelSpacing;
      node.y = height * 0.9; // Moved even lower
      node.fx = node.x; // Fix X position
      node.fy = node.y; // Fix Y position
    });

    // Position central node
    centralNode.x = width / 2;
    centralNode.y = height * 0.5; // Center
    centralNode.fx = centralNode.x; // Fix X position
    centralNode.fy = centralNode.y; // Fix Y position

    // Create curved links with smoother bezier curves
    const linkPath = (d: Link) => {
      const sourceX = d.source.x || 0;
      const sourceY = d.source.y || 0;
      const targetX = d.target.x || 0;
      const targetY = d.target.y || 0;
      const controlX = sourceX;
      const controlY = (sourceY + targetY) * 0.5;
      return `M${sourceX},${sourceY} Q${controlX},${controlY} ${targetX},${targetY}`;
    };

    // Create the links
    const link = linksGroup
      .selectAll<SVGPathElement, Link>("path")
      .data(links)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "#073ABC")
      .attr("stroke-opacity", 0.8)
      .attr("stroke-width", 2)
      .attr("d", linkPath);

    // Function to find the correct path element
    const findPath = (sourceNode: Node, targetNode: Node) => {
      return link.filter(d => 
        (d.source === sourceNode && d.target === targetNode) ||
        (d.source === targetNode && d.target === sourceNode)
      );
    };

    // Create defs for image patterns
    const defs = svg.append("defs");

    // Add motion blur filter
    const filter = defs.append("filter")
      .attr("id", "motionBlur")
      .attr("width", "300%")
      .attr("height", "300%")
      .attr("x", "-100%")
      .attr("y", "-100%");

    filter.append("feGaussianBlur")
      .attr("class", "blur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "4 0.1");

    // Function to create and run the full animation sequence
    const animateDot = (sourceNode: Node, nextAnimation: () => void) => {
      // Get random model node
      const randomModelIndex = Math.floor(Math.random() * modelNodes.length);
      const modelNode = modelNodes[randomModelIndex];

      // Create the dot group to hold both the main dot and its blur
      const dotGroup = dotsGroup.append("g");

      // Create the dot with motion blur
      const dot = dotGroup.append("circle")
        .attr("r", 8)
        .attr("fill", "#073ABC")
        .attr("opacity", 0.9)
        .style("filter", "url(#motionBlur)");

      // Create a copy of the dot without blur for better visibility
      const dotOverlay = dotGroup.append("circle")
        .attr("r", 4)
        .attr("fill", "#073ABC")
        .attr("opacity", 1);

      // Find the actual paths we'll be using
      const userToLogoPath = findPath(sourceNode, centralNode);
      const logoToModelPath = findPath(centralNode, modelNode);

      if (!userToLogoPath.node() || !logoToModelPath.node()) {
        console.error('Could not find required paths');
        dotGroup.remove();
        nextAnimation();
        return;
      }

      // Modified animateAlongPath to handle both dots
      const animateAlongPath = (
        pathElement: d3.Selection<SVGPathElement, Link, SVGGElement, unknown>,
        dotGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
        direction: 'user-to-logo' | 'logo-to-model' | 'model-to-logo' | 'logo-to-user',
        duration = 400,
        onComplete?: () => void
      ) => {
        const pathNode = pathElement.node();
        if (!pathNode) return;
        
        const length = pathNode.getTotalLength();
        const pathData = pathElement.datum();
        
        // Determine which direction to animate
        let reverse = false;
        
        if (direction === 'user-to-logo' && pathData.source === centralNode) {
          reverse = true;
        }
        if (direction === 'logo-to-model' && pathData.source !== centralNode) {
          reverse = true;
        }
        if (direction === 'model-to-logo' && pathData.source === centralNode) {
          reverse = true;
        }
        if (direction === 'logo-to-user' && pathData.source !== centralNode) {
          reverse = true;
        }

        // Calculate the angle for the blur based on path direction
        const startPoint = pathNode.getPointAtLength(reverse ? length : 0);
        const endPoint = pathNode.getPointAtLength(reverse ? 0 : length);
        const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * (180 / Math.PI);
        
        // Update the motion blur angle
        filter.select(".blur")
          .attr("stdDeviation", "4 0.1")
          .attr("x", () => Math.cos(angle * Math.PI / 180) * 2)
          .attr("y", () => Math.sin(angle * Math.PI / 180) * 2);
        
        dotGroup.transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .attrTween("transform", () => {
            return (t) => {
              const point = pathNode.getPointAtLength(
                reverse ? length * (1 - t) : length * t
              );
              return `translate(${point.x},${point.y})`;
            };
          })
          .on("end", () => {
            if (onComplete) onComplete();
          });
      };

      // Step 1: User to Logo
      animateAlongPath(userToLogoPath, dotGroup, 'user-to-logo', 250, () => {
        // Step 2: Logo to Model
        animateAlongPath(logoToModelPath, dotGroup, 'logo-to-model', 250, () => {
          // Step 3: Short pause at model
          setTimeout(() => {
            // Step 4: Model back to Logo
            animateAlongPath(logoToModelPath, dotGroup, 'model-to-logo', 250, () => {
              // Step 5: Logo back to User
              animateAlongPath(userToLogoPath, dotGroup, 'logo-to-user', 250, () => {
                dotGroup.remove();
                // Continue with next animation immediately
                nextAnimation();
              });
            });
          }, 100);
        });
      });
    };

    // Function to run animations sequentially
    const animateSequentially = () => {
      // Create a shuffled queue of indices
      let remainingIndices: number[] = [];
      
      const shuffleNewSequence = () => {
        // Create array of indices and shuffle it
        remainingIndices = Array.from({ length: profileNodes.length }, (_, i) => i);
        for (let i = remainingIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [remainingIndices[i], remainingIndices[j]] = [remainingIndices[j], remainingIndices[i]];
        }
      };
      
      // Initialize with first shuffled sequence
      shuffleNewSequence();
      
      const runNextAnimation = () => {
        // If we've used all indices, create a new shuffled sequence
        if (remainingIndices.length === 0) {
          shuffleNewSequence();
        }
        
        // Pop a random index from our remaining indices
        const nextIndex = remainingIndices.pop()!;
        const sourceNode = profileNodes[nextIndex];
        
        animateDot(sourceNode, runNextAnimation);
      };
      
      runNextAnimation();
    };

    // Start the animation sequence
    animateSequentially();

    // Create patterns for each node
    nodes.forEach((node, i) => {
      defs.append("pattern")
        .attr("id", `node-${i}`)
        .attr("width", 1)
        .attr("height", 1)
        .append("image")
        .attr("href", node.image)
        .attr("width", (node.size || 65) * 2)
        .attr("height", (node.size || 65) * 2)
        .attr("preserveAspectRatio", "xMidYMid slice");
    });

    // Create tooltip div
    const tooltip = d3.select("body").append("div")
      .attr("class", "absolute hidden")
      .style("position", "absolute")
      .style("padding", "8px 12px")
      .style("background", "rgba(0, 0, 0, 0.85)")
      .style("color", "white")
      .style("border", "1px solid #073ABC")
      .style("border-radius", "6px")
      .style("font-size", "14px")
      .style("pointer-events", "none")
      .style("transform", "translate(-50%, -100%)")
      .style("transition", "opacity 0.2s")
      .style("z-index", "1000")
      .style("white-space", "nowrap");

    // Create nodes in the nodes layer
    const node = nodesGroup
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.size || 45)
      .attr("data-id", d => d.id) // Add data-id for easier selection
      .style("fill", (d, i) => `url(#node-${i})`)
      .style("stroke", "#073ABC")
      .style("stroke-width", 1.25)
      .style("stroke-opacity", 0.8)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("stroke-width", "2.5")
          .style("stroke-opacity", "1");

        tooltip
          .style("display", "block")
          .style("opacity", 1)
          .html(d.label || d.id)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mousemove", function(event) {
        tooltip
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .style("stroke-width", "1.25")
          .style("stroke-opacity", "0.8");

        tooltip
          .style("display", "none")
          .style("opacity", 0);
      });

    // Modify the simulation to maintain fixed positions and properly handle links
    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).distance(200))
      .force("x", d3.forceX<Node>(d => d.fx || d.x!).strength(1))
      .force("y", d3.forceY<Node>(d => d.fy || d.y!).strength(1))
      .force("collision", d3.forceCollide().radius(d => (d as any).size + 5 || 50));

    // Update positions on each tick
    simulation.on("tick", () => {
      link.attr("d", linkPath);
      
      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);
    });

    // Cleanup
    return () => {
      simulation.stop();
      tooltip.remove(); // Clean up tooltip
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default Inference; 