import PaginationCard from '@/components/ui/pagination/pagination-card';
import { Candidate } from '@/types/schema-to-types';
import CreateButton from '@/components/candidate/create-button';
import { FaPersonCirclePlus } from 'react-icons/fa6';
import PaginationTable from '@/components/ui/pagination/pagination-table';
import { Suspense } from 'react';
import PaginationSkeleton from '@/components/ui/pagination/pagination-skeleton';
import Pagination from '@/components/ui/pagination/pagination';

export default function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

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
    <Suspense fallback={<PaginationSkeleton />}>
      <Pagination totalItemsPath="candidates/count">
        <PaginationTable
          itemsPath="candidates"
          cards={itemsToCards}
          currentPage={currentPage}
        >
          <CreateButton
            path="candidates/create"
            label="Create candidate"
            icon={<FaPersonCirclePlus size="6rem" />}
          />
        </PaginationTable>
      </Pagination>
    </Suspense>
  );
}
