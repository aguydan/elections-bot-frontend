'use client';

import { candidateScoreEmojis, candidateScoreNames } from '@/lang/constants';
import { Box, Flex, lighten, luminance, Paper, Text } from '@mantine/core';
import classes from './score-card.module.css';
import { inter } from '@/lib/fonts';

export default function ScoreCard({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  //   const adjustedColor = lighten(color, score);

  return (
    <Paper
      className={classes.root}
      flex={'1 1 auto'}
      p="0.8rem 1.4rem"
      radius="1.4rem"
      style={{ transform: `rotate(${Math.random() * 5}deg)` }}
    >
      <Flex gap="0.6rem">
        <Text>
          {candidateScoreEmojis[label as keyof typeof candidateScoreEmojis]}
        </Text>
        <Text fw={700}>
          {candidateScoreNames[label as keyof typeof candidateScoreNames]}
        </Text>
      </Flex>
      <Text
        style={{ textAlign: 'right' }}
        mt="1.2rem"
        ff={inter.style.fontFamily}
        lh="2.8rem"
        fz="2.8rem"
        fw={900}
      >
        {score}
      </Text>
    </Paper>

    /*     <Paper classNames={classes} flex={1} p="lg" radius="lg" bg={adjustedColor}>
      <Stack align="center" gap={0}>
        <Text
          c={luminance(adjustedColor) > 0.3 ? '#000000' : '#ffffff'}
          size="xl"
          fw={800}
        >
          {score}
        </Text>
        <Text c={luminance(adjustedColor) > 0.3 ? '#000000' : '#ffffff'}>
          {candidateScoreNames[name as keyof typeof candidateScoreNames]}
        </Text>
      </Stack>
    </Paper> */
  );
}
