import * as d3 from "d3"
import { Node } from "@/types"

export const renderNodeIcons = (nodeGroups: d3.Selection<SVGGElement, Node, SVGGElement, unknown>) => {
  // Add icons to each node type
  nodeGroups
    .filter((d) => d.type === "user")
    .each(function () {
      renderUserIcon(this)
    })

  nodeGroups
    .filter((d) => d.type === "gateway")
    .each(function () {
      renderGatewayIcon(this)
    })

  nodeGroups
    .filter((d) => d.type === "llm")
    .each(function () {
      renderBrainIcon(this)
    })

  nodeGroups
    .filter((d) => d.type === "gpu")
    .each(function () {
      renderChipIcon(this)
    })
}

// User icon
function renderUserIcon(container: SVGGElement) {
  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
  foreignObject.setAttribute("width", "24")
  foreignObject.setAttribute("height", "24")
  foreignObject.setAttribute("x", "-12")
  foreignObject.setAttribute("y", "-12")

  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  iconSvg.setAttribute("width", "24")
  iconSvg.setAttribute("height", "24")
  iconSvg.setAttribute("viewBox", "0 0 24 24")
  iconSvg.setAttribute("fill", "none")
  iconSvg.setAttribute("stroke", "white")
  iconSvg.setAttribute("stroke-width", "2")
  iconSvg.setAttribute("stroke-linecap", "round")
  iconSvg.setAttribute("stroke-linejoin", "round")

  // User icon paths from Lucide
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path1.setAttribute("d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2")
  iconSvg.appendChild(path1)

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  circle.setAttribute("cx", "12")
  circle.setAttribute("cy", "7")
  circle.setAttribute("r", "4")
  iconSvg.appendChild(circle)

  foreignObject.innerHTML = new XMLSerializer().serializeToString(iconSvg)
  container.appendChild(foreignObject)
}

// Gateway icon
function renderGatewayIcon(container: SVGGElement) {
  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
  foreignObject.setAttribute("width", "32")
  foreignObject.setAttribute("height", "32")
  foreignObject.setAttribute("x", "-16")
  foreignObject.setAttribute("y", "-16")

  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  iconSvg.setAttribute("width", "32")
  iconSvg.setAttribute("height", "32")
  iconSvg.setAttribute("viewBox", "0 0 24 24")
  iconSvg.setAttribute("fill", "none")
  iconSvg.setAttribute("stroke", "white")
  iconSvg.setAttribute("stroke-width", "2")
  iconSvg.setAttribute("stroke-linecap", "round")
  iconSvg.setAttribute("stroke-linejoin", "round")

  // Network icon paths from Lucide
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path1.setAttribute("d", "M9 2v6")
  iconSvg.appendChild(path1)

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path2.setAttribute("d", "M15 2v6")
  iconSvg.appendChild(path2)

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path3.setAttribute("d", "M12 16v6")
  iconSvg.appendChild(path3)

  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path4.setAttribute("d", "M4 8h16")
  iconSvg.appendChild(path4)

  const path5 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path5.setAttribute("d", "M6 16h12")
  iconSvg.appendChild(path5)

  const path6 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path6.setAttribute("d", "M8 8v8")
  iconSvg.appendChild(path6)

  const path7 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path7.setAttribute("d", "M16 8v8")
  iconSvg.appendChild(path7)

  foreignObject.innerHTML = new XMLSerializer().serializeToString(iconSvg)
  container.appendChild(foreignObject)
}

