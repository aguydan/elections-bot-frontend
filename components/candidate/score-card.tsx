'use client';

import { candidateScoreEmojis, candidateScoreNames } from '@/lang/constants';
import { Flex, Paper, Text } from '@mantine/core';
import { inter } from '@/styles/fonts';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';
import { useRef } from 'react';

import './score-card.css';

export default function ScoreCard({
  label,
  color,
  score,
}: {
  label: string;
  color: string;
  score: number;
}) {
  const container = useRef(null);
  const rect = useRef<DOMRect | null>(null);

  const { contextSafe } = useGSAP({ scope: container });

  //probably all of them need useMemo
  //useMouseEvents
  const handleMouseMove = contextSafe((e: Event) => {
    const event = e as MouseEvent;

    const xTo = gsap.quickTo('.circle', 'x');
    const yTo = gsap.quickTo('.circle', 'y');

    if (rect.current) {
      xTo(event.clientX - rect.current.left);
      yTo(event.clientY - rect.current.top);
    }
  });

  const handleMouseLeave = contextSafe((e: Event) => {
    const target = e.currentTarget as EventTarget & Element;

    gsap.to('.circle', {
      scale: 0,
      ease: 'power2',
    });

    target.removeEventListener('mousemove', handleMouseMove);
  });

  const handleMouseEnter = contextSafe((e: React.MouseEvent) => {
    const target = e.currentTarget;
    rect.current = target.getBoundingClientRect();

    target.addEventListener('mouseleave', handleMouseLeave, { once: true });
    target.addEventListener('mousemove', handleMouseMove);

    gsap.set('.circle', {
      xPercent: -50,
      yPercent: -50,
      x: e.clientX - rect.current.left,
      y: e.clientY - rect.current.top,
    });

    gsap.to('.circle', {
      scale: 1,
      ease: 'elastic',
    });
  });

  const handleClick = contextSafe((e: React.MouseEvent) => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.3,
      },
    });

    tl.to('.circle', {
      scale: 2,
      opacity: 0,
      ease: 'power2',
    })
      .set('.circle', {
        scale: 0,
        opacity: 1,
      })
      .to('.circle', {
        scale: 1,
        ease: 'power2',
      });
  });

  return (
    <Paper
      ref={container}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onClick={(e) => handleClick(e)}
      className="card"
      flex={'1 1 auto'}
      p="0.8rem 1rem"
      style={{
        '--circle-color': color,
        transform: `rotate(${Math.random() * 5 - 2.5}deg)`,
      }}
    >
      <div className="circle"></div>
      <Flex gap="0.6rem">
        <Text>{candidateScoreEmojis[label]}</Text>
        <Text fw={700}>{candidateScoreNames[label]}</Text>
      </Flex>
      <Text
        mt="1.2rem"
        className="score"
        ff={inter.style.fontFamily}
        lh={{ base: '2rem', xs: '2.4rem' }}
        fz={{ base: '2rem', xs: '2.4rem' }}
        fw={900}
      >
        {score}
      </Text>
    </Paper>
  );
}
