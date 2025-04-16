import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your credits, payment methods, and access invoice history.",
};

interface BillingLayoutProps {
  children: React.ReactNode;
}

export default function BillingLayout({ children }: BillingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex w-full flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
} 