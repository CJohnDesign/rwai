import { Node, PositionedNodes } from "../types"

export const positionNodes = (nodes: Node[], width: number, height: number): PositionedNodes => {
  const verticalPadding = height * 0.1
  const layerSpacing = (height - 2 * verticalPadding) / 3

  // Filter nodes by type
  const userNodes = nodes.filter((n) => n.type === "user")
  const gatewayNode = nodes.find((n) => n.type === "gateway")!
  const llmNodes = nodes.filter((n) => n.type === "llm")
  const gpuNodes = nodes.filter((n) => n.type === "gpu")

  // Calculate vertical positions
  const userY = verticalPadding
  const gatewayY = userY + layerSpacing
  const gpuY = gatewayY + layerSpacing

  // Calculate horizontal positions
  const gatewayX = width / 2
  const gpuSpacing = width / (gpuNodes.length + 1)

  // Set fixed positions
  userNodes.forEach((node, i) => {
    node.fx = width * (0.3 + i * 0.4)
    node.fy = userY
  })

  if (gatewayNode) {
    gatewayNode.fx = gatewayX
    gatewayNode.fy = gatewayY
  }

  llmNodes.forEach((node, i) => {
    node.fx = width * (0.25 + i * 0.25)
    node.fy = gatewayY
  })

  gpuNodes.forEach((node, i) => {
    node.fx = gpuSpacing * (i + 1)
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

