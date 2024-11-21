import { inter } from '@/lib/fonts';
import { Box, Flex, Paper, PaperProps, Stack, Text } from '@mantine/core';
import { AngledLine } from '../ui/angled-line';
import { ForwardedRef, forwardRef } from 'react';

type ResultsCardProps = (
  | {
      variant: 'winner';
      place?: never;
    }
  | {
      variant: 'loser';
      place: number;
    }
) & {
  percentage: number;
  name: string;
  party: string;
  popularVote: number;
} & PaperProps;

export const ResultsCard = forwardRef(
  (
    {
      variant,
      place,
      percentage,
      name,
      party,
      popularVote,
      ...others
    }: ResultsCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Paper
        {...others}
        ref={ref}
        bottom={0}
        ff={inter.style.fontFamily}
        w="17rem"
        radius="0.8rem"
        p="0.4rem 0.8rem"
        bg="#F1E9E1"
        shadow="sm"
      >
        <Flex align="start">
          {variant == 'winner' ? (
            <Text
              component="span"
              fw={900}
              mt="0.2rem"
              fz="2.8rem"
              lh="3rem"
              style={{ textWrap: 'nowrap' }}
            >
              {percentage + '%'}
            </Text>
          ) : (
            <Text fw={900} fz="2rem" lh="2.5rem" style={{ textWrap: 'nowrap' }}>
              {percentage + '%'}
            </Text>
          )}
          {variant == 'winner' && (
            <Text
              component="span"
              mt="0.2rem"
              ml="0.3rem"
              fz="2.6rem"
              lh="2.6rem"
            >
              🎉
            </Text>
          )}
        </Flex>
        <AngledLine angle={-1.4} w="100%" h="3px" />
        <Stack mt="0.6rem" gap={variant == 'winner' ? '1rem' : 0}>
          <Box>
            <Text lh="1rem" c="#B2A2A2">
              {variant == 'winner' ? 'President-elect' : `${place} place`}
            </Text>
            <Text fw={900}>{name}</Text>
          </Box>
          <Box>
            {variant == 'winner' && (
              <Text lh="1rem" c="#766A6A">
                {party}
              </Text>
            )}
            <Text c="#B2A2A2">{popularVote + ' votes'}</Text>
          </Box>
        </Stack>
      </Paper>
    );
  },
);
