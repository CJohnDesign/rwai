# Subdomain Routing Setup

This project is configured to support subdomain routing, specifically for accessing the app via `app.localhost` or `app.{production_url}`.

## How It Works

The implementation uses Next.js middleware and rewrites to handle subdomain routing:

1. **Middleware**: The `middleware.ts` file detects requests coming from the `app.` subdomain and rewrites them to the `/app` directory.
2. **Next.js Config**: The `next.config.mjs` file includes rewrites configuration to support subdomain routing in development.
3. **App Directory**: The `/app/app` directory contains the application that will be served when accessing the subdomain.

## Local Development

To test the subdomain routing locally:

1. Update your hosts file to support `app.localhost`:

   **On macOS/Linux**:
   ```bash
   sudo nano /etc/hosts
   ```

   **On Windows**:
   ```
   C:\Windows\System32\drivers\etc\hosts
   ```

   Add the following line:
   ```
   127.0.0.1 app.localhost
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Access the app at:
   - Main site: `http://localhost:3000`
   - App subdomain: `http://app.localhost:3000`

## Production Deployment

For production deployment, you'll need to:

1. Configure your DNS settings to point `app.yourdomain.com` to your hosting provider.
2. Configure your hosting provider to handle subdomain routing.

### Vercel Deployment

If you're deploying to Vercel, subdomain routing is supported out of the box:

1. Add your domain in the Vercel dashboard.
2. Add a subdomain (`app.yourdomain.com`) in the Domains section.
3. The middleware will handle the routing automatically.

### Other Hosting Providers

For other hosting providers, you may need to:

1. Configure your web server (Nginx, Apache, etc.) to route requests based on the subdomain.
2. Ensure the middleware is properly handling the subdomain routing.

## Customization

To add more subdomains or modify the existing setup:

1. Update the middleware to handle additional subdomains.
2. Create corresponding directories in the `/app` directory.
3. Update the Next.js config if necessary.

## Troubleshooting

- If the subdomain routing isn't working locally, ensure your hosts file is properly configured.
- Check that the port number is included in the URL when testing locally (e.g., `http://app.localhost:3000`).
- Verify that the middleware is correctly detecting the subdomain.
- Clear your browser cache if you're experiencing unexpected behavior. 