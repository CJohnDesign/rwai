import * as d3 from "d3"
import { Node, PathElement, ConnectionsParams } from "@/types"

// Import the same styling constants
const PATH_STYLES = {
  default: {
    stroke: "var(--muted)",
    strokeWidth: 1,
    strokeOpacity: 0.8,
  },
}

export const createConnections = ({
  linksGroup,
  userNodes,
  gatewayNode,
  llmNodes,
  gpuNodes,
  userY,
  gatewayY,
  gatewayX,
  gpuY,
}: ConnectionsParams): PathElement[] => {
  const pathElements: PathElement[] = []

  // Draw user to gateway connections - adjust curve for closer spacing
  userNodes.forEach((userNode, index) => {
    const userX = userNode.fx || 0
    const midY = userY + (gatewayY - userY) * 0.5

    const path = linksGroup
      .append("path")
      .attr(
        "d",
        `
        M ${userX} ${userY + 25}
        C ${userX} ${midY},
          ${gatewayX} ${midY},
          ${gatewayX} ${gatewayY - 45}
      `,
      )
      .attr("stroke", PATH_STYLES.default.stroke)
      .attr("stroke-width", PATH_STYLES.default.strokeWidth)
      .attr("stroke-opacity", PATH_STYLES.default.strokeOpacity)
      .attr("fill", "none")
      .attr("class", `user-to-gateway-${index}`)

    pathElements.push({
      id: `user-to-gateway-${index}`,
      element: path.node(),
      source: userNode,
      target: gatewayNode,
      type: "user-to-gateway",
    })
  })

  // Draw gateway to LLM connections
  llmNodes.forEach((llmNode, index) => {
    const llmX = llmNode.fx || 0
    const llmY = llmNode.fy || 0
    const isLeftSide = index < llmNodes.length / 2
    const startX = isLeftSide ? gatewayX - 45 : gatewayX + 45

    const path = linksGroup
      .append("path")
      .attr(
        "d",
        `
        M ${startX} ${gatewayY}
        L ${llmX} ${llmY}
      `,
      )
      .attr("stroke", PATH_STYLES.default.stroke)
      .attr("stroke-width", PATH_STYLES.default.strokeWidth)
      .attr("stroke-opacity", PATH_STYLES.default.strokeOpacity)
      .attr("fill", "none")
      .attr("class", `gateway-to-llm-${index}`)

    pathElements.push({
      id: `gateway-to-llm-${index}`,
      element: path.node(),
      source: gatewayNode,
      target: llmNode,
      type: "gateway-to-llm",
    })
  })

  // Draw gateway to GPU connections - adjust curve for closer spacing
  gpuNodes.forEach((gpuNode, index) => {
    const gpuX = gpuNode.fx || 0
    const midY = gatewayY + (gpuY - gatewayY) * 0.5

    const path = linksGroup
      .append("path")
      .attr(
        "d",
        `
        M ${gatewayX} ${gatewayY + 45}
        C ${gatewayX} ${midY},
          ${gpuX} ${midY},
          ${gpuX} ${gpuY - 30}
      `,
      )
      .attr("stroke", PATH_STYLES.default.stroke)
      .attr("stroke-width", PATH_STYLES.default.strokeWidth)
      .attr("stroke-opacity", PATH_STYLES.default.strokeOpacity)
      .attr("fill", "none")
      .attr("class", `gateway-to-gpu-${index}`)

    pathElements.push({
      id: `gateway-to-gpu-${index}`,
      element: path.node(),
      source: gatewayNode,
      target: gpuNode,
      type: "gateway-to-gpu",
    })
  })

  return pathElements
} 