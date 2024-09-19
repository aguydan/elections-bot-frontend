import FixedCoverImage from '@/components/ui/fixed-cover-image';
import { candidateSchema } from '@/schema/candidate';
import {
  Badge,
  Card,
  CardSection,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { z } from 'zod';

export default async function Page() {
  const response = await fetch('http://localhost:3001/candidates');
  const data = (await response.json()) as z.infer<typeof candidateSchema>[];

  return (
    <Stack align="center">
      <SimpleGrid mt="2rem" cols={5} spacing="xl">
        {data.map((candidate) => (
          <Card
            href={'/candidates/' + candidate.id}
            shadow="sm"
            withBorder
            padding="lg"
            component={Link}
          >
            <CardSection>
              <FixedCoverImage
                src={'http://localhost:3001/uploads/' + candidate.image_url}
              />
            </CardSection>
            <Text fw={500}>{candidate.name}</Text>
            <Badge>Wales, France</Badge>
          </Card>
        ))}
      </SimpleGrid>
      <Pagination total={2} />
    </Stack>
  );
}
