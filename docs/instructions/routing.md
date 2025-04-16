escape the square brackets in the command when calling shell commands with directory paths


// Next.js App Router .cursorrules

// Next.js App Router best practices

const nextjsAppRouterBestPractices = [
  "Use server components by default",
  "Implement client components only when necessary",
  "Utilize the new file-based routing system",
  "Use layout.js for shared layouts",
  "Implement loading.js for loading states",
  "Use error.js for error handling",
  "Utilize route handlers for API routes",
];

// Folder structure with subdomain support

const folderStructure = `

app/                      # Main Next.js App Router directory
├── page.tsx              # Main marketing site homepage
├── layout.tsx            # Main marketing site layout
├── globals.css           # Global CSS styles
├── app/                  # App subdomain content
│   ├── page.tsx          # App dashboard page
│   ├── layout.tsx        # App dashboard layout
│   ├── models/           # Models section for app subdomain
│   ├── components/       # App-specific components
│   └── ...               # Other app subdomain pages
└── ...                   # Other marketing site pages
components/               # Shared UI components
middleware.ts             # Middleware for handling subdomain routing
next.config.mjs           # Next.js configuration with subdomain rewrites
public/                   # Static assets
`;

// Subdomain routing implementation

const subdomainRouting = `
// middleware.ts - Handles subdomain routing
export default function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  const currentHost = hostname.split(':')[0];
  
  // Handle app subdomain
  if (currentHost.startsWith('app.')) {
    // Rewrite to /app directory
    const newUrl = new URL(\`/app\${pathname}\`, request.url);
    return NextResponse.rewrite(newUrl);
  }
}

// next.config.mjs - Rewrites configuration
async rewrites() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'app.localhost:3000' }],
      destination: '/app/:path*',
    },
    // Additional rewrites...
  ];
}
`;

// Additional instructions

const additionalInstructions = `
1. Use TypeScript for type safety
2. Implement proper metadata for SEO
3. Utilize Next.js Image component for optimized images
4. Use CSS Modules or Tailwind CSS for styling
5. Implement proper error boundaries
6. Follow Next.js naming conventions for special files
7. Use environment variables for configuration
8. For subdomain routing:
   - Update hosts file to map app.localhost to 127.0.0.1
   - Access main site at localhost:3000
   - Access app subdomain at app.localhost:3000
   - Links in app subdomain should be relative to the subdomain context
`;