'use client';

import { PAGINATION_LIMIT } from '@/constants/app';
import {
  Group,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
} from '@mantine/core';
import styles from '@/components/ui/pagination/pagination-navigation.module.css';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function PaginationNavigation({
  totalItems,
  error = null,
}: {
  totalItems: number;
  error?: string | null;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalItems / PAGINATION_LIMIT);

  const createPageURL = (pageNumber: number) => {
    pageNumber = Math.min(pageNumber, totalPages);

    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const handleChange = (pageNumber: number) => {
    push(createPageURL(pageNumber));
  };

  return (
    <PaginationRoot
      disabled={!!error}
      className={styles.navigation}
      py={{ base: '1rem', xs: '1rem 2rem' }}
      w="100%"
      bg="#242424"
      pos="fixed"
      bottom={0}
      total={totalPages}
      value={currentPage}
      onChange={(value) => handleChange(value)}
      onNextPage={() => handleChange(currentPage + 1)}
      onPreviousPage={() => handleChange(currentPage - 1)}
      style={{
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <Group gap="sm">
        <PaginationPrevious />
        <PaginationItems />
        <PaginationNext />
      </Group>
    </PaginationRoot>
  );
}
