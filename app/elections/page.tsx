import PaginationCard from '@/components/ui/pagination/pagination-card';
import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import { Election } from '@/types/schema-to-types';
import Pagination from '@/components/ui/pagination/pagination';
import CreateButton from '@/components/candidate/create-button';
import { FaDiceFive } from 'react-icons/fa6';
import PaginationTable from '@/components/ui/pagination/pagination-table';
import { Box, SimpleGrid } from '@mantine/core';
import { Suspense } from 'react';
import PaginationTableSkeleton from '@/components/ui/pagination/pagination-table-skeleton';

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalItems = await safeFetch<{ count: number }>(
    `${API_PATH}/elections/count`,
  );

  const itemsToCards = (data: Election[]) => {
    const labels = ['type', 'date', 'country'] as const;

    return data.map((election) => {
      const badges = [];

      for (const label of labels) {
        if (election[label]) {
          badges.push({
            label: election[label],
            color: 'gray',
          });
        }
      }

      return (
        <PaginationCard
          key={election.id}
          id={election.id}
          name={election.name}
          imageName={election.flag_url}
          badges={badges}
        />
      );
    });
  };
  return (
    <Box mb={{ base: '8rem', sm: '8rem' }}>
      <Box pos="absolute" w="100%">
        <SimpleGrid
          cols={{ base: 1, xss: 2, xs: 3, lg: 4, xl: 5 }}
          spacing="sm"
          w="max-content"
          mx="auto"
        >
          <CreateButton
            path="elections/create"
            label="Create election"
            icon={<FaDiceFive size="6rem" />}
          />
        </SimpleGrid>
      </Box>
      <Suspense fallback={<PaginationTableSkeleton />}>
        <PaginationTable
          itemPath="elections"
          cards={itemsToCards}
          currentPage={currentPage}
        />
      </Suspense>
      <Pagination
        totalItems={totalItems.data?.count || PAGINATION_LIMIT}
        error={totalItems.error}
      />
    </Box>
  );
}
