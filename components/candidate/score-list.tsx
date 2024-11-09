'use client';

import { Flex } from '@mantine/core';
import ScoreCard from './score-card';
import { useMemo } from 'react';

export default function ScoreList({
  score,
}: {
  score: Record<string, number>;
}) {
  const scores = useMemo(() => {
    return Object.entries(score)
      .sort((a, b) => b[1] - a[1])
      .map((entry, i) => {
        const [label, value] = entry;

        return <ScoreCard key={i} label={label} score={value} />;
      });
  }, []);

  return (
    <Flex
      px="1rem"
      gap="0.4rem"
      wrap="wrap"
      align="start"
      style={{ zIndex: 10 }}
    >
      {scores}
    </Flex>
  );
}
