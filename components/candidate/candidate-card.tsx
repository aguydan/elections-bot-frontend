import ScoreList from '@/components/candidate/score-list';
import { AngledLine } from '@/components/ui/angled-line';
import CoverImage from '@/components/ui/cover-image';
import { GradientDecoration } from '@/components/ui/gradient-decoration';
import { API_PATH, UPLOADS_PATH } from '@/constants/api';
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import circle from '@/components/ui/decorations/circle-decoration.module.css';
import gradient from '@/components/ui/decorations/gradient-decoration.module.css';
import { safeFetch } from '@/lib/fetch-utils';
import { Candidate } from '@/types/schema-to-types';
import { notFound } from 'next/navigation';
import EditButton from '../ui/buttons/edit-button';
import DeleteButton from '../ui/buttons/delete-button';
import { deleteCandidate } from '@/actions/delete-candidate';

export default async function CandidateCard({ id }: { id: string }) {
  const candidate = await safeFetch<Candidate>(`${API_PATH}/candidates/${id}`);

  if (candidate.status === 404) {
    return notFound();
  }

  if (!candidate.data) {
    throw new Error(candidate.error);
  }

  return (
    <Stack component="article" c="black">
      <Flex
        component="section"
        align={{ base: 'center', xs: 'start' }}
        p={{ base: '4rem 2rem 0', xs: '3.5rem 2rem 0' }}
        mb="1rem"
        gap="md"
        direction={{ base: 'column', xs: 'row' }}
      >
        <Paper
          bg="white"
          flex="none"
          pos="relative"
          w="min(calc(0.75 * 18rem), 100%)"
          h="18rem"
          radius="lg"
        >
          <CoverImage
            radius="lg"
            alt="Candidate portrait"
            src={`${UPLOADS_PATH}/${candidate.data.image_url}`}
          />
        </Paper>
        <Stack
          miw={0}
          pl={{ base: 0, xs: '0.8rem' }}
          style={{ alignSelf: 'stretch' }}
          justify="space-between"
        >
          <Box
            mt="1rem"
            className={circle.before + ' ' + gradient.after}
            style={{
              '--circle-bg-color': candidate.data.color,
            }}
            pos="relative"
            maw="100%"
            fz={{
              base: '1.4rem',
              xs: '1.6rem',
              sm: '2.2rem',
            }}
          >
            <Title
              fw={800}
              fz={{
                base: '1.4rem',
                xs: '1.6rem',
                sm: '2.2rem',
              }}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {candidate.data.name}
            </Title>
          </Box>
          <Stack gap="xs" mt="1.4rem">
            <Box>
              <Text component="span" pr="0.3rem" c="#716262" fw={700}>
                ORIGIN •
              </Text>
              <Text component="span" fw={800}>
                {candidate.data.origin || '?'}
              </Text>
            </Box>
            <Box>
              <Text c="#716262" fw={700}>
                RUNNING MATE
              </Text>
              <Text fw={800}>{candidate.data.running_mate || 'No one'}</Text>
            </Box>
            <Box>
              <Text c="#716262" fw={700}>
                POLITICAL PARTY
              </Text>
              <Text fw={800}>{candidate.data.party || 'Independent'}</Text>
            </Box>
          </Stack>
        </Stack>
      </Flex>
      <Stack mih="8.8rem" pos="relative">
        <Stack pos="absolute" w="100%">
          <AngledLine mx="auto" />
          <AngledLine mx="auto" left="0.4rem" mt="2.2rem" />
          <AngledLine mx="auto" mt="0.4rem" />
        </Stack>
        <ScoreList score={candidate.data.score} />
        <Stack pos="absolute" w="100%" bottom={0}>
          <AngledLine mx="auto" left="-0.4rem" />
          <AngledLine mx="auto" left="-0.4rem" mt="1.8rem" />
        </Stack>
      </Stack>
      <GradientDecoration angle={1} gradientTop="-0.34rem" m="0 2.5rem 2.5rem">
        <Text fw={600} fz="lg">
          Candidate score • Total 0.78
        </Text>
      </GradientDecoration>
      <Group pos="absolute" right="1.2rem" top="1rem">
        <EditButton href={`${id}/edit`} />
        <DeleteButton
          id={id}
          redirectPath="/candidates"
          action={deleteCandidate}
        />
      </Group>
    </Stack>
  );
}
