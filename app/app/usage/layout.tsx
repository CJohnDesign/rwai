import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usage",
  description: "View usage statistics and monitor your resource consumption.",
};

interface UsageLayoutProps {
  children: React.ReactNode;
}

export default function UsageLayout({ children }: UsageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex w-full flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
} 