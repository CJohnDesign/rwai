# MCP Components Documentation

## Overview

The Model Context Protocol (MCP) section of the app subdomain provides a user-friendly interface for managing, creating, and connecting to MCP servers. This implementation allows users to browse available MCP servers, create new ones, and monitor their connections to AI assistants like Claude.

## Components

### MCP Server Cards

The MCP server cards display key information about each available MCP server in a visually appealing format:

- **Image**: Each server features a full-width image at the top of the card representing the server type
- **Name and Status**: Prominently displays the server name with a status badge (Active, Inactive)
- **Type**: Shows the server type (e.g., Weather API, Financial Data, Custom)
- **Tags**: Displays relevant tags for quick identification of capabilities
- **Description**: Brief overview of the server's purpose and capabilities
- **Key Details**: Shows critical information including:
  - Connection Type (HTTP, stdio)
  - Last Connected
  - Number of Tools
  - Version
- **Connect Button**: Allows users to connect to the server or view details

### MCP Server Detail Page

The detailed MCP server page provides comprehensive information about a specific server:

- **Hero Section**: Features a full-width image with an overlay containing the server name, status, and type
- **Connection Details**: Shows the connection URL, protocol version, and authentication method
- **Available Tools**: Lists all tools exposed by the server with their descriptions
- **Usage Statistics**: Displays usage metrics like requests per day, average response time
- **Configuration**: Shows the current configuration settings
- **Logs**: Recent connection and request logs
- **Actions**: Buttons for connecting, disconnecting, editing, or deleting the server

### MCP Server Creation Wizard

The server creation wizard guides users through the process of creating a new MCP server:

- **Step 1: Basic Information**
  - Server name
  - Description
  - Server type (from templates or custom)
  - Tags
  
- **Step 2: Connection Details**
  - Connection type (HTTP/SSE or stdio)
  - URL or command path
  - Authentication method
  
- **Step 3: Tool Configuration**
  - Add tools manually or import from schema
  - Configure tool parameters and descriptions
  
- **Step 4: Testing**
  - Test connection
  - Verify tool discovery
  - Sample requests

- **Step 5: Deployment**
  - Deploy server
  - Generate client configuration

## Usage

### Browsing MCP Servers

The main MCP page (`/mcp`) provides several ways to browse and filter servers:

1. **Status Filtering**: Filter servers by status (All, Active, Inactive)
2. **Search**: Search for servers by name, description, type, or tags
3. **Sorting**: Sort servers by name, creation date, or last connected date

### Creating a New MCP Server

To create a new MCP server:

1. Click the "Create New Server" button on the main MCP page
2. Follow the steps in the creation wizard
3. After deployment, the server will appear in your list of available servers

### Connecting to an MCP Server

To connect an AI assistant to an MCP server:

1. Click the "Connect" button on the server card
2. Copy the generated configuration
3. Paste the configuration into your AI assistant's settings
4. Test the connection using the provided test prompts

### Monitoring MCP Servers

The MCP dashboard provides monitoring capabilities:

1. View active connections
2. Monitor request volume and response times
3. Check for errors or warnings
4. View detailed logs for troubleshooting

## Data Structure

The MCP server data is stored in a JSON format with the following structure:

```json
{
  "id": "server-id",
  "name": "Server Name",
  "type": "Server Type",
  "description": "Detailed description",
  "status": "active|inactive",
  "connectionDetails": {
    "type": "http|stdio",
    "url": "https://example.com/mcp",
    "authMethod": "none|secret|oauth",
    "authDetails": {}
  },
  "tools": [
    {
      "name": "toolName",
      "description": "Tool description",
      "parameters": [],
      "returnType": "string|object|array"
    }
  ],
  "stats": {
    "requestsPerDay": 123,
    "avgResponseTime": "45ms",
    "lastConnected": "2023-06-15T14:30:00Z"
  },
  "tags": ["tag1", "tag2"],
  "image": "/path/to/image.png",
  "createdAt": "2023-06-01T10:00:00Z",
  "updatedAt": "2023-06-10T15:20:00Z"
}
```

## Implementation Notes

- The MCP components use the ShadCN UI system with light Tailwind CSS for styling
- Server cards feature full-width images at the top using the `object-cover` property
- The interface is fully responsive and adapts to different screen sizes
- Real-time status updates are provided through Server-Sent Events
- The app subdomain structure ensures proper URL formatting (app.localhost:3000/mcp)
- Comprehensive error handling provides clear feedback on connection issues

## Example Templates

The current implementation includes several example MCP server templates:

1. **Weather API**: Connects to weather services to provide forecast data
2. **Financial Data**: Retrieves stock prices and financial information
3. **Document Retrieval**: Searches and retrieves documents from a knowledge base
4. **Custom API**: A blank template for creating custom MCP servers

These templates provide starting points for users to create their own MCP servers with minimal configuration.

## Quick Start Guide

To get started with MCP servers:

1. Navigate to the MCP section in the app subdomain
2. Browse available server templates
3. Click "Create New Server" and select a template
4. Follow the wizard to configure your server
5. Deploy your server using the provided instructions
6. Connect your AI assistant using the generated configuration
7. Start using your MCP-enabled AI assistant with the new capabilities

For more advanced usage, refer to the detailed documentation on creating custom MCP servers with specific tools and capabilities.
