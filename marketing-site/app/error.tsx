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
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background">
      <ErrorEasterEgg />
    </div>
  )
} 