'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="container min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-headline font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground mt-2">{error.message || "An unexpected error occurred."}</p>
      <Button
        className="mt-6"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
