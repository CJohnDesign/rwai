import * as d3 from "d3"
import { Node } from "@/types"

export const createGPUContainer = (
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  gpuNodes: Node[],
  gpuSpacing: number,
  gpuY: number,
) => {
  // Calculate the leftmost and rightmost GPU positions
  const leftmostGPU = Math.min(...gpuNodes.map((node) => node.fx || 0))
  const rightmostGPU = Math.max(...gpuNodes.map((node) => node.fx || 0))

  // Calculate container dimensions with some padding
  const containerWidth = rightmostGPU - leftmostGPU + 60 // Add padding
  const containerX = leftmostGPU - 30 // Center the container

  return g
    .append("rect")
    .attr("x", containerX)
    .attr("y", gpuY - 40)
    .attr("width", containerWidth)
    .attr("height", 80)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("class", "dark:fill-gray-900/5 fill-gray-50/5 dark:stroke-gray-700/10 stroke-gray-300/10")
    .attr("stroke-width", 1)
}

export default function GpuContainer() {
  return (
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      rx="10"
      ry="10"
      className="dark:fill-gray-900/5 fill-gray-50/5 dark:stroke-gray-700/10 stroke-gray-300/10"
    />
  )
} 