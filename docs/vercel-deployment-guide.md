# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying your Next.js application with subdomain support to Vercel.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment Steps](#deployment-steps)
- [Configuring Custom Domains](#configuring-custom-domains)
- [Environment Variables](#environment-variables)
- [Subdomain Configuration](#subdomain-configuration)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

## Prerequisites

Before deploying to Vercel, ensure you have:

1. A [Vercel account](https://vercel.com/signup)
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Node.js version 18.x or later installed locally

## Deployment Steps

### 1. Connect Your Repository

1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Select the repository containing your Next.js application

### 2. Configure Project Settings

In the configuration screen:

1. **Framework Preset**: Ensure "Next.js" is selected
2. **Root Directory**: Set to `/` 
3. **Build Command**: Leave as default (`next build`) or customize if needed
4. **Output Directory**: Leave as default (`.next`)
5. **Install Command**: Leave as default (`npm install`) or change to `yarn install` if using Yarn

### 3. Environment Variables

Add the following environment variables:

```
NEXT_PUBLIC_APP_URL=https://app.yourdomain.com
NEXT_PUBLIC_MAIN_URL=https://yourdomain.com
```

### 4. Deploy

Click "Deploy" and wait for the build to complete. Vercel will automatically detect your Next.js configuration and optimize the deployment.

## Configuring Custom Domains

### 1. Add Your Domain

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Domains"
3. Add your root domain (e.g., `yourdomain.com`)
4. Follow the instructions to configure DNS settings

### 2. Add Subdomain

1. In the same "Domains" section, add your app subdomain (e.g., `app.yourdomain.com`)
2. Configure the DNS settings as instructed

### 3. Verify Domain Configuration

Ensure both domains show as "Valid Configuration" in the Vercel dashboard.

## Subdomain Configuration

This project uses Next.js middleware to handle subdomain routing. The middleware is already configured to:

1. Detect requests to the `app` subdomain
2. Rewrite those requests to the appropriate paths in the `/app` directory

For Vercel deployment, no additional configuration is needed for the middleware to work correctly with your custom domains.

## Environment Variables

Ensure these environment variables are set in your Vercel project:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | The URL for your app subdomain | `https://app.yourdomain.com` |
| `NEXT_PUBLIC_MAIN_URL` | The URL for your main domain | `https://yourdomain.com` |

## Troubleshooting

### Subdomain Not Working

1. Verify your DNS configuration is correct
2. Check that the middleware is correctly detecting your subdomain
3. Review Vercel logs for any routing errors

### Build Failures

1. Check the build logs in Vercel
2. Ensure all dependencies are correctly installed
3. Verify your Next.js configuration is compatible with Vercel

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Custom Domain Configuration](https://vercel.com/docs/concepts/projects/domains)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

## Continuous Deployment

Vercel automatically deploys when changes are pushed to your repository. To configure branch deployments:

1. Go to your project settings
2. Navigate to "Git"
3. Configure production and preview branch settings

This ensures your application is always up-to-date with your latest code changes.