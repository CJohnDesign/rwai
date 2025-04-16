'use client'

import { useEffect } from 'react'
import { ErrorEasterEgg } from '../components/ui/error-easter-egg'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Enhanced error logging
    console.error('🚨 Application Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: window.navigator.userAgent,
    });

    // Send error to monitoring service if available
    if (process.env.NODE_ENV === 'production') {
      // You can integrate with your error monitoring service here
      // Example: Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <ErrorEasterEgg 
        error={error}
        reset={reset}
        showDetails={process.env.NODE_ENV !== 'production'}
      />
    </div>
  )
} 