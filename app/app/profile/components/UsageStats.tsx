import { Card } from "@/components/ui/card";

interface UsageStatsProps {
  stats: {
    balance: string;
    gpusUsed: number;
    totalSpend: string;
  };
}

export function UsageStats({ stats }: UsageStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Account Balance</span>
          <span className="text-lg font-medium text-green-500 dark:text-green-400">{stats.balance}</span>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">GPUs Used</span>
          <span className="text-lg font-medium">{stats.gpusUsed}</span>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Total Spend</span>
          <span className="text-lg font-medium text-red-500 dark:text-red-400">{stats.totalSpend}</span>
        </div>
      </Card>
    </div>
  );
} 