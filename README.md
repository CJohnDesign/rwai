# RWAi - Decentralizing Ownership of AI Infrastructure

RWAi is a platform that enables users to access, own, and earn passive income from state-of-the-art AI Rigs running top open-source models. The platform tokenizes real-world AI infrastructure assets, allowing for decentralized ownership and participation in the AI economy.

![RWAi Platform](public/images/RWAi_logo-xs.png)

## 🚀 Features

- Access to top open-source AI models (LLaMA 3.1, DeepSeek-R1, Mistral, etc.)
- Ownership opportunities for AI infrastructure through tokenization
- Passive income generation from AI compute services
- Dashboard for monitoring performance and earnings
- Multi-tenant architecture with subdomain support

## 📋 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom theming
- **UI Components**: Custom components built with [Radix UI](https://www.radix-ui.com/)
- **Theming**: Dark/light mode support via [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Animations**: CSS animations and Tailwind CSS Animate plugin

## 🏗️ Project Structure

The project is structured as a multi-tenant application with subdomain support:

- `app/` - Main Next.js App Router directory
  - `page.tsx` - Marketing site homepage
  - `layout.tsx` - Root layout for the entire application
  - `app/` - App subdomain content
    - `page.tsx` - App dashboard page
    - `models/` - Models section for app subdomain
    - `gpus/` - GPUs section for app subdomain
    - `mcp/` - MCP (Model Control Panel) section
- `components/` - Shared UI components
  - `ui/` - Base UI components (buttons, cards, etc.)
  - `marketing/` - Components for the marketing site
  - `app-dashboard/` - Components for the app dashboard
  - `layout/` - Layout components (navbar, footer, etc.)
- `public/` - Static assets
- `src/data/` - JSON data files for models, GPUs, and servers
- `styles/` - Global styles and theme configuration
- `middleware.ts` - Handles subdomain routing

## 🎨 Styling Approach

The project uses a combination of Tailwind CSS and custom CSS variables for styling:

1. **Tailwind CSS**: Used for rapid UI development with utility classes
2. **CSS Variables**: Defined in `globals.css` for theming and consistent design tokens
3. **Component Library**: Custom UI components built with Radix UI primitives
4. **Dark/Light Mode**: Implemented using next-themes with system preference detection
5. **Responsive Design**: Mobile-first approach with responsive utilities

## 📄 Pages Overview

### Marketing Site (`localhost:3000`)

- **Home**: Landing page with hero section, features, and call-to-action
- **Models**: Showcase of available AI models with details and specifications
- **GPUs**: Information about the hardware infrastructure powering the platform
- **Whitelist**: Registration for early access to the platform
- **Blog**: Latest news and updates about RWAi and the AI industry

### App Dashboard (`app.localhost:3000`)

- **Dashboard**: Overview of user's account, balance, and activity
- **Models**: Detailed information about available models with usage metrics
- **GPUs**: Management interface for GPU resources
- **MCP**: Model Control Panel for advanced configuration
- **Model Debug**: Debugging interface for model testing and development

## 🔧 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cjohndesign/rwai.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser:
   - Marketing site: [http://localhost:3000](http://localhost:3000)
   - App dashboard: [http://app.localhost:3000](http://app.localhost:3000)

> **Note**: For subdomain routing to work locally, you'll need to configure your hosts file. See [HOSTS_SETUP.md](HOSTS_SETUP.md) for detailed instructions.

## 🌐 Subdomain Routing

The project uses Next.js middleware and configuration to handle subdomain routing:

- `middleware.ts`: Detects requests from the `app.` subdomain and handles routing
- `next.config.mjs`: Configures rewrites for subdomain support
- App content is served from the `/app/app` directory when accessing via subdomain

For more details, see [SUBDOMAIN_SETUP.md](SUBDOMAIN_SETUP.md) and [HOSTS_SETUP.md](HOSTS_SETUP.md).

## 🚧 Current Issues and Improvements

### Known Issues

1. **Dynamic Routing Issues**: 
   - **Problem**: Dynamic routes for model, GPU, and MCP detail pages (e.g., `/models/[modelId]`, `/gpus/[gpuId]`, `/mcp/[serverId]`) are returning 404 errors when accessed through the app subdomain.
   - **Root Cause**: The middleware and Next.js configuration have conflicts in how they handle subdomain routing with dynamic parameters. The middleware is correctly rewriting the URL, but the Next.js router is not properly resolving the dynamic segments.
   - **Current Workarounds**: 
     - Using catch-all routes (`[...slug]`) as a temporary solution
     - Created debug pages to test different routing approaches
     - Implemented API routes to verify data fetching works correctly

2. **API Routes with Subdomains**: 
   - API routes (`/api/models/[modelId]`) work inconsistently when accessed through the app subdomain
   - The middleware matcher configuration needs careful adjustment to include API routes without breaking other functionality

3. **File Structure Confusion**: 
   - The nested structure (`/app/app/models/[modelId]`) creates confusion with the subdomain routing
   - Need clearer separation between subdomain content and path-based routing

4. **Image Optimization**: Some images may not be properly optimized for production

### Suggested Improvements

1. **State Management**: Implement a more robust state management solution (Redux, Zustand, etc.)
2. **Authentication**: Add user authentication and authorization
3. **API Integration**: Connect to backend services for real data
4. **Testing**: Add unit and integration tests
5. **Internationalization**: Add support for multiple languages
6. **Performance Optimization**: Implement code splitting and lazy loading
7. **SEO**: Enhance metadata and structured data for better search engine visibility
8. **Accessibility**: Improve accessibility compliance (WCAG)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Vercel](https://vercel.com) for hosting and deployment
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Radix UI](https://www.radix-ui.com) for accessible UI primitives

## Environment Variables

This project requires several environment variables to be set:

### Basic Configuration
- `NEXT_PUBLIC_BASE_PATH` - Base URL for the application (e.g., `http://localhost:3000` for development)

### Supabase Configuration
For forms and database functionality, Supabase credentials are required:

1. Create a [Supabase](https://supabase.com) account and project
2. Set up the following environment variables in your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Create a table called `whitelist_applications` with the following schema:
   ```sql
   CREATE TABLE whitelist_applications (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     wallet_address TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in the required values
4. Start the development server:
   ```bash
   npm run dev
   ```

   
