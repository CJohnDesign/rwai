import React from 'react';
import { Mail } from 'lucide-react';

interface ErrorEasterEggProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  showDetails?: boolean;
}

export function ErrorEasterEgg({ error, reset, showDetails = false }: ErrorEasterEggProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <div className="rounded-full bg-red-100 p-3 text-red-600 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Oops! Something's Not Quite Right</h2>
      <p className="text-muted-foreground mb-6">
        Don't worry, our AI is just having a moment. It happens to the best of us!
      </p>
      
      {showDetails && error && (
        <div className="mb-6 p-4 bg-muted rounded-lg text-left w-full max-w-2xl">
          <p className="font-mono text-sm mb-2">{error.message}</p>
          {error.digest && (
            <p className="font-mono text-xs text-muted-foreground">Error ID: {error.digest}</p>
          )}
        </div>
      )}

      {reset && (
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Let's Try That Again
        </button>
      )}
    </div>
  );
} 