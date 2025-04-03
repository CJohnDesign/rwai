import * as d3 from "d3"
import { Node } from "../types"

export const createGPUContainer = (
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  gpuNodes: Node[],
  gpuSpacing: number,
  gpuY: number,
) => {
  return g
    .append("rect")
    .attr("x", gpuSpacing * 0.5)
    .attr("y", gpuY - 40)
    .attr("width", gpuSpacing * (gpuNodes.length + 0.5) - gpuSpacing * 0.5)
    .attr("height", 80)
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("class", "fill-accent/10 stroke-accent/20")
    .attr("stroke-width", 2)
}

