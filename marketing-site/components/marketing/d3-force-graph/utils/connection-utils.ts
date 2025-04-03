import * as d3 from "d3"
import { Node, PathElement, ConnectionsParams } from "../types"
import { PATH_STYLES } from "../styles/force-graph-styles"

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
  gpuSpacing,
}: ConnectionsParams): PathElement[] => {
  const pathElements: PathElement[] = []

  // Create user to gateway connections
  userNodes.forEach((userNode) => {
    const path = linksGroup
      .append("path")
      .attr("class", "link user-gateway-link")
      .attr("stroke", PATH_STYLES.types.userGateway.stroke)
      .attr("stroke-width", PATH_STYLES.types.userGateway.strokeWidth)
      .attr("stroke-opacity", PATH_STYLES.types.userGateway.strokeOpacity)
      .attr("fill", "none")
      .attr(
        "d",
        d3.line()([
          [userNode.fx || 0, userNode.fy || 0],
          [gatewayNode.fx || 0, gatewayNode.fy || 0],
        ]),
      )

    pathElements.push({
      id: `user-${userNode.id}-gateway`,
      element: path.node(),
      source: userNode,
      target: gatewayNode,
      type: "user-gateway",
    })
  })

  // Create gateway to LLM connections
  llmNodes.forEach((llmNode) => {
    const path = linksGroup
      .append("path")
      .attr("class", "link gateway-llm-link")
      .attr("stroke", PATH_STYLES.types.gatewayLLM.stroke)
      .attr("stroke-width", PATH_STYLES.types.gatewayLLM.strokeWidth)
      .attr("stroke-opacity", PATH_STYLES.types.gatewayLLM.strokeOpacity)
      .attr("fill", "none")
      .attr(
        "d",
        d3.line()([
          [gatewayNode.fx || 0, gatewayNode.fy || 0],
          [llmNode.fx || 0, llmNode.fy || 0],
        ]),
      )

    pathElements.push({
      id: `gateway-${llmNode.id}`,
      element: path.node(),
      source: gatewayNode,
      target: llmNode,
      type: "gateway-llm",
    })
  })

  // Create LLM to GPU connections
  llmNodes.forEach((llmNode) => {
    gpuNodes.forEach((gpuNode) => {
      const path = linksGroup
        .append("path")
        .attr("class", "link llm-gpu-link")
        .attr("stroke", PATH_STYLES.types.llmGPU.stroke)
        .attr("stroke-width", PATH_STYLES.types.llmGPU.strokeWidth)
        .attr("stroke-opacity", PATH_STYLES.types.llmGPU.strokeOpacity)
        .attr("fill", "none")
        .attr(
          "d",
          d3.line()([
            [llmNode.fx || 0, llmNode.fy || 0],
            [gpuNode.fx || 0, gpuNode.fy || 0],
          ]),
        )

      pathElements.push({
        id: `llm-${llmNode.id}-gpu-${gpuNode.id}`,
        element: path.node(),
        source: llmNode,
        target: gpuNode,
        type: "llm-gpu",
      })
    })
  })

  return pathElements
}

