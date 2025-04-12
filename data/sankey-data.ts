export interface SankeyData {
  nodes: Array<{
    name: string;
    category: string;
    value?: number;
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
    color?: string;
  }>;
} 