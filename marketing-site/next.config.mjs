/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Remove basePath as it can interfere with subdomain routing
  // basePath: process.env.NODE_ENV === 'production' ? '/app' : '',
  trailingSlash: false,
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'app.localhost', 'rwai-eight.vercel.app', 'app.rwai-eight.vercel.app', 'rwai.xyz', 'app.rwai.xyz'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Localhost patterns for development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'app.localhost',
        port: '3000',
        pathname: '/**',
      },
      // Vercel patterns
      {
        protocol: 'https',
        hostname: 'rwai-eight.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'app.rwai-eight.vercel.app',
        pathname: '/**',
      },
      // Wildcard pattern for all domains in production
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      }
    ],
    unoptimized: true,
    path: '',
    loader: 'default'
  },
  // Enable hostname rewrites for development
  experimental: {
    turbo: {
      rules: {
        // Disable the experimental CSS features for Turbopack
        '*.css': {
          loaders: ['postcss-loader'],
        },
      },
    },
  },
  // Subdomain configuration
  async rewrites() {
    return [
      // Handle app.rwai-eight.vercel.app subdomain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'app.rwai-eight.vercel.app',
          },
        ],
        destination: '/app/:path*',
      },
      // Handle app.localhost:3000 subdomain for local development
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'app.localhost:3000',
          },
        ],
        destination: '/app/:path*',
      }
    ];
  },
};

export default nextConfig; 
