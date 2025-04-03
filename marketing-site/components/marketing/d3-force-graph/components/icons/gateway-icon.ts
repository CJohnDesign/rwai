export function renderGatewayIcon(container: SVGGElement) {
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

