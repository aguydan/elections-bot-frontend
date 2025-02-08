'use client';

import ErrorMessage from '@/components/ui/error-message';
import { Button } from '@mantine/core';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorMessage
      style={{ textAlign: 'center' }}
      bg="transparent"
      c="black"
      m={{ base: '1rem', xs: '2rem' }}
      message={error.message}
      description="Candidate page might not show right now."
    >
      <Button mt="1rem" onClick={() => reset()} size="md" bg="#bc3f3f">
        Try again
      </Button>
    </ErrorMessage>
  );
}
