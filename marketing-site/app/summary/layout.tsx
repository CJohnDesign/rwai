import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Executive Summary | RWAi',
  description: 'Executive summary of RWAi - the first platform for fractional ownership of AI GPU rigs',
};

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 