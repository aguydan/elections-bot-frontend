import CreateCandidateButton from '@/components/candidate/create-candidate-button';
import PaginationCard from '@/components/ui/pagination-card';
import { API_PATH } from '@/constants/api';
import { Candidate } from '@/types/schema-to-types';
import { Pagination, SimpleGrid, Stack } from '@mantine/core';

export default async function Page() {
  const response = await fetch(`${API_PATH}/candidates`);
  const data = (await response.json()) as Candidate[];

  return (
    <Stack m={{ base: '2rem 0', sm: '3rem 0' }} gap="3rem" align="center">
      <SimpleGrid cols={{ base: 1, xss: 2, xs: 3, lg: 4, xl: 5 }} spacing="sm">
        <CreateCandidateButton />
        {data.map((candidate) => {
          const badges = [];

          if (candidate.origin)
            badges.push({ label: candidate.origin, color: candidate.color });

          if (candidate.party) {
            badges.push({ label: candidate.party, color: candidate.color });
          } else {
            badges.push({ label: 'Independent', color: 'gray' });
          }

          return (
            <PaginationCard
              id={candidate.id}
              name={candidate.name}
              imageName={candidate.image_url}
              badges={badges}
            />
          );
        })}
      </SimpleGrid>
      <Pagination total={2} />
    </Stack>
  );
}
