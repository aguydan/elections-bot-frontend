import CoverImage from '@/components/ui/cover-image';
import { GradientDecoration } from '@/components/ui/gradient-decoration';
import {
  Center,
  Paper,
  Title,
  Text,
  Flex,
  Group,
  Stack,
  BackgroundImage,
  Box,
} from '@mantine/core';
import { InfoPaper } from '@/components/ui/info-paper';

import infoPaperClasses from '@/components/results/results-paper.module.css';
import classes from './styles.module.css';
import ResultsDeck from '@/components/results/results-deck';
import { API_PATH } from '@/constants/api';
import { z } from 'zod';
import { electionResultSchema } from '@/schema/election-result';

export default async function Page() {
  const response = await fetch(`${API_PATH}/results?limit=7`);
  const results = (await response.json()) as z.infer<
    typeof electionResultSchema
  >[];

  results.sort((a, b) => b.percentage - a.percentage);

  return (
    <Center>
      {/* We should probably put both the candidate info paper and results info paper in 
 their own components. I already have folders for them in the components folder with their styles
 */}
      <InfoPaper
        classNames={{
          parent: infoPaperClasses.parent,
        }}
        mt="3rem"
        c="black"
        p="3rem 3.5rem"
        w="65rem"
        bg="#B78D64"
      >
        <Paper
          className={classes.flag}
          w="14rem"
          h="14rem"
          pos="absolute"
          bg="black"
          radius="100%"
          right="4.5rem"
          top="5rem"
          style={{
            transform: 'rotate(5deg)',
            overflow: 'hidden',
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          }}
        >
          <BackgroundImage src="/static/images/gb.png" h="100%" />
        </Paper>
        <Title lh="2.6rem" order={1} fw={800} fz="2.6rem">
          Election Results
        </Title>
        <Flex c="#84766F" gap="0.3rem">
          <Text fw={600} fz="xl">
            Президентские выборы во Франции •
          </Text>
          <Text fw={600} fz="xl">
            1753
          </Text>
        </Flex>
        <Stack display="inline-flex" mt="3.4rem" ml="3rem" gap="6.6rem">
          <Group pos="relative" align="end">
            <GradientDecoration
              radius="1.4rem"
              gradientLeft="-1rem"
              gradientWidth="44rem"
              angle={2}
              gradientAddHeight="2.2rem"
              gradientTop="-1.4rem"
            >
              <CoverImage
                radius="1rem"
                left="2rem"
                className={classes.card}
                style={{ transform: 'rotate(-4deg)', zIndex: 1 }}
                src={''}
                alt="Candidate portrait"
                w="14rem"
                h="20rem"
              />
            </GradientDecoration>
            {results.slice(1, 4).map((result) => (
              <CoverImage
                radius="1rem"
                className={classes.card}
                src={''}
                alt="Candidate portrait"
                w="11rem"
                h="15rem"
              />
            ))}
          </Group>
          <Box ml="2.6rem" pos="relative" style={{ zIndex: 2 }}>
            <ResultsDeck results={results} />
            <Paper
              display="flex"
              bg="transparent"
              h="1.7rem"
              radius="1rem"
              style={{
                overflow: 'hidden',
                boxShadow: '0px 0px 6.5px -1px rgba(0, 0, 0, 0.25)',
              }}
            >
              {results.map((result) => (
                <Box
                  className={classes.share}
                  w={result.percentage + '%'}
                  bg={result.color}
                  h="100%"
                />
              ))}
            </Paper>
          </Box>
        </Stack>
      </InfoPaper>
    </Center>
  );
}
