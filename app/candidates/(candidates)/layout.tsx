import { InfoPaper } from '@/components/ui/info-paper';
import { Center } from '@mantine/core';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Center>
      <InfoPaper mt="3rem">{children}</InfoPaper>
    </Center>
  );
}
