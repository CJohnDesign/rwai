import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RWAi Dashboard',
  description: 'Manage your RWAi account and resources',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon_io/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon_io/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon_io/favicon-32x32.png',
      },
    ],
  },
}; 