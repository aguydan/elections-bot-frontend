import { PAGINATION_LIMIT } from '@/constants/app';
import {
  Group,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
  SimpleGrid,
} from '@mantine/core';
import Link from 'next/link';
import styles from '@/components/ui/pagination/pagination.module.css';
import { ReactNode } from 'react';
import ErrorBoundary from '@/components/ui/error-boundary';

export default function Pagination({
  children,
  count,
  pathname,
  currentPage = 1,
  error = null,
}: {
  children: ReactNode;
  count: number;
  pathname: string;
  currentPage?: number;
  error?: string | null;
}) {
  //Number of pages depending on the total number of items
  const pagesCount = count ? Math.ceil(count / PAGINATION_LIMIT) : 1;

  currentPage = Math.min(currentPage, pagesCount);

  return (
    <ErrorBoundary
      my={{ base: '2rem 8rem', sm: '3rem 8rem' }}
      message={error}
      description="Pagination might not work right now."
    >
      <SimpleGrid
        w="max-content"
        m="0 auto"
        cols={{ base: 1, xss: 2, xs: 3, lg: 4, xl: 5 }}
        spacing="sm"
        style={{ alignItems: 'start' }}
      >
        {children}
      </SimpleGrid>
      <PaginationRoot
        disabled={!!error}
        className={styles.navigation}
        w="100%"
        py={{ base: '1rem', xs: '1rem 2rem' }}
        bg="#242424"
        pos="fixed"
        bottom={0}
        total={pagesCount}
        value={currentPage}
        style={{
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Group gap="sm">
          <PaginationPrevious
            style={{ pointerEvents: error ? 'none' : 'initial' }}
            component={Link}
            href={{
              pathname,
              query: { page: Math.max(currentPage - 1, 1) },
            }}
          />
          <PaginationItems />
          <PaginationNext
            style={{ pointerEvents: error ? 'none' : 'initial' }}
            component={Link}
            href={{
              pathname,
              query: { page: Math.min(currentPage + 1, pagesCount) },
            }}
          />
        </Group>
      </PaginationRoot>
    </ErrorBoundary>
  );
}
