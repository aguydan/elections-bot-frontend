import { PAGINATION_LIMIT } from '@/constants/app';
import { SimpleGrid, Skeleton } from '@mantine/core';
import styles from './pagination-grid.module.css';

export default async function PaginationTableSkeleton() {
  const generate = () => {
    const skeletons = [];

    for (let i = 0; i < PAGINATION_LIMIT; i++) {
      skeletons.push(
        <Skeleton
          key={i}
          h={`${18 + Math.random() * 7}rem`}
          w={{ base: '16rem', xss: '10.4rem', sm: '14rem', md: '16rem' }}
          radius="lg"
        />,
      );
    }

    return skeletons;
  };

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
      {generate()}
    </SimpleGrid>
  );
}
