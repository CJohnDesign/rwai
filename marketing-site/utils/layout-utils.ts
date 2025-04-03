import { Node, PositionedNodes } from "@/types"

export const positionNodes = (nodes: Node[], width: number, height: number): PositionedNodes => {
  // Calculate vertical positions with reduced spacing
  const verticalPadding = 0.12 // Increase padding to push nodes inward
  const availableHeight = height * (1 - 2 * verticalPadding)
  const layerSpacing = availableHeight / 3 // Compress the spacing between layers

  // Filter nodes by type
  const userNodes = nodes.filter((n) => n.type === "user")
  const gatewayNode = nodes.find((n) => n.id === "gateway") as Node
  const llmNodes = nodes.filter((n) => n.type === "llm")
  const gpuNodes = nodes.filter((n) => n.type === "gpu")

  // Calculate positions
  const userCount = userNodes.length

  // Reduce horizontal spacing between user nodes
  // Instead of spreading across the full width, use only 60% of the width
  const userGroupWidth = width * 0.6
  const userSpacing = userCount > 1 ? userGroupWidth / (userCount - 1) : 0
  const userStartX = (width - userGroupWidth) / 2
  const userY = height * verticalPadding // Top layer

  // Position user nodes with reduced spacing
  userNodes.forEach((node, i) => {
    // For a single user node, center it
    if (userCount === 1) {
      node.fx = width / 2
    } else {
      node.fx = userStartX + userSpacing * i
    }
    node.fy = userY
  })

  // Position gateway node - bring it closer to users
  const gatewayX = width / 2
  const gatewayY = height * 0.4 // Position at 40% of height instead of using layerSpacing
  gatewayNode.fx = gatewayX
  gatewayNode.fy = gatewayY

  // Position LLM nodes at same level as gateway
  const llmCount = llmNodes.length
  const llmSpacing = Math.min(width / 8, 100)

  llmNodes.forEach((node, i) => {
    if (i < llmCount / 2) {
      // Left side
      node.fx = gatewayX - 120 - (llmCount / 2 - i - 1) * llmSpacing
    } else {
      // Right side
      node.fx = gatewayX + 120 + (i - llmCount / 2) * llmSpacing
    }
    node.fy = gatewayY
  })

  // Position GPU nodes with reduced spacing
  const gpuCount = gpuNodes.length

  // Reduce horizontal spacing between GPU nodes
  // Instead of spreading across the full width, use only 50% of the width
  const gpuGroupWidth = width * 0.5
  const gpuSpacing = gpuCount > 1 ? gpuGroupWidth / (gpuCount - 1) : width / 5
  const gpuStartX = (width - gpuGroupWidth) / 2
  const gpuY = height * 0.7 // Position at 70% of height to bring closer to gateway

  // Position GPU nodes with reduced spacing
  gpuNodes.forEach((node, i) => {
    // For a single GPU node, center it
    if (gpuCount === 1) {
      node.fx = width / 2
    } else {
      node.fx = gpuStartX + gpuSpacing * i
    }
    node.fy = gpuY
  })

  return {
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
  }
} 