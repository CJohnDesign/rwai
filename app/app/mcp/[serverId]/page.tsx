"use client";

import { useState } from "react";
import { ArrowLeft, Server, Clock, Zap, Calendar, Code, CheckCircle, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mcpServersData from "../../../../data/mcp-servers.json";
import { WhitelistOverlay } from "../../../../components/app-dashboard/whitelist-overlay";
import Image from "next/image";

// Base path for static assets in subdomains
const IMAGE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000";

// Define MCP Server interface
interface MCPServer {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'active' | 'inactive';
  connectionDetails: {
    type: string;
    url: string;
    authMethod: string;
    authDetails: any;
  };
  tools: {
    name: string;
    description: string;
    parameters: {
      name: string;
      type: string;
      description: string;
    }[];
    returnType: string;
  }[];
  stats: {
    requestsPerDay: number;
    avgResponseTime: string;
    lastConnected: string;
  };
  tags: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Format date function
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

export default function MCPServerDetailPage() {
  // Use the useParams hook to get the serverId
  const params = useParams();
  const serverId = params.serverId as string;

  console.log({ mcpServersData })

  // Find the MCP server by ID
  const server = mcpServersData.find((s: any) => s.id === serverId);

  // If server not found, return 404
  if (!server) {
    notFound();
  }

  // Fix image path
  const imageUrl = server.image.startsWith('/')
    ? `${IMAGE_BASE_PATH}${server.image}`
    : server.image;

  const [imgError, setImgError] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  // Generate configuration for connecting to the server
  const serverConfig = {
    name: server.name,
    type: server.connectionDetails.type,
    url: server.connectionDetails.url,
    authMethod: server.connectionDetails.authMethod
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(serverConfig, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/mcp" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to MCP Servers
        </Link>

        <div className="flex flex-col gap-8">
          {/* Hero section with full-width image */}
          <div className="w-full h-64 md:h-80 bg-muted/50 rounded-xl overflow-hidden relative">
            {imgError ? (
              <div className="flex items-center justify-center bg-muted h-full w-full">
                <span className="text-6xl font-bold text-muted-foreground">{server.name.charAt(0)}</span>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={server.name}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            )}

            {/* Overlay with server info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{server.name}</h1>
                <Badge variant={server.status === "active" ? "default" : "secondary"}>
                  {server.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-lg text-white/80">{server.type}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-2 flex-wrap">
              {server.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground">{server.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(server.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{formatDate(server.updatedAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Connected</p>
                  <p className="font-medium">{formatDate(server.stats.lastConnected)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connection Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Type:</span>
              </div>
              <span className="font-medium">{server.connectionDetails.type}</span>

              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">URL:</span>
              </div>
              <span className="font-medium">{server.connectionDetails.url}</span>

              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Auth Method:</span>
              </div>
              <span className="font-medium capitalize">{server.connectionDetails.authMethod}</span>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Configuration</h3>
                <button
                  onClick={copyConfig}
                  className="flex items-center text-xs text-primary hover:text-primary/80"
                >
                  {copiedConfig ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-auto">
                {JSON.stringify(serverConfig, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Requests per Day</div>
                <div className="text-2xl font-bold">{server.stats.requestsPerDay}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Avg Response Time</div>
                <div className="text-2xl font-bold">{server.stats.avgResponseTime}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Tools Available</div>
                <div className="text-2xl font-bold">{server.tools.length}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="text-2xl font-bold capitalize">{server.status}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Tools</CardTitle>
          <CardDescription>Tools that can be used with this MCP server</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {server.tools.map((tool, index) => (
              <div key={tool.name} className={`${index > 0 ? "pt-6 border-t border-border" : ""}`}>
                <h3 className="text-lg font-medium mb-1">{tool.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>

                {tool.parameters.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-2">Parameters:</h4>
                    <div className="bg-muted/50 rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tool.parameters.map(param => (
                            <tr key={param.name} className="border-t border-border">
                              <td className="px-4 py-2 font-mono text-xs">{param.name}</td>
                              <td className="px-4 py-2 font-mono text-xs">{param.type}</td>
                              <td className="px-4 py-2 text-xs">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Returns:</span>
                  <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{tool.returnType}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Connect to Server
        </button>
      </div>

      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 
