import { InfoPaper } from '@/components/ui/info-paper';
import { Center } from '@mantine/core';
import { ReactNode } from 'react';
import classes from '@/components/candidate/candidate-paper.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Center>
      <InfoPaper
        classNames={{ parent: classes.parent }}
        bgSrc="/static/images/old-paper-bg.png"
        mt="3rem"
      >
        {children}
      </InfoPaper>
    </Center>
  );
}
