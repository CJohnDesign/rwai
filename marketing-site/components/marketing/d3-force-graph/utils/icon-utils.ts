import * as d3 from "d3"
import type { Node } from "@/types"
import { renderUserIcon } from "@/components/icons/user-icon"
import { renderGatewayIcon } from "@/components/icons/gateway-icon"
import { renderBrainIcon } from "@/components/icons/brain-icon"
import { renderCogIcon } from "@/components/icons/cog-icon"
import { renderChipIcon } from "@/components/icons/chip-icon"

export const renderNodeIcons = (nodeGroups: d3.Selection<SVGGElement, any, SVGGElement, unknown>) => {
  nodeGroups.each(function(d) {
    const node = d3.select(this)
    const type = d.type

    // Add icon based on node type
    switch (type) {
      case "user":
        node
          .append("text")
          .attr("class", "text-white")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-family", "var(--font-sans)")
          .attr("font-size", "14px")
          .text("👤")
        break
      case "gateway":
        node
          .append("text")
          .attr("class", "text-white")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-family", "var(--font-sans)")
          .attr("font-size", "24px")
          .text("🌐")
        break
      case "llm":
        node
          .append("text")
          .attr("class", "text-white")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-family", "var(--font-sans)")
          .attr("font-size", "18px")
          .text("🤖")
        break
      case "gpu":
        node
          .append("text")
          .attr("class", "text-white")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-family", "var(--font-sans)")
          .attr("font-size", "18px")
          .text("🎮")
        break
    }
  })
}

