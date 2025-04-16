'use client';

import React, { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 4;
const ALIVE_COLOR = 'rgb(234, 88, 12)';
const ANIMATION_SPEED = 8;
const EDGE_MARGIN = 30;
const GROWTH_INTERVAL = 45;
const INITIAL_SIZE = 10;
const MAX_SIZE = 35;
const GROWTH_RATE = 0.5;

export function GameOfLifeBackground({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const gridRef = useRef<boolean[][]>([]);
  const animationFrameRef = useRef<number>(0);
  const growthCountRef = useRef<number>(0);
  const splotchesRef = useRef<Array<{x: number, y: number, size: number}>>([]);
  const isGrowingRef = useRef<boolean>(true);

  const initGrid = (cols: number, rows: number) => {
    const grid: boolean[][] = Array(rows).fill(0).map(() => Array(cols).fill(false));
    
    // Create 3-6 random starting positions
    const numStartingPoints = 3 + Math.floor(Math.random() * 4);
    
    // Generate random positions, ensuring they're not too close to each other
    const minDistance = Math.min(cols, rows) * 0.2; // Minimum distance between points
    const positions: Array<{x: number, y: number}> = [];
    
    for (let i = 0; i < numStartingPoints; i++) {
      let attempts = 0;
      let validPosition = false;
      let newPos;
      
      // Try to find a position that's not too close to existing ones
      while (!validPosition && attempts < 20) {
        newPos = {
          x: EDGE_MARGIN + Math.random() * (cols - 2 * EDGE_MARGIN),
          y: EDGE_MARGIN + Math.random() * (rows - 2 * EDGE_MARGIN)
        };
        
        validPosition = true;
        // Check distance from all existing positions
        for (const pos of positions) {
          const distance = Math.sqrt(
            Math.pow(newPos.x - pos.x, 2) + 
            Math.pow(newPos.y - pos.y, 2)
          );
          if (distance < minDistance) {
            validPosition = false;
            break;
          }
        }
        attempts++;
      }
      
      if (validPosition && newPos) {
        positions.push(newPos);
      }
    }

    // Store initial splotch positions and sizes
    splotchesRef.current = positions.map(pos => ({
      x: pos.x,
      y: pos.y,
      size: INITIAL_SIZE * (0.7 + Math.random() * 0.6) // Vary initial sizes slightly
    }));

    // Create initial tiny splotches
    splotchesRef.current.forEach(splotch => {
      createSplotch(splotch.x, splotch.y, splotch.size, grid);
    });

    return grid;
  };

  // Modified createSplotch to be more controlled
  const createSplotch = (baseX: number, baseY: number, size: number, grid: boolean[][]) => {
    const cols = grid[0].length;
    const rows = grid.length;
    
    // Smaller core for initial states
    const coreRadius = Math.floor(size * 0.4);
    for (let dy = -coreRadius; dy <= coreRadius; dy++) {
      for (let dx = -coreRadius; dx <= coreRadius; dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= coreRadius) {
          const x = Math.floor((baseX + dx + cols) % cols);
          const y = Math.floor((baseY + dy + rows) % rows);
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            // More controlled initial density
            if (Math.random() < 0.6 * (1 - dist / coreRadius)) {
              grid[y][x] = true;
            }
          }
        }
      }
    }

    // Add fewer, smaller tendrils for initial states
    const numTendrils = Math.max(2, Math.floor(size / 5)); // Scale tendrils with size
    for (let i = 0; i < numTendrils; i++) {
      const angle = (Math.PI * 2 * i) / numTendrils + (Math.random() - 0.5) * 0.5;
      const distance = Math.floor(size * (0.3 + Math.random() * 0.3));
      const offsetX = Math.floor(Math.cos(angle) * distance);
      const offsetY = Math.floor(Math.sin(angle) * distance);

      // Small organic shapes for tendrils
      const tendrilSize = Math.floor(size * 0.3);
      for (let dy = -tendrilSize; dy <= tendrilSize; dy++) {
        for (let dx = -tendrilSize; dx <= tendrilSize; dx++) {
          const x = Math.floor((baseX + dx + offsetX + cols) % cols);
          const y = Math.floor((baseY + dy + offsetY + rows) % rows);
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            if (Math.random() < 0.3) {
              grid[y][x] = true;
            }
          }
        }
      }
    }
  };

  const growSplotches = (grid: boolean[][], cols: number, rows: number) => {
    // Clear the grid
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = false;
      }
    }

    // Grow each splotch
    splotchesRef.current = splotchesRef.current.map(splotch => {
      const newSize = splotch.size + GROWTH_RATE;
      if (newSize >= MAX_SIZE) {
        isGrowingRef.current = false;
      }
      return {
        ...splotch,
        size: Math.min(MAX_SIZE, newSize)
      };
    });

    // Redraw all splotches at their new sizes
    splotchesRef.current.forEach(splotch => {
      createSplotch(splotch.x, splotch.y, splotch.size, grid);
    });

    return grid;
  };

  // Calculate next generation
  const nextGeneration = (grid: boolean[][], cols: number, rows: number) => {
    const next = grid.map(arr => [...arr]);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbors = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            const ni = (i + di + rows) % rows;
            const nj = (j + dj + cols) % cols;
            if (grid[ni][nj]) neighbors++;
          }
        }

        if (grid[i][j]) {
          next[i][j] = neighbors === 2 || neighbors === 3;
        } else {
          next[i][j] = neighbors === 3;
        }
      }
    }

    return next;
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, grid: boolean[][], cols: number, rows: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = ALIVE_COLOR;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j]) {
          ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.ceil(rect.width / CELL_SIZE) * CELL_SIZE;
        const height = Math.ceil(rect.height / CELL_SIZE) * CELL_SIZE;
        setDimensions({ width, height });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const cols = Math.floor(dimensions.width / CELL_SIZE);
    const rows = Math.floor(dimensions.height / CELL_SIZE);
    
    // Only initialize grid if it doesn't exist or dimensions have changed significantly
    if (!gridRef.current || 
        gridRef.current.length !== rows || 
        gridRef.current[0].length !== cols) {
      gridRef.current = initGrid(cols, rows);
      growthCountRef.current = 0;
      isGrowingRef.current = true;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    let frameCount = 0;
    const animate = () => {
      if (frameCount % ANIMATION_SPEED === 0) {
        // Only grow if we're still in the growing phase
        if (isGrowingRef.current) {
          growthCountRef.current++;
          if (growthCountRef.current >= GROWTH_INTERVAL) {
            growthCountRef.current = 0;
            gridRef.current = growSplotches(gridRef.current, cols, rows);
          }
        }

        drawGrid(ctx, gridRef.current, cols, rows);
        gridRef.current = nextGeneration(gridRef.current, cols, rows);
      }
      frameCount++;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none -z-10"
    />
  );
} 