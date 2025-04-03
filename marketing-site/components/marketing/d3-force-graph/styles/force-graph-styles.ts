// Style constants for the force graph
export const PATH_STYLES = {
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
  types: {
    userGateway: {
      stroke: "var(--muted)",
      strokeWidth: 1.5,
      strokeOpacity: 0.8,
    },
    gatewayLLM: {
      stroke: "var(--muted)",
      strokeWidth: 2,
      strokeOpacity: 0.8,
    },
    llmGPU: {
      stroke: "var(--muted)",
      strokeWidth: 1.5,
      strokeOpacity: 0.8,
    },
  },
}

export const DOT_STYLES = {
  direct: {
    radius: 2.5,
    fill: "var(--primary)",
    opacity: 1,
    glow: {
      color: "var(--primary)",
      blur: 3,
      spread: 2,
    },
  },
  indirect: {
    radius: 3,
    fill: "var(--secondary)",
    opacity: 0.8,
    glow: {
      color: "var(--secondary)",
      blur: 4,
      spread: 3,
    },
  },
}

export const GLOW_FILTERS = {
  dot: {
    id: "dotGlow",
    height: "300%",
    width: "300%",
    x: "-100%",
    y: "-100%",
    blur: 3,
  },
  edge: {
    id: "edgeGlow",
    height: "130%",
    width: "130%",
    x: "-15%",
    y: "-15%",
    blur: 1.5,
  },
} 