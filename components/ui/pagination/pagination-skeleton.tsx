import { Box, SimpleGrid, Skeleton } from '@mantine/core';
import PaginationCardsSkeleton from './pagination-cards-skeleton';

export default async function PaginationSkeleton() {
  return (
    <Box mb={{ base: '8rem', sm: '8rem' }}>
      <SimpleGrid
        cols={{ base: 1, xss: 2, xs: 3, lg: 4, xl: 5 }}
        spacing="sm"
        w="max-content"
        mx="auto"
        style={{ alignItems: 'start' }}
      >
        <Skeleton
          h="12.5rem"
          w={{ base: '16rem', xss: '10.4rem', sm: '14rem', md: '16rem' }}
          radius="lg"
        />
        <PaginationCardsSkeleton />
      </SimpleGrid>
    </Box>
  );
}
