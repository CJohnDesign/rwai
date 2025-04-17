"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown, Info, Plus } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MCPServerCard } from "../../../components/ui/mcp-server-card";
import mcpServersData from "../../../data/mcp-servers.json";
import { WhitelistOverlay } from "../../../components/app-dashboard/whitelist-overlay";

// Simple base path for images
const IMAGE_BASE_PATH = "";

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
    parameters: any[];
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

// MCP server data with simple image path handling
const mcpServers = mcpServersData.map((server) => ({
  ...server,
  image: server.image.startsWith('/') ? server.image : `/${server.image}`
}));

// Categories for filtering
const statuses = [
  { id: "all", name: "All Servers", count: mcpServers.length },
  { id: "active", name: "Active", count: mcpServers.filter((s: MCPServer) => s.status === "active").length },
  { id: "inactive", name: "Inactive", count: mcpServers.filter((s: MCPServer) => s.status === "inactive").length },
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

export default function MCPPage() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "updatedAt">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Filter and sort MCP servers
  const filteredServers = mcpServers
    .filter((server: MCPServer) => {
      // Status filter
      if (activeStatus !== "all" && server.status !== activeStatus) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          server.name.toLowerCase().includes(query) ||
          server.description.toLowerCase().includes(query) ||
          server.type.toLowerCase().includes(query) ||
          server.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    })
    .sort((a: MCPServer, b: MCPServer) => {
      if (sortField === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
    });
  
  const handleSort = (field: "name" | "updatedAt") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">MCP Servers</h1>
          <p className="text-muted-foreground">
            Browse and connect to Model Context Protocol (MCP) servers to extend AI capabilities.
          </p>
        </div>
        <Link 
          href="/mcp/create" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Server
        </Link>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search servers..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {statuses.map((status) => (
            <button
              key={status.id}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeStatus === status.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => setActiveStatus(status.id)}
            >
              {status.name} ({status.count})
            </button>
          ))}
        </div>
      </div>
      
      {/* Sort controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredServers.length} servers
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
            onClick={() => handleSort("updatedAt")}
          >
            Last Updated
            {sortField === "updatedAt" && (
              <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
            )}
          </button>
        </div>
      </div>
      
      {/* MCP server grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServers.map((server: MCPServer) => (
          <MCPServerCard
            key={server.id}
            id={server.id}
            name={server.name}
            type={server.type}
            description={server.description}
            status={server.status}
            stats={server.stats}
            tools={server.tools}
            tags={server.tags}
            image={server.image}
          />
        ))}
      </div>
      
      {filteredServers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No MCP servers found matching your criteria.</p>
        </div>
      )}
      
      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 