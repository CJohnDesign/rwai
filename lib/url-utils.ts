/**
 * URL utilities for handling subdomain navigation in a way
 * that works across all environments (local, production, Vercel)
 */

/**
 * Checks if we're running on a Vercel platform
 */
export function isVercel(): boolean {
  return Boolean(
    typeof window !== 'undefined' && 
    window.location.host.includes('vercel.app')
  );
}

/**
 * Get the appropriate URL based on the environment
 */
export function getEnvironmentUrl(type: 'main' | 'app'): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (type === 'main') {
    return isDevelopment 
      ? process.env.NEXT_PUBLIC_DEV_MAIN_URL || 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_MAIN_URL || 'https://rwai.xyz';
  }
  
  return isDevelopment
    ? process.env.NEXT_PUBLIC_DEV_APP_URL || 'http://app.localhost:3000'
    : process.env.NEXT_PUBLIC_APP_URL || 'https://app.rwai.xyz';
}

/**
 * Normalize a path by ensuring it starts with a forward slash
 */
export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Get the app subdomain URL
 * Works for:
 * - Local development (app.localhost:3000)
 * - Vercel deployments (app.rwai-eight.vercel.app)
 * - Production (app.rwai.xyz)
 */
export function getAppUrl(path = ''): string {
  if (typeof window === 'undefined') {
    // Server-side: use environment variables
    return `${getEnvironmentUrl('app')}${normalizePath(path)}`;
  }

  const { protocol, host } = window.location;
  const normalizedPath = normalizePath(path);
  
  // If already on app subdomain, just use current host
  if (host.startsWith('app.')) {
    return `${protocol}//${host}${normalizedPath}`;
  }
  
  // For Vercel deployments
  if (isVercel()) {
    return `${protocol}//app.rwai-eight.vercel.app${normalizedPath}`;
  }
  
  // For local development and other environments
  return `${protocol}//app.${host}${normalizedPath}`;
}

/**
 * Get the main domain URL
 */
export function getMainUrl(path = ''): string {
  if (typeof window === 'undefined') {
    // Server-side: use environment variables
    return `${getEnvironmentUrl('main')}${normalizePath(path)}`;
  }

  const { protocol, host } = window.location;
  const normalizedPath = normalizePath(path);
  
  // If not on app subdomain, just use current host
  if (!host.startsWith('app.')) {
    return `${protocol}//${host}${normalizedPath}`;
  }
  
  // Remove 'app.' prefix from host
  const mainHost = host.replace(/^app\./, '');
  
  // For Vercel deployments
  if (isVercel()) {
    return `${protocol}//rwai-eight.vercel.app${normalizedPath}`;
  }
  
  return `${protocol}//${mainHost}${normalizedPath}`;
}

/**
 * Get the base path for static assets
 */
export function getBasePath(): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment
    ? process.env.NEXT_PUBLIC_DEV_MAIN_URL || 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_PATH || 'https://rwai.xyz';
}

/**
 * Get the appropriate URL for a given path based on the host
 */
export function getUrlForPath(path: string = '/', host?: string): string {
  const normalizedPath = normalizePath(path);
  const protocol = process.env.NODE_ENV === 'development' ? 'http:' : 'https:';
  const mainHost = host || 'rwai.xyz';
  
  return `${protocol}//${mainHost}${normalizedPath}`;
} 