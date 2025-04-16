"use client";

import { useState } from "react";
import { CreditBalance } from "../usage/components/CreditBalance";
import { InvoiceHistory } from "../usage/components/InvoiceHistory";
import { PaymentOptions } from "../usage/components/PaymentOptions";
import { WhitelistOverlay } from "../../../components/app-dashboard/whitelist-overlay";

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

export default function BillingPage() {
  const [balance, setBalance] = useState("7.80");
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
        <h1 className="text-xl font-semibold tracking-tight mb-1">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your credits, payment methods, and access invoice history.
        </p>
      </div>
      
      <CreditBalance 
        balance={balance}
        cardInfo={mockCardInfo}
        autoReloadEnabled={autoReloadEnabled}
        onBuyCredits={handleBuyCredits}
        onToggleAutoReload={handleToggleAutoReload}
      />
      
      <PaymentOptions onContactSales={handleContactSales} />
      
      <InvoiceHistory 
        invoices={mockInvoices}
        onDownload={handleDownloadInvoice}
        onView={handleViewInvoice}
      />

      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 