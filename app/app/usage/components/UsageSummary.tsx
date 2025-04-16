import { BarChart3, Cpu, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

interface UsageItem {
  id: string;
  name: string;
  usage: number;
  cost: string;
  type: "model" | "gpu";
}

interface UsageSummaryProps {
  usageData: UsageItem[];
  period: string;
}

export function UsageSummary({ usageData, period }: UsageSummaryProps) {
  // Separate models and GPUs
  const modelUsage = usageData.filter(item => item.type === "model");
  const gpuUsage = usageData.filter(item => item.type === "gpu");
  
  // Calculate totals
  const totalCost = usageData.reduce((sum, item) => {
    const cost = parseFloat(item.cost.replace(/[^0-9.-]+/g, ""));
    return sum + cost;
  }, 0);
  
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/10 p-2 rounded-md">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium">Usage Summary</h3>
          <p className="text-xs text-muted-foreground">{period}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Model Usage */}
        {modelUsage.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Model Usage</h4>
            </div>
            <div className="space-y-3">
              {modelUsage.map(model => (
                <div key={model.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm">{model.name}</p>
                    <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${Math.min(model.usage, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium">{model.cost}</p>
                    <p className="text-xs text-muted-foreground">{model.usage.toLocaleString()} requests</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* GPU Usage */}
        {gpuUsage.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">GPU Usage</h4>
            </div>
            <div className="space-y-3">
              {gpuUsage.map(gpu => (
                <div key={gpu.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm">{gpu.name}</p>
                    <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${Math.min(gpu.usage, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium">{gpu.cost}</p>
                    <p className="text-xs text-muted-foreground">{gpu.usage.toLocaleString()} hours</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Total */}
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Total Cost</p>
            <p className="text-lg font-bold">${totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
} 