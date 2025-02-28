'use client';

import ErrorMessage from '@/components/ui/error-message';
import { Button } from '@mantine/core';
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
    <ErrorMessage
      style={{ textAlign: 'center' }}
      px={{ base: '1rem', xss: '2rem' }}
      message={error.message}
      description="Something unexpected happened."
    >
      <Button mt="1rem" onClick={() => reset()} size="md" bg="#bc3f3f">
        Try again
      </Button>
    </ErrorMessage>
  );
}
