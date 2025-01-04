import PaginationCard from '@/components/ui/pagination/pagination-card';
import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import { Candidate } from '@/types/schema-to-types';
import Pagination from '@/components/ui/pagination/pagination';
import CreateButton from '@/components/candidate/create-button';
import { FaPersonCirclePlus } from 'react-icons/fa6';

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string | null };
}) {
  let currentPage = 1;

  if (searchParams.page) {
    currentPage = parseInt(searchParams.page);
  }

  const candidatesCount = await safeFetch<{ count: number }>(
    `${API_PATH}/candidates/count`,
  );

  const candidates = await safeFetch<Candidate[]>(
    `${API_PATH}/candidates?limit=${PAGINATION_LIMIT}&offset=${PAGINATION_LIMIT * (currentPage - 1)}`,
  );

  const error = candidates.error || candidatesCount.error;

  return (
    <Pagination
      count={candidatesCount.data?.count ?? PAGINATION_LIMIT}
      pathname="/candidates"
      currentPage={currentPage}
      error={error}
    >
      <CreateButton
        path="candidates/create"
        label="Create candidate"
        icon={<FaPersonCirclePlus size="6rem" />}
      />
      {candidates.data &&
        candidates.data.map((candidate) => {
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
