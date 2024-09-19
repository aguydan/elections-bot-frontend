import { Center, Paper } from '@mantine/core';
import { ReactNode } from 'react';

export default function CardPlaceholder({ children }: { children: ReactNode }) {
  return (
    <Center>
      <Paper mt="2rem" shadow="md" p="xl" withBorder w="50rem">
        {children}
      </Paper>
    </Center>
  );
}
