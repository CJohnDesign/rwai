"use client";

import { Skeleton } from "../../components/ui/skeleton";
import { Logo } from '../../components/ui/logo';

export default function Loading() {
  return (
    <div className="space-y-8 relative animate-in fade-in duration-500">
      {/* Skeleton header */}
      <div className="flex flex-col gap-4 w-full px-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-full max-w-3xl" />
      </div>

      {/* Skeleton Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>

      {/* Skeleton Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-48" />
          </div>
          
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex gap-3">
                <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
                <div className="space-y-2 flex-grow">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 