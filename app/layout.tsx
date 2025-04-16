import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RWAi | Tokenizing AI's Infrastructure",
  description: "RWAi enables fractional ownership of AI infrastructure through tokenization. Invest in GPU clusters, data centers, and AI computing resources with our innovative Web3 platform. Join the future of decentralized AI infrastructure ownership and earn passive income from high-demand computing resources.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_MAIN_URL || 'https://rwai.xyz'),
  keywords: [
    "AI infrastructure",
    "GPU tokenization",
    "fractional ownership",
    "Web3",
    "blockchain",
    "data centers",
    "passive income",
    "AI computing",
    "decentralized infrastructure",
    "GPU investment"
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rwai.xyz',
    siteName: 'RWAi',
    title: 'RWAi | Tokenizing AI\'s Infrastructure',
    description: 'RWAi enables fractional ownership of AI infrastructure through tokenization. Invest in GPU clusters, data centers, and AI computing resources.',
    images: [{
      url: '/images/rwai_fb.png',
      width: 1200,
      height: 630,
      alt: 'RWAi - Tokenizing AI Infrastructure',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RWAi_xyz',
    creator: '@RWAi_xyz',
    title: 'RWAi | Tokenizing AI\'s Infrastructure',
    description: 'RWAi enables fractional ownership of AI infrastructure through tokenization. Invest in GPU clusters, data centers, and AI computing resources.',
    images: [{
      url: '/images/rwai_x.png',
      width: 1200,
      height: 675,
      alt: 'RWAi - Tokenizing AI Infrastructure'
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png" }
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon_io/site.webmanifest",
      },
      {
        rel: "android-chrome",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager with cookie-based tracking */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js',
                'config': {
                  'cookie_domain': '.rwai.xyz',
                  'cookie_flags': 'SameSite=None;Secure',
                  'cookie_update': true,
                  'send_page_view': true,
                  'use_amp_client_id': true
                }
              });
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KBSN67QN');

            // Configure GA4 for cookie-based cross-domain tracking
            gtag('config', 'G-3RT06YPS1M', {
              'cookie_domain': '.rwai.xyz',
              'cookie_flags': 'SameSite=None;Secure',
              'linker': {
                'domains': ['rwai.xyz', 'app.rwai.xyz'],
                'decorate_forms': true,
                'accept_incoming': true,
                'url_position': 'none'
              },
              'transport_url': 'https://rwai.xyz',
              'allow_google_signals': true,
              'allow_ad_personalization_signals': false
            });
          `}
        </Script>
        
        {/* Initialize scroll tracking */}
        <Script id="scroll-tracking" strategy="afterInteractive">
          {`
            window.addEventListener('scroll', function() {
              if (typeof window.dataLayer !== 'undefined') {
                const scrollPercentage = Math.round(
                  (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );
                window.dataLayer.push({
                  'event': 'scroll_depth',
                  'scroll_depth_threshold': scrollPercentage,
                  'scroll_depth_units': 'percent',
                  'page_location': window.location.pathname, // Changed to pathname only
                  'page_title': document.title
                });
              }
            }, { passive: true });
          `}
        </Script>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // This script runs before React hydration to prevent flash of unstyled content
              try {
                // Check localStorage for theme preference
                const savedTheme = localStorage.getItem('theme') || 'dark';
                
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  // Default to dark mode for any other value or if not set
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                // Fail silently if localStorage is not available
                // Default to dark mode
                document.documentElement.classList.add('dark');
                console.error('Failed to access localStorage:', e);
              }
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${sora.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KBSN67QN"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
