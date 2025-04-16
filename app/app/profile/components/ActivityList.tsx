import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

interface ActivityListProps {
  activities: ActivityItem[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-medium mb-3">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
            <div className={`flex-shrink-0 h-8 w-8 ${activity.iconBg} rounded-full flex items-center justify-center`}>
              <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.date}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border text-center">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          View All Activity
        </Button>
      </div>
    </Card>
  );
} 