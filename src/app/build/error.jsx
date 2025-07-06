'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-12 text-center">
      <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">
        An error occurred while loading the resume builder. Please try again.
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}