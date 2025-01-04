import PaginationCard from '@/components/ui/pagination/pagination-card';
import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import { Election } from '@/types/schema-to-types';
import Pagination from '@/components/ui/pagination/pagination';
import CreateButton from '@/components/candidate/create-button';
import { FaDiceFive } from 'react-icons/fa6';

//create badges to util functions!!!!
export default async function Page({
  searchParams,
}: {
  searchParams: { page: string | null };
}) {
  let currentPage = 1;

  if (searchParams.page) {
    currentPage = parseInt(searchParams.page);
  }

  const electionsCount = await safeFetch<{ count: number }>(
    `${API_PATH}/elections/count`,
  );

  const elections = await safeFetch<Election[]>(
    `${API_PATH}/elections?limit=${PAGINATION_LIMIT}&offset=${PAGINATION_LIMIT * (currentPage - 1)}`,
  );

  const error = elections.error || electionsCount.error;

  return (
    <Pagination
      count={electionsCount.data?.count ?? PAGINATION_LIMIT}
      pathname="/elections"
      currentPage={currentPage}
      error={error}
    >
      <CreateButton
        path="elections/create"
        label="Create election"
        icon={<FaDiceFive size="6rem" />}
      />
      {elections.data &&
        elections.data.map((candidate) => {
          const badges = [];

          //another option is for label in [ 'origin', 'party', 'etc' ] and access by name
          if (candidate.origin)
            badges.push({
              label: candidate.origin,
              color: candidate.color,
            });

          if (candidate.party) {
            badges.push({
              label: candidate.party,
              color: candidate.color,
            });
          } else {
            badges.push({ label: 'Independent', color: 'gray' });
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
        })}
    </Pagination>
  );
}
