# MCP Section Documentation

The MCP (Machine Control Protocol) section of the application provides a comprehensive interface for managing and interacting with MCP servers. This document outlines the components, pages, and functionality of the MCP section.

## Overview

The MCP section allows users to:
- View a list of available MCP servers
- Filter and search for specific servers
- View detailed information about each server
- Connect to servers for interaction
- View server statistics and available tools

## Components

### MCP Server Card

The `MCPServerCard` component (`components/ui/mcp-server-card.tsx`) displays a summary of an MCP server, including:

- Server name and type
- Status badge (active/inactive)
- Description
- Key statistics
- Available tools
- Tags
- Server image

The card is designed to provide a quick overview of the server's capabilities and status, with a link to view more details.

```tsx
// Usage example
<MCPServerCard
  id="server-id"
  name="Server Name"
  type="Server Type"
  description="Server description"
  status="active"
  stats={{
    requestsPerDay: 1000,
    avgResponseTime: "120ms",
    lastConnected: "2023-10-15T14:32:17Z"
  }}
  tools={[...]}
  tags={["tag1", "tag2"]}
  image="/path/to/image.jpg"
/>
```

## Pages

### MCP Main Page

Located at `app/app/mcp/page.tsx`, this page displays a grid of MCP server cards with filtering and sorting capabilities:

- Status filter (All, Active, Inactive)
- Search functionality
- Sorting by name, type, or last connected date
- Responsive grid layout

### MCP Server Detail Page

Located at `app/app/mcp/[serverId]/page.tsx`, this page provides detailed information about a specific MCP server:

- Hero section with server image
- Server metadata (name, type, description, tags)
- Connection details
- Statistics
- Available tools with parameters and return types
- "Connect to Server" action button

## Data Structure

MCP server data is stored in `data/mcp-servers.json` with the following structure:

```typescript
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
```

## Layouts

- Main MCP layout (`app/app/mcp/layout.tsx`): Provides a full-width container for the MCP main page
- MCP Server Detail layout (`app/app/mcp/[serverId]/layout.tsx`): Provides a container with maximum width and padding for the server detail page

## Future Enhancements

Potential future enhancements for the MCP section include:

1. User authentication and authorization for server access
2. Real-time server status monitoring
3. Interactive tool testing interface
4. Server configuration management
5. Usage analytics and reporting
6. Custom server creation and deployment

## Troubleshooting

Common issues and their solutions:

1. **Images not loading**: Ensure the image paths in the server data are correct and the images exist in the public directory.
2. **404 errors on server detail pages**: Verify that the server ID in the URL matches an ID in the server data.
3. **Connection issues**: Check that the connection details are correct and the server is active.

## Related Documentation

- [UI Components](./ui-components.md)
- [App Router Structure](./app-router.md)
- [Data Management](./data-management.md) 