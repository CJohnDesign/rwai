"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import modelsData from "../../../../data/models.json";

export default function ModelItemPage({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  
  console.log("Model item page loaded");
  console.log("Item ID from params:", itemId);
  console.log("Models data loaded:", modelsData ? "yes" : "no");
  console.log("Models count:", modelsData ? modelsData.length : 0);
  
  // Find the model by ID
  const model = modelsData.find((m: any) => m.id === itemId);
  
  console.log("Model found:", model ? "yes" : "no");
  
  // If model not found, show 404
  if (!model) {
    console.log("Model not found, showing 404");
    notFound();
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Model Item Page</h1>
      <p className="mb-4">Item ID: {itemId}</p>
      
      {model && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
          <p>{model.description}</p>
        </div>
      )}
      
      <div className="mt-8">
        <Link href="/models" className="text-blue-500 hover:underline">
          Back to Models
        </Link>
      </div>
    </div>
  );
} 