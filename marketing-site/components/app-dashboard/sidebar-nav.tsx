"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  Grid, 
  Cpu, 
  Server, 
  Menu,
  X,
  Settings,
  HelpCircle
} from "lucide-react";
import { ThemeToggle } from "../../components/ui/theme-toggle";
import { Logo } from '../../components/ui/logo';
import { getMainUrl } from '../../lib/url-utils';

interface NavigationLink {
  href: string;
  label: string;
  active: boolean;
}

interface SidebarNavProps {
  navigationLinks: NavigationLink[];
}

export function SidebarNav({ navigationLinks }: SidebarNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Map navigation links to icons
  const getIconForLink = (label: string) => {
    switch (label.toLowerCase()) {
      case 'dashboard':
        return <Home className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />;
      case 'models':
        return <Grid className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />;
      case 'gpus':
        return <Cpu className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />;
      case 'mcp':
        return <Server className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />;
      default:
        return <Grid className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />;
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="p-2 text-muted-foreground hover:text-foreground focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="text-foreground">
              <a href={getMainUrl()} className="block">
                <Logo height={24} className="text-foreground" />
              </a>
            </div>
            <button
              className="p-1 text-muted-foreground hover:text-foreground focus:outline-none"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">NAVIGATION</p>
              <nav className="space-y-1">
                {navigationLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group ${
                      link.active 
                        ? "text-foreground bg-muted" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                    onClick={toggleSidebar}
                  >
                    {getIconForLink(link.label)}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="px-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">ACCOUNT</p>
              <nav className="space-y-1">
                <Link 
                  href="/usage" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground group"
                  onClick={toggleSidebar}
                >
                  <Grid className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  Usage
                </Link>
                <Link 
                  href="/billing" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground group"
                  onClick={toggleSidebar}
                >
                  <Grid className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  Billing
                </Link>
              </nav>
            </div>
            
            <div className="px-4 mt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">PREFERENCES</p>
              <nav className="space-y-1">
                <Link 
                  href="/settings" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground group"
                  onClick={toggleSidebar}
                >
                  <Settings className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  Settings
                </Link>
                <Link 
                  href="/help" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground group"
                  onClick={toggleSidebar}
                >
                  <HelpCircle className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  Help & Support
                </Link>
              </nav>
            </div>
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</span>
              <ThemeToggle variant="icon" className="text-muted-foreground hover:text-foreground" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 