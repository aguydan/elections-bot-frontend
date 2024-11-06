import { InfoPaper } from '@/components/ui/info-paper';
import { Center } from '@mantine/core';
import { ReactNode } from 'react';

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return (
    <Center>
      <InfoPaper>{children}</InfoPaper>
    </Center>
  );
}
