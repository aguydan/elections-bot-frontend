import ScoreCard from '@/components/candidate/score-card';
import CoverImage from '@/components/ui/cover-image';
import { API_PATH, UPLOADS_PATH } from '@/constants/api';
import { candidateSchema } from '@/schema/candidate';
import {
  Button,
  ColorSwatch,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { z } from 'zod';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_PATH}/candidates/${params.id}`);
  const candidate = (await response.json()) as z.infer<typeof candidateSchema>;

  if (!response.ok) {
    return notFound();
  }

  return (
    <Stack>
      <Group align="flex-start" gap="xl">
        <CoverImage
          w="12rem"
          h="16rem"
          alt="Candidate portrait"
          src={`${UPLOADS_PATH}/${candidate.image_url}`}
        />
        <Stack flex={1} gap="xs">
          <Group>
            <Title order={2}>{candidate.name}</Title>
            <ColorSwatch color={candidate.color} />
          </Group>
          <Divider variant="dashed" />
          <SimpleGrid maw="17rem" cols={2} spacing="xs">
            <Text fw={500}>Origin</Text>
            <Text>{candidate.origin ? candidate.origin : '?'}</Text>
            <Text fw={500}>Running mate</Text>
            <Text>
              {candidate.running_mate ? candidate.running_mate : 'No one'}
            </Text>
            <Text fw={500}>Political party</Text>
            <Text>{candidate.party ? candidate.party : 'Independent'}</Text>
          </SimpleGrid>
        </Stack>
      </Group>
      <Flex wrap="wrap" gap="xs" justify="center">
        {Object.entries(candidate.score)
          .sort((a, b) => b[1] - a[1])
          .map((entry) => (
            <ScoreCard
              key={entry[0]}
              score={entry[1]}
              name={entry[0]}
              color="#000000"
            />
          ))}
      </Flex>
      <Group justify="end">
        <Button
          href={`${params.id}/edit`}
          component={Link}
          color={candidate.color}
        >
          Edit
        </Button>
        <Button color={candidate.color}>Delete</Button>
      </Group>
    </Stack>
  );
}
