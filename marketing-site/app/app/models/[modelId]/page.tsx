"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Tag, Database, FileCode, Info, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import modelsData from "../../../../src/data/models.json";
import { WhitelistOverlay } from "../../../../components/app-dashboard/whitelist-overlay";

// Add debug logging only in development environment
if (process.env.NODE_ENV === 'development') {
  console.log("Dynamic model page loaded");
  console.log("Models data:", modelsData ? `loaded (${modelsData.length} models)` : "not loaded");
  
  if (modelsData && modelsData.length > 0) {
    console.log("First few model IDs:", modelsData.slice(0, 3).map((m: any) => m.id).join(", ") + (modelsData.length > 3 ? "..." : ""));
  }
}

// Base path for static assets in subdomains
const IMAGE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Default image path
const DEFAULT_IMAGE_PATH = "/images/texture_3.png";

// Define Model interface
interface Model {
  id: string;
  name: string;
  releaseDate: string;
  parameters: number[];
  license: string;
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

// Format parameters function
const formatParameters = (params: number[]) => {
  if (params.length === 0) return "N/A";
  
  return params.map(p => {
    if (p < 1) return `${p * 1000}M`;
    if (p >= 1 && p < 1000) return `${p}B`;
    return `${p}B`;
  }).join(" / ");
};

// Model logo component
const ModelLogo = ({ src, alt, className = "", width = 120, height = 120 }: { 
  src: string; 
  alt: string; 
  className?: string; 
  width?: number; 
  height?: number; 
}) => {
  return (
    <div className={`overflow-hidden rounded-lg bg-black ${className}`} style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover p-0"
        priority={true}
      />
    </div>
  );
};

export default function ModelDetailPage() {
  // Use useParams hook instead of accessing params directly
  const params = useParams();
  const modelId = params.modelId as string;
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Add more debug logging
  console.log("Model ID from params:", modelId);
  
  useEffect(() => {
    // Find the model by ID
    const foundModel = modelsData.find((m: any) => m.id === modelId);
    console.log("Model found:", foundModel ? "yes" : "no");
    
    if (foundModel) {
      setModel(foundModel as Model);
    }
    setLoading(false);
  }, [modelId]);
  
  // If loading, show loading state
  if (loading) {
    return <div className="p-8">Loading model details...</div>;
  }
  
  // If model not found, show 404
  if (!model) {
    console.log("Model not found, showing 404");
    notFound();
    return null;
  }
  
  // Fix image path
  const imagePath = `${IMAGE_BASE_PATH}${DEFAULT_IMAGE_PATH}`;
  
  // Get category display name
  const getCategoryDisplay = (category: string) => {
    const categories: Record<string, string> = {
      "text": "Text Generation",
      "image": "Image Generation",
      "audio": "Audio Processing",
      "video": "Video Generation",
      "multimodal": "Multimodal"
    };
    return categories[category] || category;
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Back button */}
      <Link href="/models" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Models
      </Link>
      
      {/* Model header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <ModelLogo src={imagePath} alt={model.name} />
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{model.name}</h1>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              {getCategoryDisplay(model.category)}
            </Badge>
            
            {model.featured && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-200">
                Featured
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">{model.description}</p>
        </div>
      </div>
      
      {/* Model details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Key Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Release Date</p>
                  <p className="text-gray-600 dark:text-gray-300">{formatDate(model.releaseDate)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Database className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Parameters</p>
                  <p className="text-gray-600 dark:text-gray-300">{formatParameters(model.parameters)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FileCode className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">License</p>
                  <p className="text-gray-600 dark:text-gray-300">{model.license}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {model.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">About {model.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            {model.description}
          </p>
          
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-2">Use Cases</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
              {model.category === "text" && (
                <>
                  <li>Natural language processing and understanding</li>
                  <li>Content generation and summarization</li>
                  <li>Conversational AI and chatbots</li>
                  {model.tags.includes("coding") && <li>Code generation and assistance</li>}
                </>
              )}
              
              {model.category === "image" && (
                <>
                  <li>Text-to-image generation</li>
                  <li>Creative design and artwork</li>
                  <li>Visual content creation</li>
                </>
              )}
              
              {model.category === "audio" && (
                <>
                  <li>Speech recognition and transcription</li>
                  <li>Audio generation and synthesis</li>
                  <li>Voice cloning and modification</li>
                </>
              )}
              
              {model.category === "video" && (
                <>
                  <li>Text-to-video generation</li>
                  <li>Video editing and enhancement</li>
                  <li>Animation and visual effects</li>
                </>
              )}
              
              {model.category === "multimodal" && (
                <>
                  <li>Cross-modal understanding and generation</li>
                  <li>Visual question answering</li>
                  <li>Content analysis across different media types</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 