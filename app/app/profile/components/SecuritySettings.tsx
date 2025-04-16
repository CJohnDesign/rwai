import { Key, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  enabled?: boolean;
  lastChanged?: string;
  icon: React.ElementType;
}

interface SecuritySettingsProps {
  settings: SecuritySetting[];
}

export function SecuritySettings({ settings }: SecuritySettingsProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-medium mb-3">Security Settings</h3>
      <div className="space-y-3">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                <setting.icon className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-medium">{setting.title}</h4>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
                {setting.lastChanged && (
                  <p className="text-xs text-muted-foreground mt-1">Last changed: {setting.lastChanged}</p>
                )}
              </div>
            </div>
            <div>
              {setting.enabled !== undefined ? (
                <Badge variant={setting.enabled ? "default" : "outline"} className="text-xs">
                  {setting.enabled ? "Enabled" : "Disabled"}
                </Badge>
              ) : (
                <Button variant="outline" size="sm" className="text-xs">
                  Change
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-border">
        <h4 className="text-sm font-medium mb-3">Advanced Security</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start text-sm">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-sm">
            <Shield className="mr-2 h-4 w-4" />
            Security Log
          </Button>
        </div>
      </div>
    </Card>
  );
} 