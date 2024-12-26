import { UPLOADS_PATH } from '@/constants/api';
import { Badge, Card, CardSection, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import CoverImage from './cover-image';

export default function PaginationCard({
  id,
  name,
  imageName,
  badges = [],
}: {
  id: number;
  name: string;
  imageName: string | null;
  badges?: { label: string; color: string }[];
}) {
  return (
    <Card
      href={`/candidates/${id}`}
      radius="lg"
      shadow="sm"
      component={Link}
      w={{ base: '16rem', xss: '10.4rem', sm: '14rem', md: '16rem' }}
      p={0}
    >
      <CardSection
        pos="relative"
        h={{ base: '11rem', xss: '10.4rem', sm: '14rem', md: '16rem' }}
      >
        <CoverImage
          src={`${UPLOADS_PATH}/${imageName}`}
          alt="Candidate portrait"
        />
      </CardSection>
      <Stack gap="0.4rem" mt="0.4rem" align="center" p="0 1rem 1rem">
        <Text
          fw={600}
          maw="100%"
          style={{
            textAlign: 'center',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {name}
        </Text>
        <Group justify="center" gap="0.4rem">
          {badges.map((badge) => (
            <Badge w="auto" flex="0 1 max-content" color={badge.color}>
              {badge.label}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
