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
import { API_PATH, UPLOADS_PATH } from '@/constants/api';
import { z } from 'zod';
import { heldElectionSchema } from '@/schema/held-election';

export default async function Page() {
  const response = await fetch(`${API_PATH}/held`, { cache: 'no-store' });
  const heldElection = (await response.json()) as z.infer<
    typeof heldElectionSchema
  >;

  return (
    <Center>
      {/* We should probably put both the candidate info paper and results info paper in 
 their own components. I already have folders for them in the components folder with their styles
 */}
      <InfoPaper
        id="screenshotable"
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
          bg="white"
          radius="100%"
          right="4.5rem"
          top="5rem"
          style={{
            transform: 'rotate(5deg)',
            overflow: 'hidden',
            boxShadow: '0px 0px 6.5px -1px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* see https://stackoverflow.com/questions/6492027/css-transform-jagged-edges-in-chrome */}
          <BackgroundImage
            src="/static/images/gb.png"
            h="100%"
            style={{ WebkitBackfaceVisibility: 'hidden' }}
          />
        </Paper>
        <Title lh="2.6rem" order={1} fw={800} fz="2.6rem">
          Election Results
        </Title>
        <Flex c="#84766F" gap="0.3rem">
          <Text fw={600} fz="xl">
            {heldElection.election_name + ' •'}
          </Text>
          <Text fw={600} fz="xl">
            {heldElection.date}
          </Text>
        </Flex>
        <Stack maw="50rem" mt="3.4rem" ml="3rem" gap="6.6rem">
          <Group pos="relative" align="end">
            <GradientDecoration
              radius="1.4rem"
              gradientLeft="-1rem"
              gradientWidth="44rem"
              angle={2}
              gradientAddHeight="2.2rem"
              gradientTop="-1.4rem"
            >
              <Paper
                className={classes.card}
                radius="1rem"
                w="14rem"
                h="20rem"
                left="2rem"
                pos="relative"
                bg="white"
                style={{ transform: 'rotate(-4deg)', zIndex: 1 }}
              >
                <CoverImage
                  src={`${UPLOADS_PATH}/${heldElection.results[0].image_url}`}
                  alt="Candidate portrait"
                />
              </Paper>
            </GradientDecoration>
            {heldElection.results.slice(1, 4).map((result) => (
              <Paper w="11rem" h="15rem" pos="relative" bg="transparent">
                <CoverImage
                  radius="1rem"
                  className={classes.card}
                  src={`${UPLOADS_PATH}/${result.image_url}`}
                  alt="Candidate portrait"
                />
              </Paper>
            ))}
          </Group>
          <Box ml="2.6rem" pos="relative" style={{ zIndex: 2 }}>
            <ResultsDeck results={heldElection.results} />
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
              {heldElection.results.map((result) => (
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
