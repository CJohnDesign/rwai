# Inference Component Documentation

## Overview
The Inference component (`components/d3/Inference.tsx`) is a D3-based visualization that demonstrates the interaction between users, RWAi's central processing, and various AI models. It creates an interactive network visualization with animated data flow representation.

## Core Features

### 1. Node Structure
- **User Profile Nodes**: Displayed at the top of the visualization
- **Central RWAi Node**: Positioned in the center, representing the RWAi GPU processing
- **Model Nodes**: Positioned at the bottom, showing different AI models (Llama 2, Mistral AI, DeepSeek, Black Forest)

### 2. Animation System
The component features a dot animation system that visualizes data flow between nodes:

```typescript
const animateDot = (sourceNode: Node, nextAnimation: () => void) => {
  // Animation sequence:
  // 1. User to Logo
  // 2. Logo to Model
  // 3. Short pause
  // 4. Model back to Logo
  // 5. Logo back to User
}
```

### 3. Visual Effects
- Motion blur on animated dots
- Hover effects on nodes with tooltips
- Curved connection lines between nodes
- Responsive SVG layout

## Removed Feature: Profile Switching Animation

The profile switching animation was temporarily removed to improve mobile performance. Here's how to reimplement it if needed:

### Implementation Steps

1. Add the animation code in the `animateDot` function after the dot animation sequence:

```typescript
animateAlongPath(userToLogoPath, dotGroup, 'logo-to-user', 250, () => {
  dotGroup.remove();
  
  // Start user transition after 2 seconds
  setTimeout(() => {
    // Get a new random user profile
    const newProfile = userProfiles[Math.floor(Math.random() * userProfiles.length)];
    
    // Find the node in the visualization
    const nodeSelection = nodesGroup.select(`circle[data-id="${sourceNode.id}"]`);
    
    // Create temporary node for crossfade
    const tempNode = nodesGroup.append("circle")
      .attr("r", sourceNode.size || 65)
      .attr("cx", sourceNode.x)
      .attr("cy", sourceNode.y)
      .style("fill", (d, i) => {
        // Create pattern for temp node
        const tempPatternId = `temp-pattern-${Date.now()}`;
        defs.append("pattern")
          .attr("id", tempPatternId)
          .attr("width", 1)
          .attr("height", 1)
          .append("image")
          .attr("href", newProfile.image)
          .attr("width", (sourceNode.size || 65) * 2)
          .attr("height", (sourceNode.size || 65) * 2)
          .attr("preserveAspectRatio", "xMidYMid slice");
        return `url(#${tempPatternId})`;
      })
      .style("stroke", "#002fa7")
      .style("stroke-width", 1.25)
      .style("stroke-opacity", 0.8)
      .style("opacity", 0);

    // Crossfade animation
    nodeSelection
      .transition()
      .duration(500)
      .style("opacity", 0);

    tempNode
      .transition()
      .duration(500)
      .style("opacity", 1)
      .on("end", () => {
        // Update original node
        const nodeIndex = nodes.indexOf(sourceNode);
        defs.select(`#node-${nodeIndex} image`)
          .attr("href", newProfile.image);
        
        // Update node data
        sourceNode.image = newProfile.image;
        sourceNode.label = newProfile.title;
        
        // Cleanup
        nodeSelection.style("opacity", 1);
        tempNode.remove();
        defs.selectAll("pattern[id^='temp-pattern-']").remove();
      });
  }, 2000);
  
  nextAnimation();
});
```

### Performance Considerations

When reimplementing the profile switching animation, consider these optimizations:

1. **Mobile Detection**
```typescript
const isMobile = window.innerWidth < 768;
const transitionDelay = isMobile ? 1000 : 2000; // Shorter delay on mobile
```

2. **Simplified Transition**
```typescript
// Alternative simpler transition without temporary nodes
nodeSelection
  .style("opacity", 1)
  .transition()
  .duration(300)
  .style("opacity", 0)
  .on("end", () => {
    defs.select(`#node-${nodeIndex} image`)
      .attr("href", newProfile.image);
    nodeSelection
      .transition()
      .duration(300)
      .style("opacity", 1);
  });
```

3. **Pattern Management**
- Pre-generate patterns for all user profiles
- Implement pattern pooling to reuse patterns
- Clean up unused patterns periodically

### Alternative Approaches

1. **CSS-based Transition**
- Use CSS classes for transitions instead of D3
- Leverage hardware acceleration with `transform` properties

2. **Reduced Animation Complexity**
- Skip crossfade, use simple opacity transition
- Update image directly without temporary nodes

3. **Batch Updates**
- Group multiple profile updates together
- Implement a queue system for smoother transitions

## Maintenance Notes

- Keep user profile array (`userProfiles`) updated with correct image paths
- Ensure proper cleanup of SVG elements and patterns
- Monitor memory usage with Chrome DevTools
- Test transitions on various mobile devices
- Consider implementing feature flags for enabling/disabling animations 