import CoverImage from '@/components/ui/cover-image';
import { candidateSchema } from '@/schema/candidate';
import { Button, ColorSwatch, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { z } from 'zod';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch('http://localhost:3001/candidates/' + params.id);
  const candidate = (await response.json()) as z.infer<typeof candidateSchema>;

  return (
    <Stack>
      <Group align="flex-start" gap="xl">
        <CoverImage
          src={`http://localhost:3001/uploads/${candidate.image_url}`}
        />
        <Stack>
          <Group>
            <Title order={2}>{candidate.name}</Title>
            <ColorSwatch color={candidate.color} />
          </Group>
          <Text>Running mate</Text>
        </Stack>
      </Group>
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
