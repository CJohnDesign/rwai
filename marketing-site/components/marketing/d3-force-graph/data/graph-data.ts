export const graphData = {
  nodes: [
    { id: "user1", type: "user" },
    { id: "gateway", type: "gateway" },
    { id: "llm1", type: "llm" },
    { id: "llm2", type: "llm" },
    { id: "gpu1", type: "gpu" },
    { id: "gpu2", type: "gpu" },
    { id: "gpu3", type: "gpu" },
  ],
  links: [
    { source: "user1", target: "gateway" },
    { source: "gateway", target: "llm1" },
    { source: "gateway", target: "llm2" },
    { source: "llm1", target: "gpu1" },
    { source: "llm1", target: "gpu2" },
    { source: "llm2", target: "gpu2" },
    { source: "llm2", target: "gpu3" },
  ],
}

