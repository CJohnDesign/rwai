/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove basePath as it can interfere with subdomain routing
  // basePath: process.env.NODE_ENV === 'production' ? '/app' : '',
  trailingSlash: false,
  // Enable error checking for better code quality
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['localhost', 'app.localhost', 'rwai.xyz', 'app.rwai.xyz'],
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
      // Production patterns
      {
        protocol: 'https',
        hostname: 'rwai.xyz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'app.rwai.xyz',
        pathname: '/**',
      }
    ],
    unoptimized: process.env.NODE_ENV === 'development',
    path: '',
    loader: 'default'
  },
  // Enable experimental features safely
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
    const isProduction = process.env.NODE_ENV === 'production';
    return [
      // Handle app.rwai.xyz subdomain in production
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: isProduction ? 'app.rwai.xyz' : 'app.localhost:3000',
          },
        ],
        destination: '/app/:path*',
      }
    ];
  },
  // Add webpack configuration for better optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      };
    }
    return config;
  },
};

export default nextConfig; 
