// Data for AI inference growth over the next 5 years (2025-2029)
// Values represent daily inference requests in billions

export const inferenceGrowthData = [
  { year: 2025, value: 2 },       // Starting point: 2 billion requests per day
  { year: 2026, value: 20 },      // 10x growth
  { year: 2027, value: 100 },     // 5x growth
  { year: 2028, value: 500 },     // 5x growth
  { year: 2029, value: 2000 }     // 4x growth, reaching 1000x the initial value
];

// Additional data points for a more detailed curve
export const detailedInferenceGrowthData = [
  { year: 2025.0, value: 2 },
  { year: 2025.25, value: 4 },
  { year: 2025.5, value: 8 },
  { year: 2025.75, value: 15 },
  { year: 2026.0, value: 20 },
  { year: 2026.25, value: 30 },
  { year: 2026.5, value: 45 },
  { year: 2026.75, value: 70 },
  { year: 2027.0, value: 100 },
  { year: 2027.25, value: 150 },
  { year: 2027.5, value: 225 },
  { year: 2027.75, value: 350 },
  { year: 2028.0, value: 500 },
  { year: 2028.25, value: 750 },
  { year: 2028.5, value: 1100 },
  { year: 2028.75, value: 1500 },
  { year: 2029.0, value: 2000 }
];

// Annotations for key milestones
export const inferenceGrowthAnnotations = [
  {
    year: 2025,
    value: 2,
    label: "Current State",
    description: "2B daily inference requests"
  },
  {
    year: 2027,
    value: 100,
    label: "50x Growth",
    description: "Mainstream AI adoption"
  },
  {
    year: 2029,
    value: 2000,
    label: "1,000x Growth",
    description: "Projected demand requiring $6T in GPUs"
  }
]; 