import { SimpleGrid } from '@mantine/core';
import { ReactNode, Suspense } from 'react';
import PaginationCards from './pagination-cards';
import PaginationCardsSkeleton from './pagination-cards-skeleton';

export default function PaginationTable({
  children,
  ...props
}: {
  itemPath: string;
  currentPage: number;
  cards: (data: any[]) => JSX.Element[] | JSX.Element[];
  children?: ReactNode;
}) {
  return (
    <SimpleGrid
      cols={{ base: 1, xss: 2, xs: 3, lg: 4, xl: 5 }}
      spacing="sm"
      w="max-content"
      mx="auto"
      style={{ alignItems: 'start' }}
    >
      {children}
      <Suspense fallback={<PaginationCardsSkeleton />}>
        <PaginationCards key={props.currentPage} {...props} />
      </Suspense>
    </SimpleGrid>
  );
}
