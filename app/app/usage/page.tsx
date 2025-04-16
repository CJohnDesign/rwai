"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsageSummary } from "./components/UsageSummary";
import { CreditBalance } from "./components/CreditBalance";
import { InvoiceHistory } from "./components/InvoiceHistory";
import { PaymentOptions } from "./components/PaymentOptions";
import { WhitelistOverlay } from "../../../components/app-dashboard/whitelist-overlay";

// Mock data for the usage page
const mockUsageData = [
  {
    id: "model-1",
    name: "LLaMA 3.1",
    usage: 75,
    cost: "$120.50",
    type: "model" as const
  },
  {
    id: "model-2",
    name: "DeepSeek-R1",
    usage: 45,
    cost: "$85.25",
    type: "model" as const
  },
  {
    id: "model-3",
    name: "Mistral",
    usage: 30,
    cost: "$42.75",
    type: "model" as const
  },
  {
    id: "gpu-1",
    name: "NVIDIA A100",
    usage: 60,
    cost: "$95.80",
    type: "gpu" as const
  },
  {
    id: "gpu-2",
    name: "NVIDIA H100",
    usage: 25,
    cost: "$65.40",
    type: "gpu" as const
  }
];

// Mock data for the billing page
const mockCardInfo = {
  type: "Mastercard",
  lastFour: "3648"
};

const mockInvoices = [
  {
    id: "inv-001",
    date: "Feb 28, 2025",
    type: "invoice" as const,
    status: "paid" as const,
    amount: "$0.00"
  },
  {
    id: "inv-002",
    date: "Jan 31, 2025",
    type: "invoice" as const,
    status: "paid" as const,
    amount: "$0.00"
  },
  {
    id: "credit-001",
    date: "Jan 14, 2025",
    type: "credit" as const,
    status: "expiring" as const,
    expiryDate: "1/15/2026",
    amount: "$10.00"
  },
  {
    id: "inv-003",
    date: "Jan 1, 2025",
    type: "invoice" as const,
    status: "paid" as const,
    amount: "$0.00"
  },
  {
    id: "inv-004",
    date: "Dec 1, 2024",
    type: "invoice" as const,
    status: "paid" as const,
    amount: "$0.00"
  },
  {
    id: "credit-002",
    date: "Nov 20, 2024",
    type: "credit" as const,
    status: "expiring" as const,
    expiryDate: "11/21/2025",
    amount: "$5.00"
  }
];

export default function UsageBillingPage() {
  const [activeTab, setActiveTab] = useState("usage");
  const [balance, setBalance] = useState("489.12");
  const [autoReloadEnabled, setAutoReloadEnabled] = useState(false);
  
  // Handler functions
  const handleBuyCredits = () => {
    // In a real app, this would open a modal or redirect to a payment page
    console.log("Buy credits clicked");
  };
  
  const handleToggleAutoReload = () => {
    setAutoReloadEnabled(!autoReloadEnabled);
  };
  
  const handleDownloadInvoice = (id: string) => {
    console.log(`Download invoice ${id}`);
  };
  
  const handleViewInvoice = (id: string) => {
    console.log(`View invoice ${id}`);
  };
  
  const handleContactSales = () => {
    console.log("Contact sales clicked");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight mb-1">Usage & Billing</h1>
        <p className="text-sm text-muted-foreground">
          Monitor your resource consumption and manage your billing information.
        </p>
      </div>
      
      <CreditBalance 
        balance={balance}
        cardInfo={mockCardInfo}
        autoReloadEnabled={autoReloadEnabled}
        onBuyCredits={handleBuyCredits}
        onToggleAutoReload={handleToggleAutoReload}
      />
      
      <Tabs defaultValue="usage" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6 mt-6">
          <UsageSummary 
            usageData={mockUsageData}
            period="Current Billing Period (March 1-31, 2025)"
          />
          
          {/* Additional usage metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-sm font-medium mb-4">Usage Trends</h2>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground">Usage trend chart will be displayed here</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-sm font-medium mb-4">Resource Allocation</h2>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground">Resource allocation chart will be displayed here</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6 mt-6">
          <PaymentOptions onContactSales={handleContactSales} />
          
          <InvoiceHistory 
            invoices={mockInvoices}
            onDownload={handleDownloadInvoice}
            onView={handleViewInvoice}
          />
        </TabsContent>
      </Tabs>

      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 