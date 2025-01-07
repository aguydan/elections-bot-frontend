import { InfoPaper } from '@/components/ui/info-paper';
import { Center } from '@mantine/core';
import { ReactNode } from 'react';
import styles from '@/components/candidate/candidate-paper.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Center>
      <InfoPaper
        classNames={{ ...styles }}
        bgSrc="/static/images/old-paper-bg.png"
        mx="1rem"
      >
        {children}
      </InfoPaper>
    </Center>
  );
}
