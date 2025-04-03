import * as d3 from "d3"
import { Node, PathElement } from "@/types"

// Constants for styling
const PATH_STYLES = {
  default: {
    stroke: "var(--muted)",
    strokeWidth: 1,
    strokeOpacity: 0.8,
  },
  active: {
    direct: {
      stroke: "#E5E7EB",
      strokeWidth: 2,
      strokeOpacity: 1,
    },
    indirect: {
      stroke: "#F3F4F6",
      strokeWidth: 2,
      strokeOpacity: 1,
    },
  },
}

// Special handling for straight paths (more visible)
const STRAIGHT_PATH_STYLES = {
  default: {
    stroke: "var(--muted)", // Match the default color of curved paths
    strokeWidth: 1,
    strokeOpacity: 0.8,
  },
  active: {
    direct: {
      stroke: "#FFFFFF", // White for maximum visibility
      strokeWidth: 2.5,  // Slightly thicker
      strokeOpacity: 1,
    },
    indirect: {
      stroke: "#FFFFFF", // White for maximum visibility
      strokeWidth: 2.5,  // Slightly thicker
      strokeOpacity: 1,
    },
  },
}

const DOT_STYLES = {
  direct: {
    radius: 2.5,
    opacity: 1,
    color: "#D1D5DB",
  },
  indirect: {
    radius: 3,
    opacity: 1,
    color: "#E5E7EB",
  },
}

