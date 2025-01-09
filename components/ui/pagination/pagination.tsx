import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import PaginationNavigation from '@/components/ui/pagination/pagination-navigation';
import { Box } from '@mantine/core';
import { ReactNode } from 'react';

export default async function Pagination({
  totalItemsPath,
  children,
}: {
  totalItemsPath: string;
  children: ReactNode;
}) {
  const totalItems = await safeFetch<{ count: number }>(
    `${API_PATH}/${totalItemsPath}`,
  );

  return (
    <Box mb={{ base: '8rem', sm: '8rem' }}>
      {children}
      <PaginationNavigation
        totalItems={totalItems.data?.count || PAGINATION_LIMIT}
        error={totalItems.error}
      />
    </Box>
  );
}
