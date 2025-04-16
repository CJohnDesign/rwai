import { CreditCard, RefreshCw, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CreditBalanceProps {
  balance: string;
  cardInfo?: {
    type: string;
    lastFour: string;
  };
  autoReloadEnabled: boolean;
  onBuyCredits: () => void;
  onToggleAutoReload: () => void;
}

export function CreditBalance({ 
  balance, 
  cardInfo, 
  autoReloadEnabled, 
  onBuyCredits, 
  onToggleAutoReload 
}: CreditBalanceProps) {
  return (
    <Card className="p-6 bg-card">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium">Credit balance</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Your credit balance will be consumed with API, model inference and GPU usage. You can buy credits directly or set up auto-reload thresholds.
          </p>
          
          <div className="flex flex-col">
            <span className="text-3xl font-bold">${balance}</span>
            <span className="text-sm text-muted-foreground">Remaining Balance</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-between gap-4 md:w-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Charged to</span>
              <div className="flex items-center gap-2">
                {cardInfo ? (
                  <>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cardInfo.type} •••• {cardInfo.lastFour}</span>
                  </>
                ) : (
                  <span className="text-sm">No payment method</span>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onBuyCredits}
              className="w-full"
            >
              Buy credits
            </Button>
          </div>
          
          <div className="flex items-start gap-2 p-3 rounded-md bg-muted/50 border border-border">
            <div className="mt-0.5">
              {autoReloadEnabled ? (
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              ) : (
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs">
                {autoReloadEnabled 
                  ? "Auto reload is enabled. Credits will be automatically purchased when your balance is low."
                  : "Auto reload is disabled. Enable auto reload to avoid API interruptions when credits are fully spent."}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onToggleAutoReload}
            >
              {autoReloadEnabled ? "Edit" : "Enable"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 