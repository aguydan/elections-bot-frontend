'use client';

import { Flex } from '@mantine/core';
import ScoreCard from './score-card';

export default function ScoreList({
  score,
}: {
  score: Record<string, number>;
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

          return <ScoreCard key={label} label={label} score={value} />;
        })}
    </Flex>
  );
}
