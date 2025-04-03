export function renderUserIcon(container: SVGGElement) {
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

