"use client";

import { useState } from "react";
import { ArrowLeft, Cpu, Database, Zap, Clock, Layers, Maximize2, Calendar, DollarSign, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import gpusData from "../../../../data/gpus.json";
import { WhitelistOverlay } from "../../../../components/app-dashboard/whitelist-overlay";
import Image from "next/image";

// Base path for static assets in subdomains
const IMAGE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000";

// Define GPU interface
interface GPU {
  id: string;
  name: string;
  manufacturer: string;
  architecture: string;
  specs: {
    cudaCores: number;
    tensorCores: number;
    rayTracingCores: number | string;
    baseClockSpeed: string;
    boostClockSpeed: string;
    memoryType: string;
    memorySize: string;
    memoryBusWidth: string;
    memoryBandwidth: string;
    transistorCount: string;
    dieSize: string;
    tdp: string;
  };
  launchDate: string;
  launchMsrp: string;
  keyFeatures: string[];
  performance: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

// Format date function
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

export default function GPUDetailPage() {
  // Use the useParams hook to get the gpuId
  const params = useParams();
  const gpuId = params.gpuId as string;
  
  // Find the GPU by ID
  const gpu = gpusData.find((g: any) => g.id === gpuId);
  
  // If GPU not found, return 404
  if (!gpu) {
    notFound();
  }
  
  // Fix image path
  const imageUrl = gpu.image.startsWith('/') 
    ? `${IMAGE_BASE_PATH}${gpu.image}` 
    : gpu.image;
  
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="space-y-8">
      <div>
        <Link href="/gpus" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to GPUs
        </Link>
        
        <div className="flex flex-col gap-8">
          {/* Hero section with full-width image */}
          <div className="w-full h-64 md:h-80 bg-muted/50 rounded-xl overflow-hidden">
            {imgError ? (
              <div className="flex items-center justify-center bg-muted h-full w-full">
                <span className="text-6xl font-bold text-muted-foreground">{gpu.name.charAt(0)}</span>
              </div>
            ) : (
              <Image 
                src={imageUrl} 
                alt={gpu.name} 
                width={1200}
                height={800}
                priority
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
            
            {/* Overlay with GPU info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{gpu.name}</h1>
                <Badge variant={gpu.category === "consumer" ? "default" : "secondary"}>
                  {gpu.category === "consumer" ? "Consumer" : "Data Center"}
                </Badge>
              </div>
              <p className="text-lg text-white/80">{gpu.manufacturer} - {gpu.architecture} Architecture</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 flex-wrap">
              {gpu.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <p className="text-muted-foreground">{gpu.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Launch Date</p>
                  <p className="font-medium">{formatDate(gpu.launchDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Launch MSRP</p>
                  <p className="font-medium">{gpu.launchMsrp}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Performance</h2>
              <p className="text-muted-foreground">{gpu.performance}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">CUDA Cores:</span>
              </div>
              <span className="font-medium">{gpu.specs.cudaCores.toLocaleString()}</span>
              
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tensor Cores:</span>
              </div>
              <span className="font-medium">{gpu.specs.tensorCores}</span>
              
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Ray Tracing Cores:</span>
              </div>
              <span className="font-medium">{gpu.specs.rayTracingCores}</span>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Base Clock:</span>
              </div>
              <span className="font-medium">{gpu.specs.baseClockSpeed}</span>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Boost Clock:</span>
              </div>
              <span className="font-medium">{gpu.specs.boostClockSpeed}</span>
              
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Memory:</span>
              </div>
              <span className="font-medium">{gpu.specs.memorySize} {gpu.specs.memoryType}</span>
              
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Memory Bus:</span>
              </div>
              <span className="font-medium">{gpu.specs.memoryBusWidth}</span>
              
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Memory Bandwidth:</span>
              </div>
              <span className="font-medium">{gpu.specs.memoryBandwidth}</span>
              
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Transistors:</span>
              </div>
              <span className="font-medium">{gpu.specs.transistorCount}</span>
              
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Die Size:</span>
              </div>
              <span className="font-medium">{gpu.specs.dieSize}</span>
              
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">TDP:</span>
              </div>
              <span className="font-medium">{gpu.specs.tdp}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {gpu.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 