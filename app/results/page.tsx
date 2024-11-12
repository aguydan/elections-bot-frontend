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
import { inter } from '@/lib/fonts';
import { AngledLine } from '@/components/ui/angled-line';

export default function Page() {
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
        <Stack display="inline-flex" mt="3.4rem" ml="3rem" gap="6rem">
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
                style={{ transform: 'rotate(-4.1deg)', zIndex: 1 }}
                src={''}
                alt="Candidate portrait"
                w="14rem"
                h="20rem"
              />
            </GradientDecoration>
            <CoverImage
              radius="1rem"
              className={classes.card}
              src={''}
              alt="Candidate portrait"
              w="11rem"
              h="15rem"
            />
            <CoverImage
              radius="1rem"
              className={classes.card}
              src={''}
              alt="Candidate portrait"
              w="11rem"
              h="15rem"
            />
            <CoverImage
              radius="1rem"
              className={classes.card}
              src={''}
              alt="Candidate portrait"
              w="11rem"
              h="15rem"
            />
          </Group>
          <Box ml="2.6rem" pos="relative" style={{ zIndex: 2 }}>
            <Paper
              ff={inter.style.fontFamily}
              pos="absolute"
              bottom="calc(100% + 0.5rem)"
              w="17rem"
              radius="0.8rem"
              p="0.8rem"
              bg="#F1E9E1"
            >
              <Flex align="start">
                <Text
                  component="span"
                  mx="0.5rem"
                  fw={900}
                  fz="2.8rem"
                  lh="3rem"
                  style={{ textWrap: 'nowrap' }}
                >
                  57.56%
                </Text>
                <Text component="span" fz="2.6rem" lh="2.6rem">
                  🎉
                </Text>
              </Flex>
              <AngledLine angle={-1.4} w="100%" h="3px" />
              <Stack mt="0.6rem" gap="1rem">
                <Box>
                  <Text lh="1rem" c="#B2A2A2">
                    President-elect
                  </Text>
                  <Text fw={900}>Торфинн Торссон</Text>
                </Box>
                <Box>
                  <Text lh="1rem" c="#766A6A">
                    Единый мир, Лярмэруж
                  </Text>
                  <Text c="#B2A2A2">143,544,655 votes</Text>
                </Box>
              </Stack>
            </Paper>
            <Paper
              bg="transparent"
              h="1.7rem"
              radius="1rem"
              style={{
                overflow: 'hidden',
                boxShadow: '0px 0px 6.5px -1px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* triangle after element */}
              <Box w="57%" bg="cyan" h="100%" />
            </Paper>
          </Box>
        </Stack>
      </InfoPaper>
    </Center>
  );
}
