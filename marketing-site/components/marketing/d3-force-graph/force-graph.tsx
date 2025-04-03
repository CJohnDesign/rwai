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

export default function ForceGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svg.node()?.getBoundingClientRect().width || 600
    const height = svg.node()?.getBoundingClientRect().height || 400

    // Clear any existing elements
    svg.selectAll("*").remove()

    // Create a group for the graph
    const g = svg.append("g")

    // Create a group for the links
    const linksGroup = g.append("g").attr("class", "links")

    // Create nodes from data
    const nodes = createNodes(graphData.nodes)

    // Position nodes based on layout
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

    // Create a force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(graphData.links).id((d: any) => d.id),
      )
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create GPU container
    const gpuContainer = createGPUContainer(g, gpuNodes, gpuSpacing, gpuY)

    // Create node groups
    const nodeGroups = g
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
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

    // Create connections between nodes
    const pathElements = createConnections({
      linksGroup,
      userNodes,
      gatewayNode,
      llmNodes,
      gpuNodes,
      userY,
      gatewayY,
      gatewayX,
      gpuY,
      gpuSpacing,
    })

    // Start animations
    animateDotsAlongPaths(svg, pathElements, userNodes, llmNodes, gpuNodes, gatewayNode)

    // Handle window resize
    const handleResize = () => {
      if (!svgRef.current) return

      const newWidth = svgRef.current.getBoundingClientRect().width
      const newHeight = svgRef.current.getBoundingClientRect().height

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
      linksGroup.selectAll("*").remove()

      // Recreate connections with new positions
      const newPathElements = createConnections({
        linksGroup,
        ...newPositions,
      })

      // Clear existing animations and restart
      svg.selectAll(".animated-dot").remove()
      setTimeout(() => {
        animateDotsAlongPaths(
          svg,
          newPathElements,
          newPositions.userNodes,
          newPositions.llmNodes,
          newPositions.gpuNodes,
          newPositions.gatewayNode,
        )
      }, 500)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      simulation.stop()
      // Clean up animations
      svg.selectAll(".animated-dot").remove()
    }
  }, [])

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full text-white" style={{ maxHeight: "100vh" }} />
    </div>
  )
}

