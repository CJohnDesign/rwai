// Inside the useEffect hook, update the node colors
    // Add circles for each node
    nodeGroups
      .append("circle")
      .attr("r", (d) => {
        if (d.type === "user") return 25
        if (d.type === "gateway") return 45
        if (d.type === "llm") return 30
        if (d.type === "gpu") return 30
        return 30
      })
      .attr("class", (d) => {
        if (d.type === "user") return "dark:fill-gray-800 fill-gray-100 dark:stroke-gray-700 stroke-gray-300"
        if (d.type === "gateway") return "dark:fill-gray-900 fill-gray-50 dark:stroke-gray-700 stroke-gray-300"
        if (d.type === "llm") return "dark:fill-gray-800 fill-gray-100 dark:stroke-gray-700 stroke-gray-300"
        if (d.type === "gpu") return "dark:fill-gray-800 fill-gray-100 dark:stroke-gray-700 stroke-gray-300"
        return "dark:fill-gray-800 fill-gray-100 dark:stroke-gray-700 stroke-gray-300"
      })
      .attr("stroke-width", 1) 