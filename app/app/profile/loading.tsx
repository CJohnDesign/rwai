import { Card } from "../../../components/ui/card";

export default function ProfileLoading() {
  return (
    <div className="space-y-8">
      {/* Page Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="h-8 w-32 bg-muted animate-pulse rounded-md"></div>
        <div className="h-10 w-full md:w-32 bg-muted animate-pulse rounded-md"></div>
      </div>

      {/* Profile Overview Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card Skeleton */}
        <Card className="p-6 col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 bg-muted animate-pulse rounded-full mb-4"></div>
            <div className="h-6 w-32 bg-muted animate-pulse rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-muted animate-pulse rounded-md mb-2"></div>
            <div className="h-5 w-20 bg-muted animate-pulse rounded-full mb-4"></div>
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded-full"></div>
                <div className="h-4 w-32 bg-muted animate-pulse rounded-md"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded-full"></div>
                <div className="h-4 w-40 bg-muted animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="h-5 w-16 bg-muted animate-pulse rounded-md mb-2"></div>
            <div className="h-4 w-full bg-muted animate-pulse rounded-md mb-1"></div>
            <div className="h-4 w-full bg-muted animate-pulse rounded-md mb-1"></div>
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md"></div>
          </div>
        </Card>

        {/* Tabs Section Skeleton */}
        <div className="col-span-1 md:col-span-2">
          <div className="h-10 w-full bg-muted animate-pulse rounded-md mb-6"></div>
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex flex-col">
                  <div className="h-4 w-16 bg-muted animate-pulse rounded-md mb-2"></div>
                  <div className="h-8 w-20 bg-muted animate-pulse rounded-md"></div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Quick Actions Skeleton */}
          <Card className="p-6">
            <div className="h-6 w-32 bg-muted animate-pulse rounded-md mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center p-3 rounded-lg border border-border">
                  <div className="h-5 w-5 bg-muted animate-pulse rounded-full mr-3"></div>
                  <div>
                    <div className="h-5 w-24 bg-muted animate-pulse rounded-md mb-1"></div>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 