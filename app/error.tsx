'use client';

import ErrorBoundary from '@/components/ui/error-boundary';
import { Button, Stack } from '@mantine/core';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Stack align="center">
      <ErrorBoundary
        message={error.message}
        description="Something unexpected happened."
      />
      <Button onClick={() => reset()} size="md" bg="#bc3f3f">
        Try again
      </Button>
    </Stack>
  );
}
