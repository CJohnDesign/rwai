import type { SimulationNodeDatum } from "d3"
import type * as d3 from "d3"

export interface Node extends SimulationNodeDatum {
  id: string
  type: string
  index?: number
}

export interface Link {
  source: string
  target: string
}

export interface PathElement {
  id: string
  element: SVGPathElement | null
  source: Node
  target: Node
  type: string
}

export interface PositionedNodes {
  userNodes: Node[]
  gatewayNode: Node
  llmNodes: Node[]
  gpuNodes: Node[]
  verticalPadding: number
  layerSpacing: number
  userY: number
  gatewayY: number
  gatewayX: number
  gpuY: number
  gpuSpacing: number
}

export interface ConnectionsParams extends PositionedNodes {
  linksGroup: d3.Selection<SVGGElement, unknown, null, undefined>
}

