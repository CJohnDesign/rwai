import React from "react";

export default function ModelDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="model-detail-layout">
      {children}
    </div>
  );
} 