import { Download, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  id: string;
  date: string;
  type: "invoice" | "credit";
  status: "paid" | "pending" | "expiring";
  expiryDate?: string;
  amount: string;
}

interface InvoiceHistoryProps {
  invoices: Invoice[];
  onDownload: (id: string) => void;
  onView: (id: string) => void;
}

export function InvoiceHistory({ invoices, onDownload, onView }: InvoiceHistoryProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-medium">Invoice history</h3>
        <p className="text-xs text-muted-foreground">Invoices are issued when credits are purchased.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Type</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Amount</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border">
                <td className="py-3 px-4 text-sm">{invoice.date}</td>
                <td className="py-3 px-4 text-sm capitalize">{invoice.type}</td>
                <td className="py-3 px-4">
                  {invoice.status === "paid" && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Paid
                    </Badge>
                  )}
                  {invoice.status === "pending" && (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                      Pending
                    </Badge>
                  )}
                  {invoice.status === "expiring" && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                      Expiring {invoice.expiryDate}
                    </Badge>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-right">{invoice.amount}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    {invoice.type === "invoice" && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDownload(invoice.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onView(invoice.id)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {invoices.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">No invoices found</p>
        </div>
      )}
    </Card>
  );
} 