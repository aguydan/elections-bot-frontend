import ScoreList from '@/components/candidate/score-list';
import { AngledLine } from '@/components/ui/angled-line';
import CoverImage from '@/components/ui/cover-image';
import { GradientDecoration } from '@/components/ui/gradient-decoration';
import { API_PATH, UPLOADS_PATH } from '@/constants/api';
import { candidateSchema } from '@/schema/candidate';
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
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import circle from '@/components/ui/decorations/circle-decoration.module.css';
import gradient from '@/components/ui/decorations/gradient-decoration.module.css';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_PATH}/candidates/${params.id}`);
  const candidate = (await response.json()) as z.infer<typeof candidateSchema>;

  if (!response.ok) {
    return notFound();
  }

  return (
    <Stack component="article" c="black">
      <Group
        component="section"
        align="start"
        p="3.5rem 2rem 0"
        mb="1rem"
        gap="xl"
        wrap="nowrap"
      >
        <Paper
          bg="white"
          pos="relative"
          miw="calc(0.75 * 18rem)"
          h="18rem"
          radius="lg"
        >
          <CoverImage
            radius="lg"
            alt="Candidate portrait"
            src={`${UPLOADS_PATH}/${candidate.image_url}`}
          />
        </Paper>
        <Stack gap="xs" miw={0}>
          <Group>
            <Box
              mt="1rem"
              className={circle.before + ' ' + gradient.after}
              pos="relative"
              maw="100%"
              fz={{
                base: '1.4rem',
                xs: '1.8rem',
                sm: '2.2rem',
              }}
            >
              <Title
                fw={800}
                fz={{
                  base: '1.4rem',
                  xs: '1.8rem',
                  sm: '2.2rem',
                }}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {candidate.name}
              </Title>
            </Box>
          </Group>
          <Flex align="center" gap={4} mt="1.4rem">
            <Text c="#716262" fw={700}>
              ORIGIN •
            </Text>
            <Text fw={800}>{candidate.origin ? candidate.origin : '?'}</Text>
          </Flex>
          <Box>
            <Text c="#716262" fw={700}>
              RUNNING MATE
            </Text>
            <Text fw={800}>
              {candidate.running_mate ? candidate.running_mate : 'No one'}
            </Text>
          </Box>
          <Box>
            <Text c="#716262" fw={700}>
              POLITICAL PARTY
            </Text>
            <Text fw={800}>
              {candidate.party ? candidate.party : 'Independent'}
            </Text>
          </Box>
        </Stack>
      </Group>
      <Stack mih="8.8rem" pos="relative">
        <Stack pos="absolute" w="100%">
          <AngledLine mx="auto" />
          <AngledLine mx="auto" left="0.4rem" mt="2.2rem" />
          <AngledLine mx="auto" mt="0.4rem" />
        </Stack>
        <ScoreList score={candidate.score} />
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
      <Group pos="absolute" right="1.6rem" top="1.6rem">
        <ActionIcon
          href={`${params.id}/edit`}
          component={Link}
          aria-label="Edit"
          variant="transparent"
          size="lg"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.0541 2.17785C19.6125 2.08045 21.1492 2.62156 22.3072 3.68213C23.3678 4.8401 23.9089 6.37684 23.8223 7.94605V18.0539C23.9197 19.6231 23.3678 21.1599 22.318 22.3179C21.16 23.3784 19.6125 23.9195 18.0541 23.8221H7.94611C6.37688 23.9195 4.84013 23.3784 3.68215 22.3179C2.62157 21.1599 2.08046 19.6231 2.17786 18.0539V7.94605C2.08046 6.37684 2.62157 4.8401 3.68215 3.68213C4.84013 2.62156 6.37688 2.08045 7.94611 2.17785H18.0541ZM11.8962 18.2487L19.1796 10.9438C19.8397 10.2728 19.8397 9.1906 19.1796 8.53045L17.7727 7.12357C17.1017 6.4526 16.0195 6.4526 15.3485 7.12357L14.6234 7.85948C14.5152 7.9677 14.5152 8.15167 14.6234 8.25989C14.6234 8.25989 16.3442 9.96979 16.3766 10.0131C16.4957 10.1429 16.5714 10.3161 16.5714 10.5109C16.5714 10.9005 16.2576 11.2252 15.8572 11.2252C15.6732 11.2252 15.5 11.1494 15.381 11.0304L13.5737 9.23389C13.4871 9.14731 13.3356 9.14731 13.249 9.23389L8.0868 14.396C7.72966 14.7532 7.52404 15.2294 7.51322 15.738L7.44828 18.3028C7.44828 18.4435 7.49157 18.5734 7.58897 18.6708C7.68637 18.7682 7.81624 18.8223 7.95693 18.8223H10.5002C11.0196 18.8223 11.5174 18.6167 11.8962 18.2487Z"
              fill="black"
            />
          </svg>
        </ActionIcon>
        <ActionIcon aria-label="Delete" variant="transparent" size="lg">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.1324 5.46143C21.5376 5.46143 21.875 5.79789 21.875 6.22601V6.62184C21.875 7.03954 21.5376 7.38642 21.1324 7.38642H3.8686C3.46235 7.38642 3.125 7.03954 3.125 6.62184V6.22601C3.125 5.79789 3.46235 5.46143 3.8686 5.46143H6.9058C7.52276 5.46143 8.05969 5.0229 8.19848 4.40415L8.35753 3.69374C8.60472 2.72605 9.41822 2.08334 10.3492 2.08334H14.6508C15.5716 2.08334 16.3943 2.72605 16.6323 3.6427L16.8025 4.40311C16.9403 5.0229 17.4772 5.46143 18.0952 5.46143H21.1324ZM19.5894 19.9313C19.9065 16.9761 20.4617 9.95535 20.4617 9.88452C20.4819 9.66993 20.412 9.46681 20.2732 9.30327C20.1243 9.15015 19.9359 9.05952 19.7282 9.05952H5.27971C5.07102 9.05952 4.87245 9.15015 4.73468 9.30327C4.59487 9.46681 4.52598 9.66993 4.53611 9.88452C4.53797 9.89753 4.5579 10.1448 4.5912 10.5583C4.73915 12.395 5.15122 17.5106 5.41749 19.9313C5.60592 21.7146 6.77602 22.8354 8.4709 22.8761C9.77878 22.9063 11.1262 22.9167 12.504 22.9167C13.8017 22.9167 15.1197 22.9063 16.4681 22.8761C18.2217 22.8458 19.3908 21.7448 19.5894 19.9313Z"
              fill="black"
            />
          </svg>
        </ActionIcon>
      </Group>
    </Stack>
  );
}
