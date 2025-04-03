export function renderCogIcon(container: SVGGElement) {
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

  // Cog icon paths from Lucide
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("d", "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z")
  iconSvg.appendChild(path)

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path2.setAttribute("d", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z")
  iconSvg.appendChild(path2)

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path3.setAttribute("d", "M12 2v2")
  iconSvg.appendChild(path3)

  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path4.setAttribute("d", "M12 22v-2")
  iconSvg.appendChild(path4)

  const path5 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path5.setAttribute("d", "m17 20.66-1-1.73")
  iconSvg.appendChild(path5)

  const path6 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path6.setAttribute("d", "M11 10.27 7 3.34")
  iconSvg.appendChild(path6)

  const path7 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path7.setAttribute("d", "m20.66 17-1.73-1")
  iconSvg.appendChild(path7)

  const path8 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path8.setAttribute("d", "m3.34 7 1.73 1")
  iconSvg.appendChild(path8)

  const path9 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path9.setAttribute("d", "M14 12h8")
  iconSvg.appendChild(path9)

  const path10 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path10.setAttribute("d", "M2 12h2")
  iconSvg.appendChild(path10)

  const path11 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path11.setAttribute("d", "m20.66 7-1.73 1")
  iconSvg.appendChild(path11)

  const path12 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path12.setAttribute("d", "m3.34 17 1.73-1")
  iconSvg.appendChild(path12)

  const path13 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path13.setAttribute("d", "m17 3.34-1 1.73")
  iconSvg.appendChild(path13)

  const path14 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path14.setAttribute("d", "m7 20.66 1-1.73")
  iconSvg.appendChild(path14)

  foreignObject.innerHTML = new XMLSerializer().serializeToString(iconSvg)
  container.appendChild(foreignObject)
}

