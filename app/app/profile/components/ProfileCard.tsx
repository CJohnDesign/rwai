import { MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    location: string;
    joinDate: string;
    bio: string;
    avatarUrl: string;
    tier: string;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="p-5 col-span-1">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-base font-semibold">{user.name}</h2>
        <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
        <Badge variant="secondary" className="mb-3">{user.tier} Tier</Badge>
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm">{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm">Joined {user.joinDate}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border">
        <h3 className="text-sm font-medium mb-2">About</h3>
        <p className="text-sm text-muted-foreground">{user.bio}</p>
      </div>
    </Card>
  );
} 