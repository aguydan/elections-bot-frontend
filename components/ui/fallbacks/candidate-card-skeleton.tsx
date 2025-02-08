'use client';

import { Box, Flex, Group, Paper, Stack } from '@mantine/core';
import classes from '@/components/ui/resource-card.module.css';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from '@/lib/gsap';

export default function CandidateCardSkeleton() {
  const container = useRef(null);

  useGSAP(() => {}, { scope: container });

  return (
    <Stack ref={container} role="status" mb="2rem">
      <Paper
        pos="absolute"
        right="1.2rem"
        top="1rem"
        w="6rem"
        h="2rem"
        radius="0.8rem"
        bg="#f4e0cc"
      />
      <Flex
        align={{ base: 'center', xs: 'start' }}
        pt={{ base: '5rem', xs: '3.5rem' }}
        px={{ base: '1rem', xss: '2rem' }}
        mb="1rem"
        gap="md"
        direction={{ base: 'column', xs: 'row' }}
      >
        <Paper
          bg="#f4e0cc"
          flex="none"
          w="min(calc(0.75 * 18rem), 100%)"
          h="18rem"
          radius="lg"
        />
        <Stack
          w="100%"
          justify="space-between"
          h="18rem"
          pl={{ base: 0, xs: '0.8rem' }}
        >
          <Box
            mt="0.35lh"
            h="0.8lh"
            className={classes.cardTitleContainer}
            style={{
              '--circle-bg-color': '#f4e0cc',
              '--gradient-color-left': 'transparent',
            }}
          />
          <Stack>
            <Group gap="xs">
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="2rem"
                flex="1 0 30%"
                radius="0.8rem"
              />
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="2rem"
                flex="0 1 50%"
                radius="0.8rem"
              />
            </Group>
            <Group gap="xs">
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="1rem"
                flex="1 1 24%"
                radius="0.8rem"
              />
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="1rem"
                flex="1 1 70%"
                radius="0.8rem"
              />
            </Group>
            <Group gap="xs">
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="2rem"
                flex="1 0 30%"
                radius="0.8rem"
              />
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="2rem"
                flex="0 1 50%"
                radius="0.8rem"
              />
            </Group>
            <Group gap="xs">
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="1rem"
                flex="1 1 60%"
                radius="0.8rem"
              />
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="1rem"
                flex="1 1 23%"
                radius="0.8rem"
              />
            </Group>
            <Group gap="xs">
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="1rem"
                flex="1 1 34%"
                radius="0.8rem"
              />
              <Paper
                className="anim-slide-right"
                bg="#f4e0cc"
                h="1rem"
                flex="1 1 56%"
                radius="0.8rem"
              />
            </Group>
          </Stack>
        </Stack>
      </Flex>
      <Paper bg="#f4e0cc" h="30rem" radius="lg" />
      <Paper
        className="anim-slide-right"
        ml="2rem"
        bg="#f4e0cc"
        h="2rem"
        maw="60%"
        radius="0.8rem"
      />
    </Stack>
  );
}
