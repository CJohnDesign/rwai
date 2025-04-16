"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Clock, Server, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./badge";

interface MCPServerCardProps {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'active' | 'inactive';
  stats: {
    requestsPerDay: number;
    avgResponseTime: string;
    lastConnected: string;
  };
  tools: {
    name: string;
    description: string;
  }[];
  tags: string[];
  image: string;
}

export function MCPServerCard({
  id,
  name,
  type,
  description,
  status,
  stats,
  tools,
  tags,
  image
}: MCPServerCardProps) {
  const [imgError, setImgError] = useState(false);

  // Format the last connected date
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors h-full">
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
          />
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardDescription>{type}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium">{stats.requestsPerDay}</div>
            <div className="text-xs text-muted-foreground">Requests/Day</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium">{stats.avgResponseTime}</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium">{formatDate(stats.lastConnected)}</div>
            <div className="text-xs text-muted-foreground">Last Active</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Link 
          href={`/mcp/${id}`}
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
        >
          View Details
          <ExternalLink className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
} 
