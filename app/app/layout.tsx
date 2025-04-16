"use client";

import { usePathname } from "next/navigation";
import { GeistSans, GeistMono } from 'geist/font';
import { Sora } from "next/font/google";
import { UserAccountDropdown } from '../../components/app-dashboard/user-account-dropdown';
import { Logo } from '../../components/ui/logo';
import { ThemeProvider } from '../../components/theme-provider';
import { ThemeToggle } from '../../components/ui/theme-toggle';
import { SidebarNav } from '../../components/app-dashboard/sidebar-nav';
import { Bell, CreditCard, Server, Users, BarChart3, DollarSign, Menu } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import '../globals.css';
import { getMainUrl } from '../../lib/url-utils';

// Import Head and useEffect
import Head from 'next/head';
import { useEffect } from 'react';

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

// Recent activity data for notifications
const recentActivity = [
  {
    id: 1,
    title: "Payment Processed",
    description: "$250.00 added to your balance",
    time: "2 hours ago",
    icon: CreditCard,
    iconBg: "bg-blue-900",
    iconColor: "text-blue-400"
  },
  {
    id: 2,
    title: "Server Started",
    description: "CPU-01 was started successfully",
    time: "5 hours ago",
    icon: Server,
    iconBg: "bg-green-900",
    iconColor: "text-green-400"
  },
  {
    id: 3,
    title: "Team Member Added",
    description: "Sarah Johnson joined your team",
    time: "Yesterday",
    icon: Users,
    iconBg: "bg-purple-900",
    iconColor: "text-purple-400"
  },
  {
    id: 4,
    title: "Usage Report",
    description: "Monthly usage report generated",
    time: "2 days ago",
    icon: BarChart3,
    iconBg: "bg-orange-900",
    iconColor: "text-orange-400"
  }
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Define navigation links with dynamic active state
  const navigationLinks = [
    { href: "/", label: "Dashboard", active: pathname === "/" || pathname === "/app" },
    { href: "/models", label: "Models", active: pathname.includes("/models") },
    { href: "/gpus", label: "GPUs", active: pathname.includes("/gpus") },
    { href: "/mcp", label: "MCP", active: pathname.includes("/mcp") },
  ];

  // Effect to ensure consistent theme across both layouts
  useEffect(() => {
    // This ensures the theme from localStorage is applied after the component mounts
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (savedTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('dark');
    }
    
    // Preload critical images
    const preloadLogo = document.createElement('link');
    preloadLogo.rel = 'preload';
    preloadLogo.as = 'image';
    preloadLogo.href = '/images/RWAi_logo-xs.png';
    document.head.appendChild(preloadLogo);
    
    // Preload user avatar
    const preloadAvatar = document.createElement('link');
    preloadAvatar.rel = 'preload';
    preloadAvatar.as = 'image';
    preloadAvatar.href = '/images/RWAi - girl sm.png';
    document.head.appendChild(preloadAvatar);
  }, []);

  useEffect(() => {
    // Log page navigation and environment info
    console.log(`📱 App Navigation - ${new Date().toISOString()}`);
    console.log(`📍 Path: ${pathname}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Base URL: ${process.env.NEXT_PUBLIC_APP_URL}`);
  }, [pathname]);

  // Error boundary for deployment issues
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('🚨 App Error:', {
        message: error.message,
        filename: error.filename,
        lineno: error.lineno,
        colno: error.colno,
        timestamp: new Date().toISOString(),
        path: pathname,
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [pathname]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className={`${GeistSans.variable} ${GeistMono.variable} ${sora.variable} min-h-screen flex flex-col bg-background text-foreground`}>
        {/* Top header with logo and user dropdown */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo and mobile menu */}
              <div className="flex items-center">
                {/* Mobile menu button - only visible on small screens */}
                <div className="md:hidden mr-2">
                  <SidebarNav navigationLinks={navigationLinks} />
                </div>
                
                {/* Logo */}
                <div className="h-6 md:h-7">
                  <a href={getMainUrl()} className="block">
                    <Logo height={24} className="md:h-7" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Balance display with link to usage & billing page */}
                <Link href="/usage" className="hidden sm:flex items-center gap-1.5 py-1.5 px-4 bg-muted rounded-full border border-border hover:bg-muted/80 transition-colors">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-green-500 dark:text-green-400">489.12</span>
                </Link>
                
                {/* Notification bell with dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none rounded-full transition-colors">
                      <Bell className="h-5 w-5" />
                      {/* Red notification indicator */}
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-card"></span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden rounded-xl shadow-lg border border-border bg-card text-card-foreground">
                    <DropdownMenuLabel className="font-normal flex justify-between items-center p-4 bg-card border-b border-border">
                      <span className="font-medium">Recent Activity</span>
                      <Link href="/activity" className="text-xs text-blue-500 hover:text-blue-400">
                        View all
                      </Link>
                    </DropdownMenuLabel>
                    <div className="max-h-[350px] overflow-y-auto">
                      {recentActivity.map((item) => (
                        <div key={item.id} className="p-4 hover:bg-muted cursor-pointer border-b border-border">
                          <div className="flex gap-3">
                            <div className={`flex-shrink-0 h-10 w-10 ${item.iconBg} rounded-full flex items-center justify-center`}>
                              <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                              <p className="text-xs text-muted-foreground/70 mt-1">{item.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-card border-t border-border">
                      <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-1.5 rounded-md hover:bg-muted transition-colors">
                        Mark all as read
                      </button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* User account dropdown */}
                <UserAccountDropdown 
                  userName="Rawina Dark"
                  userEmail="rawina@rwai.xyz"
                  userImageUrl="/images/RWAi - girl sm.png"
                  balance="$489.12"
                  hideBalance={true}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main navigation - only visible on medium screens and up */}
        <nav className="hidden md:block bg-card border-b border-border sticky top-[57px] z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`px-4 py-4 text-sm font-medium relative ${
                    link.active 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative">
          {children}
        </main>

        <footer className="bg-card border-t border-border py-6">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} RWAi. All rights reserved.
              </div>
              <div className="flex space-x-6 items-center mt-4 sm:mt-0">
                <SocialIcon 
                  url="https://x.com/RWAi_xyz" 
                  network="x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ height: 24, width: 24 }}
                  bgColor="transparent"
                  fgColor="currentColor"
                  className="text-muted-foreground hover:text-foreground"
                />
                <a href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
                <a href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
} 