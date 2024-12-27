'use client';

import { candidateScoreEmojis, candidateScoreNames } from '@/lang/constants';
import { darken, Flex, lighten, Paper, Text } from '@mantine/core';
import classes from './score-card.module.css';
import { inter } from '@/lib/fonts';

export default function ScoreCard({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const threshold = 0.2;

  const primaryColor =
    score > threshold
      ? lighten('#ab78dd', score - threshold)
      : darken('#ab78dd', threshold - score);
  const secondaryColor =
    score > threshold
      ? lighten('#00000066', score - threshold)
      : darken('#00000066', threshold - score);

  return (
    <Paper
      className={classes.root}
      flex={'1 1 auto'}
      p="0.8rem 1.4rem"
      radius="1.4rem"
      style={{
        '--card-primary-color': primaryColor,
        '--card-secondary-color': secondaryColor,
        transform: `rotate(${Math.random() * 5}deg)`,
      }}
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
        className={classes.score}
        ff={inter.style.fontFamily}
        lh={{ base: '2.4rem', xs: '2.8rem' }}
        fz={{ base: '2.4rem', xs: '2.8rem' }}
        fw={900}
      >
        {score}
      </Text>
    </Paper>
  );
}
