import PaginationCard from '@/components/ui/pagination/pagination-card';
import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import { Candidate } from '@/types/schema-to-types';
import Pagination from '@/components/ui/pagination/pagination';
import CreateButton from '@/components/candidate/create-button';
import { FaPersonCirclePlus } from 'react-icons/fa6';
import PaginationTable from '@/components/ui/pagination/pagination-table';
import { Suspense } from 'react';
import Loading from '../loading';
import { Box, SimpleGrid } from '@mantine/core';

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalItems = await safeFetch<{ count: number }>(
    `${API_PATH}/candidates/count`,
  );

  const itemsToCards = (data: Candidate[]) => {
    const labels = ['origin', 'running_mate', 'party'] as const;

    return data.map((candidate) => {
      const badges = [];

      for (const label of labels) {
        if (candidate[label]) {
          badges.push({
            label: candidate[label],
            color: candidate.color,
          });
        }

        if (label === 'party') {
          badges.push({
            label: 'Independent',
            color: 'gray',
          });
        }
      }

      return (
        <PaginationCard
          key={candidate.id}
          id={candidate.id}
          name={candidate.name}
          imageName={candidate.image_url}
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
            path="candidates/create"
            label="Create candidate"
            icon={<FaPersonCirclePlus size="6rem" />}
          />
        </SimpleGrid>
      </Box>
      <Suspense fallback={<Loading />}>
        <PaginationTable
          itemPath="candidates"
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
