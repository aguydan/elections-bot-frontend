import CreateCandidateButton from '@/components/candidate/create-candidate-button';
import ErrorWrapper from '@/components/ui/error-wrapper';
import PaginationCard from '@/components/ui/pagination/pagination-card';
import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import { Candidate } from '@/types/schema-to-types';
import {
  Group,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
  SimpleGrid,
  Stack,
} from '@mantine/core';
import Link from 'next/link';

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string | null };
}) {
  let page = 1,
    pagesCount = 1;

  const candidatesCount = await safeFetch<{ count: number }>(
    `${API_PATH}/candidates/countt`,
  );

  if (candidatesCount.data) {
    pagesCount = Math.ceil(candidatesCount.data.count / PAGINATION_LIMIT);
  }

  if (searchParams.page) {
    page = Math.min(parseInt(searchParams.page), pagesCount);
  }

  const candidates = await safeFetch<Candidate[]>(
    `${API_PATH}/candidates?limit=${PAGINATION_LIMIT}&offset=${PAGINATION_LIMIT * (page - 1)}`,
  );

  /*   const requests = [
    {
      resource: `${API_PATH}/candidates?limit=${PAGINATION_LIMIT}&offset=${PAGINATION_LIMIT * (page - 1)}`,
      middleware: (result: FetchResult<Candidate[]>) => result,
    },
    {
      resource: `${API_PATH}/candidates/count`,
      middleware: (result: FetchResult<{ count: number }>) => result,
    },
  ] as const; */

  //   const [candidates, candidatesCount] = await processRequests(requests);

  //create a custom hook for pagination
  /*   const [data, setData] = useState<Candidate[] | null>(null);
  const [count, setCount] = useState<number>(1);

  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const pathname = usePathname();
  const router = useRouter();

  const fetchData = async () => {
    //create a utility function for this
    try {
      const [data, count] = await Promise.all([
        await fetch(
          `${API_PATH}/candidates?limit=${PAGINATION_LIMIT}&offset=${PAGINATION_LIMIT * (page - 1)}`,
        ),
        await fetch(`${API_PATH}/candidates/count`),
      ]);

      if (!data.ok) throw data;
      if (!count.ok) throw count;

      setData(await data.json());
      //maybe even with middleware
      setCount((await count.json()).count);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaginationChange = (value: number) => {
    router.push(`${pathname}?page=${value}`);
  };

  useEffect(() => {
    fetchData();
  }, [page]); */

  return (
    <Stack my={{ base: '2rem', sm: '3rem' }} gap="3rem" align="center">
      <ErrorWrapper
        error={candidates.error || candidatesCount.error}
        specificInfo="Pagination might not work right now."
      >
        <SimpleGrid
          cols={{ base: 1, xss: 2, xs: 3, lg: 4, xl: 5 }}
          spacing="sm"
          style={{ alignItems: 'start' }}
        >
          <CreateCandidateButton />
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
                badges.push({ label: candidate.party, color: candidate.color });
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
        </SimpleGrid>
      </ErrorWrapper>
      <PaginationRoot total={pagesCount} value={page}>
        <Group gap="sm">
          <PaginationPrevious
            component={Link}
            href={{
              pathname: '/candidates',
              query: { page: Math.max(page - 1, 1) },
            }}
          />
          <PaginationItems />
          <PaginationNext
            component={Link}
            href={{
              pathname: '/candidates',
              query: { page: Math.min(page + 1, pagesCount) },
            }}
          />
        </Group>
      </PaginationRoot>
    </Stack>
  );
}
