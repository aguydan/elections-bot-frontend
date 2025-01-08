import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import { SimpleGrid } from '@mantine/core';
import styles from './pagination-grid.module.css';
import PaginationTableSkeleton from './pagination-table-skeleton';

//error handling
export default async function PaginationTable({
  itemPath,
  currentPage,
  cards,
}: {
  itemPath: string;
  currentPage: number;
  cards: (data: any[]) => JSX.Element[] | JSX.Element[];
}) {
  const items = await safeFetch<unknown[]>(
    `${API_PATH}/${itemPath}?limit=${PAGINATION_LIMIT}&offset=${PAGINATION_LIMIT * (currentPage - 1)}`,
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!items.data) {
    return <PaginationTableSkeleton />;
  }

  return (
    <SimpleGrid
      //To account for the height and position of the create button on small screen sizes
      pt={{ base: '13.25rem', xss: 0 }}
      className={styles.offseted}
      //
      cols={{ base: 1, xss: 2, xs: 3, lg: 4, xl: 5 }}
      spacing="sm"
      w="max-content"
      mx="auto"
      style={{ alignItems: 'start' }}
    >
      {typeof cards === 'function' ? cards(items.data) : cards}
    </SimpleGrid>
  );
}
