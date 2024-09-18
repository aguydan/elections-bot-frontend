import { Center, Paper } from '@mantine/core';
import { ReactNode } from 'react';

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return (
    <Center>
      <Paper mt="2rem" shadow="md" p="xl" withBorder miw="46rem">
        {children}
      </Paper>
    </Center>
  );
}
