import { Node } from "@/types"

export const createNodes = (nodeData: any[]): Node[] => {
  return nodeData.map((node) => ({
    ...node,
    // Add any additional node properties needed for d3 force simulation
    x: undefined,
    y: undefined,
    vx: undefined,
    vy: undefined,
  }))
} 