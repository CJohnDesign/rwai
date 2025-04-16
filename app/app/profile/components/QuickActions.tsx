import Link from "next/link";
import { CreditCard, Server, BarChart3, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

export function QuickActions() {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/billing" className="flex items-center p-3 rounded-lg border border-border hover:bg-muted transition-colors">
          <CreditCard className="h-4 w-4 mr-3 text-primary" />
          <div>
            <h4 className="text-sm font-medium">Manage Billing</h4>
            <p className="text-xs text-muted-foreground">Update payment methods</p>
          </div>
        </Link>
        <Link href="/gpus" className="flex items-center p-3 rounded-lg border border-border hover:bg-muted transition-colors">
          <Server className="h-4 w-4 mr-3 text-primary" />
          <div>
            <h4 className="text-sm font-medium">Manage GPUs</h4>
            <p className="text-xs text-muted-foreground">View and control your GPUs</p>
          </div>
        </Link>
        <Link href="/models" className="flex items-center p-3 rounded-lg border border-border hover:bg-muted transition-colors">
          <BarChart3 className="h-4 w-4 mr-3 text-primary" />
          <div>
            <h4 className="text-sm font-medium">Usage Analytics</h4>
            <p className="text-xs text-muted-foreground">Check inference usage</p>
          </div>
        </Link>
        <Link href="/settings" className="flex items-center p-3 rounded-lg border border-border hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 mr-3 text-primary" />
          <div>
            <h4 className="text-sm font-medium">Notification Settings</h4>
            <p className="text-xs text-muted-foreground">Manage your alerts</p>
          </div>
        </Link>
      </div>
    </Card>
  );
} 