export const animateDotsAlongPaths = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  pathElements: PathElement[],
  userNodes: Node[],
  llmNodes: Node[],
  gpuNodes: Node[],
  gatewayNode: Node,
  queueAnimation: (pathId: string, animationFn: () => void) => void
) => {
  // Store timeouts for cleanup
  const timeouts: NodeJS.Timeout[] = [];
  
  // Add SVG defs for filters
  const defs = svg.append("defs")

  // Create glow filter for dots
  const dotGlow = defs
    .append("filter")
    .attr("id", "dotGlow")
    .attr("height", "300%")
    .attr("width", "300%")
    .attr("x", "-100%")
    .attr("y", "-100%")

  dotGlow.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur")

  dotGlow.append("feMerge").append("feMergeNode").attr("in", "coloredBlur")
  dotGlow.select("feMerge").append("feMergeNode").attr("in", "SourceGraphic")

  // Create glow filter for edges
  const edgeGlow = defs
    .append("filter")
    .attr("id", "edgeGlow")
    .attr("height", "130%")
    .attr("width", "130%")
    .attr("x", "-15%")
    .attr("y", "-15%")

  edgeGlow.append("feGaussianBlur").attr("stdDeviation", "1.5").attr("result", "coloredBlur")

  edgeGlow.append("feMerge").append("feMergeNode").attr("in", "coloredBlur")
  edgeGlow.select("feMerge").append("feMergeNode").attr("in", "SourceGraphic")

  // Create a group for all flow animations
  const flowsGroup = svg.append("g").attr("class", "flows")

  // Initialize all paths with default styling
  pathElements.forEach(({ element }) => {
    d3.select(element)
      .attr("stroke", PATH_STYLES.default.stroke)
      .attr("stroke-width", PATH_STYLES.default.strokeWidth)
      .attr("stroke-opacity", PATH_STYLES.default.strokeOpacity)
      .attr("fill", "none")
  })

  function startAnimations() {
    for (let i = 0; i < 8; i++) {
      const timeout = setTimeout(createDataFlow, i * 300);
      timeouts.push(timeout);
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

    // Define the path segments based on the random choices
    const pathSegments = []

    // First segment: User to Gateway
    const userToGatewayPath = pathElements.find((p) => p.type === "user-to-gateway" && p.source.id === randomUser.id)

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
      const gatewayToLLMPath = pathElements.find((p) => p.type === "gateway-to-llm" && p.target.id === randomLLM.id)

      if (gatewayToLLMPath) {
        pathSegments.push({
          element: gatewayToLLMPath.element,
          duration: 1000,
          reverse: false,
          type: isPentagramRoute ? "indirect" : "direct",
        })

        // LLM back to Gateway (same path, reverse direction)
        pathSegments.push({
          element: gatewayToLLMPath.element,
          duration: 1000,
          reverse: true,
          type: isPentagramRoute ? "indirect" : "direct",
        })
      }
    }

    // Gateway to GPU
    const gatewayToGPUPath = pathElements.find((p) => p.type === "gateway-to-gpu" && p.target.id === randomGPU.id)

    if (gatewayToGPUPath) {
      pathSegments.push({
        element: gatewayToGPUPath.element,
        duration: 1000,
        reverse: false,
        type: isPentagramRoute ? "indirect" : "direct",
      })

      // GPU back to Gateway
      pathSegments.push({
        element: gatewayToGPUPath.element,
        duration: 1000,
        reverse: true,
        type: isPentagramRoute ? "indirect" : "direct",
      })
    }

    if (goThroughLLM) {
      // Gateway to LLM again
      const gatewayToLLMPath = pathElements.find((p) => p.type === "gateway-to-llm" && p.target.id === randomLLM.id)

      if (gatewayToLLMPath) {
        pathSegments.push({
          element: gatewayToLLMPath.element,
          duration: 1000,
          reverse: false,
          type: isPentagramRoute ? "indirect" : "direct",
        })

        // LLM back to Gateway again
        pathSegments.push({
          element: gatewayToLLMPath.element,
          duration: 1000,
          reverse: true,
          type: isPentagramRoute ? "indirect" : "direct",
        })
      }
    }

    // Gateway back to User
    if (userToGatewayPath) {
      pathSegments.push({
        element: userToGatewayPath.element,
        duration: 1000,
        reverse: true,
        type: isPentagramRoute ? "indirect" : "direct",
      })
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
      
      // Find the original path element to get its real type
      const originalPath = pathElements.find(p => p.element === element)
      const isVerticalPath = originalPath && originalPath.type === "gateway-to-llm"
      
      const stylesObject = isVerticalPath ? STRAIGHT_PATH_STYLES : PATH_STYLES
      const styles = stylesObject.active[type === "indirect" ? "indirect" : "direct"]
      const dotStyles = DOT_STYLES[type === "indirect" ? "indirect" : "direct"]

      // Set initial state immediately to prevent flicker
      pathNode
        .attr("stroke", styles.stroke)
        .attr("stroke-width", styles.strokeWidth)
        .attr("stroke-opacity", styles.strokeOpacity)
        .attr("filter", "url(#edgeGlow)")

      // Create and style dot
      const flow = flowsGroup
        .append("circle")
        .attr("r", dotStyles.radius)
        .attr("fill", dotStyles.color)
        .attr("filter", "url(#dotGlow)")
        .attr("opacity", dotStyles.opacity)

      const getPointAtLength = (length: number) => {
        const point = element.getPointAtLength(length)
        return { x: point.x, y: point.y }
      }

      const startLength = reverse ? pathLength : 0
      const endLength = reverse ? 0 : pathLength
      const startPoint = getPointAtLength(startLength)
      
      flow.attr("cx", startPoint.x).attr("cy", startPoint.y)

      // Ensure path stays active during the entire animation
      const flowTransition = flow
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

      // Only reset path styling after flow animation completes
      flowTransition.on("end", () => {
        // Get the default style based on path type
        const defaultStyle = isVerticalPath ? STRAIGHT_PATH_STYLES.default : PATH_STYLES.default
        
        // Reset path to default styling
        pathNode
          .transition()
          .duration(300)
          .attr("stroke", defaultStyle.stroke)
          .attr("stroke-width", defaultStyle.strokeWidth)
          .attr("stroke-opacity", defaultStyle.strokeOpacity)
          .attr("filter", null)
          .on("end", () => {
            // Ensure path remains visible after transition
            pathNode
              .attr("stroke", defaultStyle.stroke)
              .attr("stroke-width", defaultStyle.strokeWidth)
              .attr("stroke-opacity", defaultStyle.strokeOpacity)
          })

        flow.remove()
        animateSegment(segmentIndex + 1)
      })
    }

    animateSegment(0)
  }

  // Start initial animations
  startAnimations();

  // Return cleanup function
  return () => {
    // Clear all timeouts
    timeouts.forEach(timeout => clearTimeout(timeout));
    
    // Remove all animation elements
    flowsGroup.selectAll("*").remove();
    
    // Reset path styles to default
    pathElements.forEach(({ element }) => {
      d3.select(element)
        .attr("stroke", PATH_STYLES.default.stroke)
        .attr("stroke-width", PATH_STYLES.default.strokeWidth)
        .attr("stroke-opacity", PATH_STYLES.default.strokeOpacity);
    });
  };
} 