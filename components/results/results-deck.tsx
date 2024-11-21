import { Box, Flex } from '@mantine/core';
import { ResultsCard } from './results-card';
import classes from './results-deck.module.css';
import { z } from 'zod';
import { electionResultSchema } from '@/schema/election-result';

export default function ResultsDeck({
  results,
}: {
  results: z.infer<typeof electionResultSchema>[];
}) {
  return (
    <Flex
      className={classes.deck}
      w="100%"
      pos="absolute"
      bottom="calc(100% + 0.5rem)"
    >
      {results.map((result, i) =>
        i == 0 ? (
          <Box className={classes.cardContainer}>
            <ResultsCard
              right={0}
              pos="absolute"
              className={classes.card}
              name={result.candidate_name}
              party={result.party ?? 'Independent'}
              percentage={result.percentage}
              popularVote={result.popular_vote}
              variant="winner"
              style={{
                zIndex: results.length - i,
              }}
            />
          </Box>
        ) : (
          <Box className={classes.cardContainer}>
            <ResultsCard
              right={0}
              pos="absolute"
              className={classes.card}
              name={result.candidate_name}
              party={result.party ?? 'Independent'}
              percentage={result.percentage}
              popularVote={result.popular_vote}
              variant="loser"
              place={i + 1}
              style={{
                zIndex: results.length - i,
              }}
            />
          </Box>
        ),
      )}
    </Flex>
  );
}
