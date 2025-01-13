'use client';

import { Flex } from '@mantine/core';
import ScoreCard from './score-card';

export default function ScoreList({
  score,
  color,
}: {
  score: Record<string, number>;
  color: string;
}) {
  return (
    <Flex
      px="1rem"
      gap="0.4rem"
      wrap="wrap"
      align="start"
      style={{ zIndex: 10 }}
    >
      {Object.entries(score)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => {
          const [label, value] = entry;

          return (
            <ScoreCard key={label} label={label} score={value} color={color} />
          );
        })}
    </Flex>
  );
}
