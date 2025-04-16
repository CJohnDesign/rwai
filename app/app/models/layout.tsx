import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "AI Models | RWAi",
  description: "Browse and use state-of-the-art AI models for inference. Select a model to get started with your AI tasks.",
};

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return children;
} 