"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown, Info } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GpuCard } from "../../../components/ui/gpu-card";
import gpusData from "../../../data/gpus.json";

// Simple base path for images
const IMAGE_BASE_PATH = "";

// GPU data with simple image path handling
const gpus = gpusData.map((gpu) => ({
  ...gpu,
  image: gpu.image.startsWith('/') ? gpu.image : `/${gpu.image}`
}));

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

// Categories for filtering
const categories = [
  { id: "all", name: "All GPUs", count: gpus.length },
  { id: "consumer", name: "Consumer", count: gpus.filter((g: GPU) => g.category === "consumer").length },
  { id: "datacenter", name: "Data Center", count: gpus.filter((g: GPU) => g.category === "datacenter").length },
];

// Format date function
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

export default function GPUsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "launchDate">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Filter and sort GPUs
  const filteredGPUs = gpus
    .filter((gpu: GPU) => {
      // Category filter
      if (activeCategory !== "all" && gpu.category !== activeCategory) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          gpu.name.toLowerCase().includes(query) ||
          gpu.description.toLowerCase().includes(query) ||
          gpu.architecture.toLowerCase().includes(query) ||
          gpu.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    })
    .sort((a: GPU, b: GPU) => {
      if (sortField === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const dateA = new Date(a.launchDate).getTime();
        const dateB = new Date(b.launchDate).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
    });
  
  const handleSort = (field: "name" | "launchDate") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">GPUs</h1>
        <p className="text-muted-foreground">
          Browse and compare the latest NVIDIA GPUs for AI and machine learning workloads.
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search GPUs..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
      
      {/* Sort controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredGPUs.length} GPUs
        </div>
        
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 text-sm"
            onClick={() => handleSort("name")}
          >
            Name
            {sortField === "name" && (
              <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
            )}
          </button>
          <button
            className="flex items-center gap-1 text-sm"
            onClick={() => handleSort("launchDate")}
          >
            Release Date
            {sortField === "launchDate" && (
              <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
            )}
          </button>
        </div>
      </div>
      
      {/* GPU grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGPUs.map((gpu: GPU) => (
          <GpuCard
            key={gpu.id}
            id={gpu.id}
            name={gpu.name}
            manufacturer={gpu.manufacturer}
            architecture={gpu.architecture}
            description={gpu.description}
            specs={{
              cudaCores: gpu.specs.cudaCores,
              tensorCores: gpu.specs.tensorCores,
              memorySize: gpu.specs.memorySize,
              memoryType: gpu.specs.memoryType,
              memoryBandwidth: gpu.specs.memoryBandwidth,
              tdp: gpu.specs.tdp
            }}
            tags={gpu.tags}
            image={gpu.image}
            category={gpu.category}
          />
        ))}
      </div>
      
      {filteredGPUs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No GPUs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 