import React from 'react';
import { Mail } from 'lucide-react';

export function ErrorEasterEgg() {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Oops! Our AI is Taking a Coffee Break
          </h1>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 text-left space-y-4">
            <p className="text-sm text-muted-foreground font-mono">
              {'>'}  Congratulations, seeker! You've discovered something unexpected.
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              {'>'}  While our database takes a brief intermission, here's a secret:
            </p>
            <div className="pl-4 border-l-2 border-primary/30">
              <p className="text-sm text-foreground">
                "Hey there! I'm Chris, the architect behind this digital realm. 
                Found this glitch? I'd love to hear about your journey here."
              </p>
            </div>
            <div className="flex items-center justify-center pt-4">
              <a 
                href="mailto:chris@rwai.xyz"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="font-mono">chris@rwai.xyz</span>
              </a>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-8">
            This message will self-destruct in... just kidding, refresh whenever you're ready.
          </p>
        </div>
      </div>
    </div>
  );
} 