import { PAGINATION_LIMIT } from '@/constants/app';
import { Skeleton } from '@mantine/core';

export default async function PaginationCardsSkeleton() {
  const generate = () => {
    const skeletons = [];

    for (let i = 0; i < PAGINATION_LIMIT; i++) {
      skeletons.push(
        <Skeleton
          key={i}
          h="21rem"
          w={{ base: '16rem', xss: '10.4rem', sm: '14rem', md: '16rem' }}
          radius="lg"
        />,
      );
    }

    return skeletons;
  };

  return <>{generate()}</>;
}
