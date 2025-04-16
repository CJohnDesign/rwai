# GPU Components Documentation

## Overview

The GPU section of the app subdomain provides a modern interface for browsing and comparing NVIDIA GPUs for AI and machine learning workloads. The implementation includes a browsable list of GPUs and detailed individual GPU pages.

## Components

### GPU Cards

The GPU cards display key information about each GPU in a visually appealing format:

- **Image**: Each GPU features a full-width image at the top of the card
- **Name and Category**: Prominently displays the GPU name with a category badge (Consumer or Data Center)
- **Architecture**: Shows the GPU architecture (e.g., Blackwell, Hopper)
- **Tags**: Displays relevant tags for quick identification of capabilities
- **Description**: Brief overview of the GPU's purpose and capabilities
- **Key Specs**: Shows critical specifications including:
  - CUDA Cores
  - Tensor Cores
  - Memory Size and Type
  - TDP (Thermal Design Power)
- **View Details Link**: Links to the detailed GPU page

### GPU Detail Page

The detailed GPU page provides comprehensive information about a specific GPU:

- **Hero Section**: Features a full-width image with an overlay containing the GPU name, category, and architecture
- **Tags**: Shows all tags associated with the GPU
- **Description**: Detailed description of the GPU's purpose and capabilities
- **Launch Information**: Displays the launch date and MSRP
- **Performance**: Describes the performance characteristics of the GPU
- **Technical Specifications**: Comprehensive list of specifications including:
  - CUDA Cores
  - Tensor Cores
  - Ray Tracing Cores
  - Base and Boost Clock Speeds
  - Memory Details (Size, Type, Bus Width, Bandwidth)
  - Transistor Count
  - Die Size
  - TDP
- **Key Features**: Lists the key features and capabilities of the GPU

## Usage

### Browsing GPUs

The main GPU page (`/gpus`) provides several ways to browse and filter GPUs:

1. **Category Filtering**: Filter GPUs by category (All, Consumer, Data Center)
2. **Search**: Search for GPUs by name, description, architecture, or tags
3. **Sorting**: Sort GPUs by name or release date (ascending or descending)

### Viewing GPU Details

Click the "View Details" link on any GPU card to access the detailed information page for that GPU.

## Data Structure

The GPU data is stored in a JSON format with the following structure:

```json
{
  "id": "gpu-id",
  "name": "GPU Name",
  "architecture": "Architecture Name",
  "specs": {
    "cudaCores": 12345,
    "tensorCores": 123,
    "rayTracingCores": 123,
    "baseClockSpeed": "X.XX GHz",
    "boostClockSpeed": "X.XX GHz",
    "memoryType": "Type",
    "memorySize": "XX GB",
    "memoryBusWidth": "XXX-bit",
    "memoryBandwidth": "X,XXX GB/s",
    "transistorCount": "XX billion",
    "dieSize": "XXX mm²",
    "tdp": "XXX W"
  },
  "launchDate": "YYYY-MM-DD",
  "launchMsrp": "$X,XXX",
  "keyFeatures": [
    "Feature 1",
    "Feature 2"
  ],
  "performance": "Performance description",
  "description": "Detailed description",
  "category": "consumer|datacenter",
  "tags": ["tag1", "tag2"],
  "image": "/path/to/image.png",
  "featured": true|false
}
```

## Implementation Notes

- The GPU components use the ShadCN UI system with light Tailwind CSS for styling
- Images use the `object-cover` property to ensure proper display regardless of image dimensions
- The components are fully responsive and adapt to different screen sizes
- Fallback display is provided if images fail to load
- The app subdomain structure ensures proper URL formatting (app.localhost:3000/gpus)

## Example

The current implementation includes two example GPUs:

1. **GeForce RTX 5090**: NVIDIA's flagship consumer GPU with Blackwell architecture
2. **NVIDIA H-200**: Data center GPU with Hopper architecture for high-performance computing and AI workloads

These examples demonstrate the different categories and use cases for NVIDIA GPUs in the AI and machine learning space.
