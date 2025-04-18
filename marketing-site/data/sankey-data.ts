// Data structure for Sankey diagram showing investment flow and yield distribution
// This represents the flow of funds through the RWAi ecosystem

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export interface SankeyNode {
  name: string;
  category: string;
  description?: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

// Define the Sankey diagram data
export const sankeyData: SankeyData = {
  nodes: [
    // Investment sources
    { name: "Retail Investors", category: "investors", description: "Individual token holders" },
    { name: "Institutional Investors", category: "investors", description: "Funds and organizations" },
    { name: "Treasury", category: "investors", description: "RWAi protocol treasury" },
    
    // Platform components
    { name: "Token Sale", category: "platform", description: "Initial and ongoing token sales" },
    { name: "RWAi Platform", category: "platform", description: "Central platform managing tokenized GPU assets" },
    
    // Infrastructure
    { name: "GPU Acquisition", category: "infrastructure", description: "Purchase of high-performance GPUs" },
    { name: "Data Center Operations", category: "infrastructure", description: "Running and maintaining data centers" },
    { name: "Model Deployment", category: "infrastructure", description: "Deploying AI models on infrastructure" },
    
    // Services
    { name: "Inference Services", category: "services", description: "AI inference for customers" },
    { name: "Compute Services", category: "services", description: "General AI compute services" },
    { name: "API Access", category: "services", description: "API endpoints for AI models" },
    
    // Revenue streams
    { name: "Service Revenue", category: "revenue", description: "Income from all services" },
    
    // Distribution
    { name: "Operating Costs", category: "costs", description: "Costs of running the infrastructure" },
    { name: "Expansion Fund", category: "reinvestment", description: "Capital for expanding operations" },
    { name: "USDC Yield", category: "yield", description: "Stablecoin returns to token holders" },
    { name: "Token Holders", category: "beneficiaries", description: "Recipients of yield" }
  ],
  
  links: [
    // Investment inflows - simplified to make values clearer
    { source: "Retail Investors", target: "Token Sale", value: 40, color: "#073ABC" },
    { source: "Institutional Investors", target: "Token Sale", value: 40, color: "#073ABC" },
    { source: "Treasury", target: "Token Sale", value: 20, color: "#073ABC" },
    
    // Token sale to platform - total 100
    { source: "Token Sale", target: "RWAi Platform", value: 100, color: "#073ABC" },
    
    // Platform to infrastructure - total 100
    { source: "RWAi Platform", target: "GPU Acquisition", value: 60, color: "#3B82F6" },
    { source: "RWAi Platform", target: "Data Center Operations", value: 25, color: "#3B82F6" },
    { source: "RWAi Platform", target: "Model Deployment", value: 15, color: "#3B82F6" },
    
    // Infrastructure to services - simplified and balanced
    // GPU Acquisition (60) to services
    { source: "GPU Acquisition", target: "Inference Services", value: 30, color: "#10B981" },
    { source: "GPU Acquisition", target: "Compute Services", value: 30, color: "#10B981" },
    
    // Data Center Operations (25) to services
    { source: "Data Center Operations", target: "Inference Services", value: 10, color: "#10B981" },
    { source: "Data Center Operations", target: "Compute Services", value: 10, color: "#10B981" },
    { source: "Data Center Operations", target: "API Access", value: 5, color: "#10B981" },
    
    // Model Deployment (15) to services
    { source: "Model Deployment", target: "Inference Services", value: 5, color: "#10B981" },
    { source: "Model Deployment", target: "API Access", value: 10, color: "#10B981" },
    
    // Services to revenue - total 100
    { source: "Inference Services", target: "Service Revenue", value: 45, color: "#8B5CF6" },
    { source: "Compute Services", target: "Service Revenue", value: 40, color: "#8B5CF6" },
    { source: "API Access", target: "Service Revenue", value: 15, color: "#8B5CF6" },
    
    // Revenue distribution - total 100
    { source: "Service Revenue", target: "Operating Costs", value: 30, color: "#EC4899" },
    { source: "Service Revenue", target: "Expansion Fund", value: 20, color: "#EC4899" },
    { source: "Service Revenue", target: "USDC Yield", value: 50, color: "#EC4899" },
    
    // Yield to token holders
    { source: "USDC Yield", target: "Token Holders", value: 50, color: "#F59E0B" }
  ]
};

// Calculate percentages for key metrics
export const yieldMetrics = {
  totalInvestment: 100, // Total investment in millions USD
  annualRevenue: 100, // Annual revenue in millions USD
  operatingCosts: 30, // Operating costs in millions USD
  expansionFund: 20, // Expansion fund in millions USD
  usdcYield: 50, // USDC yield in millions USD
  yieldPercentage: 50, // Yield as percentage of total revenue
  projectedAnnualYield: 15, // Projected annual yield percentage for token holders
};

// Monthly yield projection data (12 months)
export const monthlyYieldProjection = [
  { month: "Jan", yield: 3.8 },
  { month: "Feb", yield: 4.1 },
  { month: "Mar", yield: 4.3 },
  { month: "Apr", yield: 4.5 },
  { month: "May", yield: 4.7 },
  { month: "Jun", yield: 4.9 },
  { month: "Jul", yield: 5.1 },
  { month: "Aug", yield: 5.3 },
  { month: "Sep", yield: 5.5 },
  { month: "Oct", yield: 5.7 },
  { month: "Nov", yield: 5.9 },
  { month: "Dec", yield: 6.2 }
]; 