'use client';

import { candidateScoreNames } from '@/lang/constants';
import { lighten, luminance, Paper, Stack, Text } from '@mantine/core';
import classes from './score-card.module.css';

export default function ScoreCard({
  score,
  name,
  color,
}: {
  score: number;
  name: string;
  color: string;
}) {
  const adjustedColor = lighten(color, score);

  return (
    <Paper classNames={classes} flex={1} p="lg" radius="lg" bg={adjustedColor}>
      <Stack align="center" gap={0}>
        <Text
          c={luminance(adjustedColor) > 0.3 ? '#000000' : '#ffffff'}
          size="xl"
          fw={800}
        >
          {score}
        </Text>
        <Text>
          {candidateScoreNames[name as keyof typeof candidateScoreNames]}
        </Text>
      </Stack>
    </Paper>
  );
}
