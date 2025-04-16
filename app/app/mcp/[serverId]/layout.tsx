import React from "react";

export default function MCPServerDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-8 max-w-6xl">
      {children}
    </div>
  );
} 