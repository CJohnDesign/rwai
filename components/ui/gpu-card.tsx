"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Cpu, Database, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./badge";
import Image from "next/image";

interface GpuCardProps {
  id: string;
  name: string;
  manufacturer: string;
  architecture: string;
  description: string;
  specs: {
    cudaCores: number;
    tensorCores: number;
    memorySize: string;
    memoryType: string;
    memoryBandwidth: string;
    tdp: string;
  };
  tags: string[];
  image: string;
  category: string;
}

export function GpuCard({ 
  id, 
  name, 
  manufacturer,
  architecture, 
  description, 
  specs, 
  tags, 
  image, 
  category 
}: GpuCardProps) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors h-full">
      {/* Full-width top half image with no padding */}
      <div className="h-48 w-full bg-muted/50 overflow-hidden relative">
        {imgError ? (
          <div className="flex items-center justify-center bg-muted h-full w-full">
            <span className="text-3xl font-bold text-muted-foreground">{name.charAt(0)}</span>
          </div>
        ) : (
          <Image 
            src={image} 
            alt={name}
            width={480}
            height={192}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 480px"
            quality={85}
          />
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={category === "consumer" ? "default" : "secondary"}>
            {category === "consumer" ? "Consumer" : "Data Center"}
          </Badge>
        </div>
        <CardDescription>{manufacturer} - {architecture} Architecture</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex gap-1 mt-1 mb-3 flex-wrap">
          {tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">CUDA:</span>
            <span>{specs.cudaCores.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Tensor:</span>
            <span>{specs.tensorCores}</span>
          </div>
          <div className="flex items-center gap-1">
            <Database className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Memory:</span>
            <span>{specs.memorySize} {specs.memoryType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">TDP:</span>
            <span>{specs.tdp}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-end">
          <Link 
            href={`/gpus/${id}`}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
} 