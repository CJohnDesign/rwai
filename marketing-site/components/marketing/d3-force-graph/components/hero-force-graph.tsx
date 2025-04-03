"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { createNodes } from "@/utils/node-utils"
import { positionNodes } from "@/utils/layout-utils"
import { createConnections } from "@/utils/connection-utils"
import { animateDotsAlongPaths } from "@/utils/animation-utils"
import { graphData } from "@/data/graph-data"
import { renderNodeIcons } from "@/utils/icon-utils"
import { createGPUContainer } from "@/components/gpu-container"
import { cn } from "@/lib/utils"
import styles from "../styles/force-graph.module.css"

interface HeroForceGraphProps {
  className?: string
}

export function HeroForceGraph({ className }: HeroForceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Create a ref to track active animations
  const activeAnimationsRef = useRef<Set<string>>(new Set())
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Track component mount state
    let isMounted = true
    
    const svg = d3.select(svgRef.current)
    const width = svg.node()?.getBoundingClientRect().width || 600
    const height = svg.node()?.getBoundingClientRect().height || 400

    // Animation queue management
    const queueAnimation = (pathId: string, animationFn: () => void) => {
      if (!isMounted) return
      
      if (!activeAnimationsRef.current.has(pathId)) {
        activeAnimationsRef.current.add(pathId)
        animationFn()
        
        // Remove from active animations when complete
        setTimeout(() => {
          if (isMounted) {
            activeAnimationsRef.current.delete(pathId)
          }
        }, 3000) // Adjust timing based on your animation duration
      }
    }

    // Clear any existing elements
    svg.selectAll("*").remove()

    // Create main group for the graph with proper z-indexing layers
    const g = svg.append("g")

    // Create groups with proper z-index ordering
    const backgroundGroup = g.append("g").attr("class", "background-layer")
    const connectionsGroup = g.append("g").attr("class", "connections-layer")
    const nodesGroup = g.append("g").attr("class", "nodes-layer")

    // Create nodes from data with position validation
    const nodes = createNodes(graphData.nodes)
    
    // Validate node positions after layout
    const {
      userNodes,
      gatewayNode,
      llmNodes,
      gpuNodes,
      verticalPadding,
      layerSpacing,
      userY,
      gatewayY,
      gatewayX,
      gpuY,
      gpuSpacing,
    } = positionNodes(nodes, width, height)

    // Validate all node positions before proceeding
    const validateNodePositions = (nodes: any[]) => {
      return nodes.every((node) => 
        typeof node.fx === 'number' && 
        typeof node.fy === 'number' && 
        !isNaN(node.fx) && 
        !isNaN(node.fy)
      )
    }

    if (!validateNodePositions([...userNodes, gatewayNode, ...llmNodes, ...gpuNodes])) {
      console.error("Invalid node positions detected")
      return
    }

    // Create GPU container in background layer
    const gpuContainer = createGPUContainer(backgroundGroup, gpuNodes, gpuSpacing, gpuY)

    // Create connections in connections layer
    const pathElements = createConnections({
      linksGroup: connectionsGroup,
      userNodes,
      gatewayNode,
      llmNodes,
      gpuNodes,
      userY,
      gatewayY,
      gatewayX,
      gpuY,
      gpuSpacing,
      verticalPadding,
      layerSpacing,
    })

    // Create node groups in top layer
    const nodeGroups = nodesGroup
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", styles.node)
      .attr("transform", (d) => `translate(${d.fx || 0},${d.fy || 0})`)

    // Add circles for each node
    nodeGroups
      .append("circle")
      .attr("r", (d) => {
        if (d.type === "user") return 25
        if (d.type === "gateway") return 45
        if (d.type === "llm") return 30
        if (d.type === "gpu") return 30
        return 30
      })
      .attr("fill", (d) => {
        if (d.type === "user") return "#374151" // Dark gray for user
        if (d.type === "gateway") return "#0E7490" // Teal for gateway
        if (d.type === "llm") return "#1E3A8A" // Dark blue for LLM
        if (d.type === "gpu") return "#065F46" // Green for GPU
        return "#1E3A8A"
      })
      .attr("stroke", "#6B7280")
      .attr("stroke-width", 2)

    // Render icons for each node type
    renderNodeIcons(nodeGroups)

    // Start animations with queue management
    let cleanup = animateDotsAlongPaths(
      svg, 
      pathElements, 
      userNodes, 
      llmNodes, 
      gpuNodes, 
      gatewayNode,
      queueAnimation
    )

    // Handle window resize with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      if (!svgRef.current || !isMounted) return

      // Clear existing timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }

      // Debounce resize handling
      resizeTimeout = setTimeout(() => {
        const currentSvg = svgRef.current
        if (!currentSvg || !isMounted) return

        const newWidth = currentSvg.getBoundingClientRect().width
        const newHeight = currentSvg.getBoundingClientRect().height

        // Clear existing animations
        cleanup()
        activeAnimationsRef.current.clear()

        // Reposition nodes for new dimensions
        const newPositions = positionNodes(nodes, newWidth, newHeight)

        // Update node positions
        nodeGroups.attr("transform", (d) => `translate(${d.fx || 0},${d.fy || 0})`)

        // Update GPU container
        gpuContainer
          .attr("x", newPositions.gpuSpacing * 0.5)
          .attr("y", newPositions.gpuY - 40)
          .attr("width", newPositions.gpuSpacing * (newPositions.gpuNodes.length + 0.5) - newPositions.gpuSpacing * 0.5)

        // Clear previous links and path elements
        connectionsGroup.selectAll("*").remove()

        // Recreate connections with new positions
        const newPathElements = createConnections({
          linksGroup: connectionsGroup,
          ...newPositions,
        })

        // Restart animations with delay
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current)
        }
        
        animationTimeoutRef.current = setTimeout(() => {
          if (isMounted && currentSvg) {
            const newCleanup = animateDotsAlongPaths(
              d3.select(currentSvg),
              newPathElements,
              newPositions.userNodes,
              newPositions.llmNodes,
              newPositions.gpuNodes,
              newPositions.gatewayNode,
              queueAnimation
            )
            cleanup = newCleanup; // Store the new cleanup function
          }
        }, 500)
      }, 150)
    }

    window.addEventListener("resize", handleResize)

    // Comprehensive cleanup
    return () => {
      isMounted = false
      window.removeEventListener("resize", handleResize)
      
      // Clear all timeouts
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
      
      // Clear animations
      cleanup()
      activeAnimationsRef.current.clear()
    }
  }, [])

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <svg ref={svgRef} className="w-full h-full text-white" style={{ maxHeight: "100vh" }} />
    </div>
  )
} 