import * as d3 from "d3"
import type { Node, PathElement } from "../types"
import { PATH_STYLES, DOT_STYLES, GLOW_FILTERS } from "../styles/force-graph-styles"

export function animateDotsAlongPaths(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  pathElements: PathElement[],
  userNodes: Node[],
  llmNodes: Node[],
  gpuNodes: Node[],
  gatewayNode: Node,
  queueAnimation?: (pathId: string, animationFn: () => void) => void
) {
  // Add SVG defs for filters
  const defs = svg.append("defs")

  // Create glow filter for dots
  const dotGlow = defs
    .append("filter")
    .attr("id", GLOW_FILTERS.dot.id)
    .attr("height", GLOW_FILTERS.dot.height)
    .attr("width", GLOW_FILTERS.dot.width)
    .attr("x", GLOW_FILTERS.dot.x)
    .attr("y", GLOW_FILTERS.dot.y)

  dotGlow.append("feGaussianBlur")
    .attr("stdDeviation", GLOW_FILTERS.dot.blur)
    .attr("result", "coloredBlur")

  dotGlow.append("feMerge")
    .append("feMergeNode")
    .attr("in", "coloredBlur")
  dotGlow.select("feMerge")
    .append("feMergeNode")
    .attr("in", "SourceGraphic")

  // Create glow filter for edges
  const edgeGlow = defs
    .append("filter")
    .attr("id", GLOW_FILTERS.edge.id)
    .attr("height", GLOW_FILTERS.edge.height)
    .attr("width", GLOW_FILTERS.edge.width)
    .attr("x", GLOW_FILTERS.edge.x)
    .attr("y", GLOW_FILTERS.edge.y)

  edgeGlow.append("feGaussianBlur")
    .attr("stdDeviation", GLOW_FILTERS.edge.blur)
    .attr("result", "coloredBlur")

  edgeGlow.append("feMerge")
    .append("feMergeNode")
    .attr("in", "coloredBlur")
  edgeGlow.select("feMerge")
    .append("feMergeNode")
    .attr("in", "SourceGraphic")

  // Create a group for all flow animations
  const flowsGroup = svg.append("g").attr("class", "flows")

  function startAnimations() {
    for (let i = 0; i < 8; i++) {
      setTimeout(createDataFlow, i * 300)
    }
  }

  function createDataFlow() {
    const isPentagramRoute = Math.random() < 0.3
    const randomUserIndex = Math.floor(Math.random() * userNodes.length)
    const randomUser = userNodes[randomUserIndex]
    const goThroughLLM = Math.random() > 0.5
    const randomLLMIndex = Math.floor(Math.random() * llmNodes.length)
    const randomLLM = llmNodes[randomLLMIndex]
    const randomGPUIndex = Math.floor(Math.random() * gpuNodes.length)
    const randomGPU = gpuNodes[randomGPUIndex]

    const pathSegments = []

    // First segment: User to Gateway
    const userToGatewayPath = pathElements.find(
      (p) => p.type === "user-gateway" && p.source.id === randomUser.id
    )

    if (userToGatewayPath) {
      pathSegments.push({
        element: userToGatewayPath.element,
        duration: 1000,
        reverse: false,
        type: isPentagramRoute ? "indirect" : "direct",
      })
    }

    if (goThroughLLM) {
      // Gateway to LLM
      const gatewayToLLMPath = pathElements.find(
        (p) => p.type === "gateway-llm" && p.target.id === randomLLM.id
      )

      if (gatewayToLLMPath) {
        pathSegments.push({
          element: gatewayToLLMPath.element,
          duration: 800,
          reverse: false,
          type: isPentagramRoute ? "indirect" : "direct",
        })

        // LLM back to Gateway
        pathSegments.push({
          element: gatewayToLLMPath.element,
          duration: 800,
          reverse: true,
          type: isPentagramRoute ? "indirect" : "direct",
        })
      }
    }

    function animateSegment(segmentIndex: number) {
      if (segmentIndex >= pathSegments.length) {
        setTimeout(createDataFlow, Math.random() * 500)
        return
      }

      const segment = pathSegments[segmentIndex]
      const { element, duration, reverse, type } = segment

      if (!element) {
        animateSegment(segmentIndex + 1)
        return
      }

      const pathLength = element.getTotalLength()
      const pathNode = d3.select(element)
      
      // Apply active styles to the path
      const activeStyle = PATH_STYLES.active[type === "indirect" ? "indirect" : "direct"]

      const animatePathSegment = () => {
        pathNode
          .transition()
          .duration(200)
          .attr("stroke", activeStyle.stroke)
          .attr("stroke-width", activeStyle.strokeWidth)
          .attr("stroke-opacity", activeStyle.strokeOpacity)
          .attr("filter", `url(#${GLOW_FILTERS.edge.id})`)

        // Create and style dot
        const dotStyle = DOT_STYLES[type === "indirect" ? "indirect" : "direct"]
        const flow = flowsGroup
          .append("circle")
          .attr("r", dotStyle.radius)
          .attr("fill", dotStyle.fill)
          .attr("filter", `url(#${GLOW_FILTERS.dot.id})`)
          .attr("opacity", dotStyle.opacity)

        const getPointAtLength = (length: number) => {
          const point = element.getPointAtLength(length)
          return { x: point.x, y: point.y }
        }

        const startLength = reverse ? pathLength : 0
        const endLength = reverse ? 0 : pathLength
        const startPoint = getPointAtLength(startLength)
        
        flow.attr("cx", startPoint.x).attr("cy", startPoint.y)

        flow
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .tween("position", () => {
            return (t: number) => {
              const currentLength = startLength + (endLength - startLength) * t
              const currentPoint = getPointAtLength(currentLength)
              flow.attr("cx", currentPoint.x).attr("cy", currentPoint.y)
            }
          })
          .on("end", () => {
            // Reset path to default styling
            pathNode
              .transition()
              .duration(300)
              .attr("stroke", PATH_STYLES.default.stroke)
              .attr("stroke-width", PATH_STYLES.default.strokeWidth)
              .attr("stroke-opacity", PATH_STYLES.default.strokeOpacity)
              .attr("filter", null)

            flow.remove()
            animateSegment(segmentIndex + 1)
          })
      }

      // Use queue if provided
      if (queueAnimation) {
        queueAnimation(`${element.id}-${segmentIndex}`, animatePathSegment)
      } else {
        animatePathSegment()
      }
    }

    animateSegment(0)
  }

  startAnimations()

  return () => {
    svg.selectAll(".flows circle").remove()
    svg.selectAll("defs").remove()
  }
}

