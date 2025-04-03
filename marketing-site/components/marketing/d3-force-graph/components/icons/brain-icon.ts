export function renderBrainIcon(container: SVGGElement) {
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

