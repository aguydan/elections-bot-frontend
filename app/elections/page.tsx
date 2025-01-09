import PaginationCard from '@/components/ui/pagination/pagination-card';
import { Election } from '@/types/schema-to-types';
import Pagination from '@/components/ui/pagination/pagination';
import CreateButton from '@/components/candidate/create-button';
import { FaDiceFive } from 'react-icons/fa6';
import PaginationTable from '@/components/ui/pagination/pagination-table';
import { Suspense } from 'react';
import PaginationSkeleton from '@/components/ui/pagination/pagination-skeleton';

export default function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

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
    <Suspense fallback={<PaginationSkeleton />}>
      <Pagination totalItemsPath="elections/count">
        <PaginationTable
          itemsPath="elections"
          cards={itemsToCards}
          currentPage={currentPage}
        >
          <CreateButton
            path="elections/create"
            label="Create election"
            icon={<FaDiceFive size="6rem" />}
          />
        </PaginationTable>
      </Pagination>
    </Suspense>
  );
}
