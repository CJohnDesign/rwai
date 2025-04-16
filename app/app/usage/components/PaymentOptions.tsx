import { Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PaymentOptionsProps {
  onContactSales: () => void;
}

export function PaymentOptions({ onContactSales }: PaymentOptionsProps) {
  return (
    <Card className="p-6 bg-muted/30">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-md">
          <Rocket className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-1">Pay after-the-fact with monthly invoicing</h3>
          <p className="text-xs text-muted-foreground">
            For enterprise customers or those with high usage needs, we offer monthly invoicing options.
            Contact our sales team to discuss custom pricing and payment terms.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onContactSales}
          className="whitespace-nowrap"
        >
          Contact Sales
        </Button>
      </div>
    </Card>
  );
} 