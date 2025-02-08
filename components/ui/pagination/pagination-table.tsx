import { Box } from '@mantine/core';
import { ReactNode, Suspense } from 'react';
import PaginationCards from './pagination-cards';
import PaginationCardsSkeleton from './pagination-cards-skeleton';
import classes from './pagination-table.module.css';

export default function PaginationTable({
  children,
  ...props
}: {
  itemsPath: string;
  currentPage: number;
  cards: (data: any[]) => JSX.Element[] | JSX.Element[];
  children?: ReactNode;
}) {
  return (
    <Box className={classes.table}>
      {children}
      <Suspense fallback={<PaginationCardsSkeleton />}>
        <PaginationCards key={props.currentPage} {...props} />
      </Suspense>
    </Box>
  );
}
