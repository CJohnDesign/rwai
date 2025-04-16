"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { 
  LayoutDashboard, 
  Brain, 
  User, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut 
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: string;
  disabled?: boolean;
}

interface DashboardNavProps {
  items: NavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname();

  // Map icon names to their components
  const iconMap = {
    dashboard: LayoutDashboard,
    brain: Brain,
    user: User,
    creditCard: CreditCard,
    settings: Settings,
    help: HelpCircle,
    logout: LogOut,
  };

  return (
    <nav className="grid items-start gap-2 px-2 py-4">
      {items.map((item) => {
        // Get the icon component based on the icon name
        const Icon = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
} 