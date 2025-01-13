import { InfoPaper } from '@/components/ui/info-paper';
import { Center } from '@mantine/core';
import { ReactNode } from 'react';
import styles from '@/components/candidate/candidate-paper.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    //put both layouts into a single component
    <Center>
      <InfoPaper
        classNames={{ ...styles }}
        bgSrc="/assets/images/noise.png"
        mx="1rem"
        mb="3rem"
      >
        {children}
      </InfoPaper>
    </Center>
  );
}