// Brain icon
function renderBrainIcon(container: SVGGElement) {
  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
  foreignObject.setAttribute("width", "24")
  foreignObject.setAttribute("height", "24")
  foreignObject.setAttribute("x", "-12")
  foreignObject.setAttribute("y", "-12")

  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  iconSvg.setAttribute("width", "24")
  iconSvg.setAttribute("height", "24")
  iconSvg.setAttribute("viewBox", "0 0 24 24")
  iconSvg.setAttribute("fill", "none")
  iconSvg.setAttribute("stroke", "white")
  iconSvg.setAttribute("stroke-width", "2")
  iconSvg.setAttribute("stroke-linecap", "round")
  iconSvg.setAttribute("stroke-linejoin", "round")

  // Brain icon paths from Lucide
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path1.setAttribute(
    "d",
    "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z",
  )
  iconSvg.appendChild(path1)

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path2.setAttribute(
    "d",
    "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z",
  )
  iconSvg.appendChild(path2)

  foreignObject.innerHTML = new XMLSerializer().serializeToString(iconSvg)
  container.appendChild(foreignObject)
}

// Chip icon
function renderChipIcon(container: SVGGElement) {
  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
  foreignObject.setAttribute("width", "24")
  foreignObject.setAttribute("height", "24")
  foreignObject.setAttribute("x", "-12")
  foreignObject.setAttribute("y", "-12")

  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  iconSvg.setAttribute("width", "24")
  iconSvg.setAttribute("height", "24")
  iconSvg.setAttribute("viewBox", "0 0 24 24")
  iconSvg.setAttribute("fill", "none")
  iconSvg.setAttribute("stroke", "white")
  iconSvg.setAttribute("stroke-width", "2")
  iconSvg.setAttribute("stroke-linecap", "round")
  iconSvg.setAttribute("stroke-linejoin", "round")

  // New chip icon with a single chip design
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rect.setAttribute("x", "4")
  rect.setAttribute("y", "4")
  rect.setAttribute("width", "16")
  rect.setAttribute("height", "16")
  rect.setAttribute("rx", "2")
  rect.setAttribute("ry", "2")
  iconSvg.appendChild(rect)

  // Add pins to the chip
  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line1.setAttribute("x1", "9")
  line1.setAttribute("y1", "1")
  line1.setAttribute("x2", "9")
  line1.setAttribute("y2", "4")
  iconSvg.appendChild(line1)

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line2.setAttribute("x1", "15")
  line2.setAttribute("y1", "1")
  line2.setAttribute("x2", "15")
  line2.setAttribute("y2", "4")
  iconSvg.appendChild(line2)

  const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line3.setAttribute("x1", "9")
  line3.setAttribute("y1", "20")
  line3.setAttribute("x2", "9")
  line3.setAttribute("y2", "23")
  iconSvg.appendChild(line3)

  const line4 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line4.setAttribute("x1", "15")
  line4.setAttribute("y1", "20")
  line4.setAttribute("x2", "15")
  line4.setAttribute("y2", "23")
  iconSvg.appendChild(line4)

  const line5 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line5.setAttribute("x1", "20")
  line5.setAttribute("y1", "9")
  line5.setAttribute("x2", "23")
  line5.setAttribute("y2", "9")
  iconSvg.appendChild(line5)

  const line6 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line6.setAttribute("x1", "20")
  line6.setAttribute("y1", "14")
  line6.setAttribute("x2", "23")
  line6.setAttribute("y2", "14")
  iconSvg.appendChild(line6)

  const line7 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line7.setAttribute("x1", "1")
  line7.setAttribute("y1", "9")
  line7.setAttribute("x2", "4")
  line7.setAttribute("y2", "9")
  iconSvg.appendChild(line7)

  const line8 = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line8.setAttribute("x1", "1")
  line8.setAttribute("y1", "14")
  line8.setAttribute("x2", "4")
  line8.setAttribute("y2", "14")
  iconSvg.appendChild(line8)

  // Add inner details to the chip
  const innerRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  innerRect.setAttribute("x", "9")
  innerRect.setAttribute("y", "9")
  innerRect.setAttribute("width", "6")
  innerRect.setAttribute("height", "6")
  iconSvg.appendChild(innerRect)

  foreignObject.innerHTML = new XMLSerializer().serializeToString(iconSvg)
  container.appendChild(foreignObject)
} 