'use client';

import { Box, Flex } from '@mantine/core';
import { ResultsCard } from './results-card';
import { useEffect, useRef } from 'react';
import classes from './results-deck.module.css';
import { z } from 'zod';
import { electionResultSchema } from '@/schema/election-result';

export default function ResultsDeck({
  results,
}: {
  results: z.infer<typeof electionResultSchema>[];
}) {
  const [winner, ...losers] = results;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // we can probably do this with css variables
  useEffect(() => {
    const peekingPartWidth = `calc((100% - 17rem) / ${cardRefs.current.length - 1})`;

    for (let i = 0; i < cardRefs.current.length; i++) {
      cardRefs.current[i]?.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            containerRef.current!.style.gridTemplateColumns =
              peekingPartWidth.repeat(i) +
              '17rem ' +
              peekingPartWidth.repeat(cardRefs.current.length - i - 1);
          });
        });
      });

      cardRefs.current[i]?.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            containerRef.current!.style.gridTemplateColumns =
              '17rem ' + peekingPartWidth.repeat(5);
          });
        });
      });
    }
  }, []);

  return (
    <Flex
      w="100%"
      pos="absolute"
      bottom="calc(100% + 0.5rem)"
      justify="space-between"
    >
      <ResultsCard
        className={classes.card}
        name={winner.candidate_name}
        party={winner.party ?? 'Independent'}
        percentage={winner.percentage}
        popularVote={winner.popular_vote}
        variant="winner"
        style={{
          zIndex: 100,
        }}
      />
      <Box
        w={0}
        flex={`0 1 max(40%, ${100 - losers[0].percentage}%)`}
        className={classes.deck}
        ref={containerRef}
      >
        {losers.map((loser, i) => (
          <ResultsCard
            className={classes.card}
            name={loser.candidate_name}
            party={loser.party ?? 'Independent'}
            percentage={loser.percentage}
            popularVote={loser.popular_vote}
            variant="loser"
            place={i + 2}
            ref={(element) => {
              cardRefs.current[i] = element;
            }}
            style={{
              zIndex: results.length - i,
            }}
          />
        ))}
      </Box>
    </Flex>
  );
}
