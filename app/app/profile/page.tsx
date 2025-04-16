"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "./components/ProfileCard";
import { UsageStats } from "./components/UsageStats";
import { QuickActions } from "./components/QuickActions";
import { ActivityList } from "./components/ActivityList";
import { SecuritySettings } from "./components/SecuritySettings";
import { WhitelistOverlay } from "../../../components/app-dashboard/whitelist-overlay";
import { 
  CreditCard,
  BarChart3,
  Server,
  Clock,
  CheckCircle2,
  Shield,
  Key,
  Bell
} from "lucide-react";

// Mock user data
const userData = {
  id: "user-1",
  name: "Rawina Dark",
  email: "rawina@rwai.xyz",
  location: "San Francisco, CA",
  joinDate: "January 2023",
  bio: "AI infrastructure enthusiast focused on optimizing inference performance. Passionate about leveraging open-source models for practical applications.",
  avatarUrl: "/images/RWAi - girl.png",
  tier: "Pro",
};

// Mock usage stats
const usageStats = {
  balance: "$489.12",
  gpusUsed: 3,
  totalSpend: "$245.32"
};

// Mock activity data
const recentActivity = [
  {
    id: 1,
    type: "payment",
    title: "Payment Processed",
    description: "$125.00 added to your balance",
    date: "2 hours ago",
    icon: CreditCard,
    iconBg: "bg-blue-900",
    iconColor: "text-blue-400"
  },
  {
    id: 2,
    type: "server",
    title: "GPU Server Online",
    description: "Your GPU-01 is now online and ready for inference",
    date: "5 hours ago",
    icon: Server,
    iconBg: "bg-green-900",
    iconColor: "text-green-400"
  },
  {
    id: 3,
    type: "usage",
    title: "Model Usage Spike",
    description: "LLaMA 3.1 inference requests increased by 25%",
    date: "Yesterday",
    icon: BarChart3,
    iconBg: "bg-purple-900",
    iconColor: "text-purple-400"
  },
  {
    id: 4,
    type: "system",
    title: "System Maintenance",
    description: "Scheduled maintenance completed",
    date: "2 days ago",
    icon: CheckCircle2,
    iconBg: "bg-orange-900",
    iconColor: "text-orange-400"
  }
];

// Mock security settings
const securitySettings = [
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    enabled: true,
    icon: Shield
  },
  {
    id: "password",
    title: "Password",
    description: "Change your password regularly for better security",
    lastChanged: "3 months ago",
    icon: Key
  },
  {
    id: "notifications",
    title: "Security Notifications",
    description: "Get notified about important security events",
    enabled: true,
    icon: Bell
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
        <Button size="sm" className="w-full md:w-auto">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <ProfileCard user={userData} />

        {/* Tabs Section */}
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-5 mt-5">
              {/* Usage Stats */}
              <UsageStats stats={usageStats} />
              
              {/* Quick Actions */}
              <QuickActions />
            </TabsContent>
            
            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-5 mt-5">
              <ActivityList activities={recentActivity} />
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="space-y-5 mt-5">
              <SecuritySettings settings={securitySettings} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 