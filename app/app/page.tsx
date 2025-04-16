"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BarChart3, CreditCard, Server, Users, ArrowUpRight, ArrowDownRight, Activity, Clock, ExternalLink, MoreVertical } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import the WhitelistOverlay with no SSR
const WhitelistOverlay = dynamic(
  () => import('../../components/app-dashboard/whitelist-overlay').then(mod => mod.WhitelistOverlay),
  { ssr: false }
);

export default function AppPage() {
  return (
    <div className="space-y-8 relative">
      {/* Page Header */}
      <div className="flex flex-col gap-4 w-full px-4">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground max-w-3xl">
          Welcome back, John. Here's an overview of your account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-4">
        <Card className="rounded-xl border border-border bg-card hover:border-primary/50 transition-colors overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <div className="p-1 bg-primary/10 rounded-full">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$489.12</div>
            <div className="flex items-center mt-1 text-xs">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +2.5%
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-border bg-card hover:border-primary/50 transition-colors overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Servers</CardTitle>
            <div className="p-1 bg-green-500/10 rounded-full">
              <Server className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="flex items-center mt-1 text-xs">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +1
              </span>
              <span className="ml-1 text-muted-foreground">from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-border bg-card hover:border-primary/50 transition-colors overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usage Hours</CardTitle>
            <div className="p-1 bg-purple-500/10 rounded-full">
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">128.5</div>
            <div className="flex items-center mt-1 text-xs">
              <span className="flex items-center text-red-500">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                -12%
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-border bg-card hover:border-primary/50 transition-colors overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
            <div className="p-1 bg-orange-500/10 rounded-full">
              <Activity className="w-4 h-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94.2%</div>
            <div className="flex items-center mt-1 text-xs">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +0.5%
              </span>
              <span className="ml-1 text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
        {/* Active Servers */}
        <Card className="lg:col-span-2 rounded-xl border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Active Servers</CardTitle>
            <CardDescription className="text-muted-foreground">Your currently running AI infrastructure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Server Item */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">GPU-01</div>
                    <div className="text-xs text-muted-foreground">NVIDIA A100 • Running for 3d 5h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 text-xs font-medium text-green-500 bg-green-500/10 rounded-full">
                    Active
                  </div>
                  <button className="p-1 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Server Item */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">GPU-02</div>
                    <div className="text-xs text-muted-foreground">NVIDIA A100 • Running for 1d 12h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 text-xs font-medium text-green-500 bg-green-500/10 rounded-full">
                    Active
                  </div>
                  <button className="p-1 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Server Item */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">CPU-01</div>
                    <div className="text-xs text-muted-foreground">Intel Xeon • Running for 5h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 text-xs font-medium text-green-500 bg-green-500/10 rounded-full">
                    Active
                  </div>
                  <button className="p-1 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Link 
                href="/app/servers" 
                className="text-sm text-primary hover:text-primary/80 flex items-center"
              >
                View all servers
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-xl border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">Latest actions in your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Payment Processed</p>
                  <p className="text-xs text-muted-foreground">$250.00 added to your balance</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Server className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Server Started</p>
                  <p className="text-xs text-muted-foreground">CPU-01 was started successfully</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Team Member Added</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson joined your team</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Yesterday</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Usage Report</p>
                  <p className="text-xs text-muted-foreground">Monthly usage report generated</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Link 
                href="/app/activity" 
                className="text-sm text-primary hover:text-primary/80 flex items-center"
              >
                View all activity
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 