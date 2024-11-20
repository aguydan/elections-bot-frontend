import FixedCoverImage from '@/components/ui/fixed-cover-image';
import { API_PATH, UPLOADS_PATH } from '@/constants/api';
import { candidateSchema } from '@/schema/candidate';
import {
  Badge,
  Card,
  CardSection,
  Pagination,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { FaPersonCirclePlus } from 'react-icons/fa6';
import { z } from 'zod';

export default async function Page() {
  const response = await fetch(`${API_PATH}/candidates`);
  const data = (await response.json()) as z.infer<typeof candidateSchema>[];

  return (
    <Stack align="center">
      <SimpleGrid mt="2rem" cols={5} spacing="xl">
        <Paper
          c="yellow"
          component={Link}
          href={'candidates/create'}
          bd="dashed"
        >
          <Stack align="center" h="100%" justify="center">
            <FaPersonCirclePlus style={{ width: '5rem', height: '5rem' }} />
            <Text fw={600}>Create candidate</Text>
          </Stack>
        </Paper>

        {data.map((candidate) => (
          <Card
            key={candidate.id}
            href={`/candidates/${candidate.id}`}
            shadow="sm"
            withBorder
            padding="lg"
            component={Link}
          >
            <CardSection>
              <FixedCoverImage src={`${UPLOADS_PATH}/${candidate.image_url}`} />
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
