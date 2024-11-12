'use client';

import NextImage from 'next/image';
import { Image, Paper, PaperProps, px } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function CoverImage(
  props: {
    src: string;
    w: string;
    h: string;
    alt: string;
  } & PaperProps,
) {
  const [src, setSrc] = useState(props.src);

  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  const { w, h, alt, radius, ...others } = props;

  return (
    <Paper
      bg="transparent"
      pos="relative"
      w={w}
      h={h}
      radius={radius}
      {...others}
    >
      <Image
        src={src}
        alt={alt}
        radius={radius}
        component={NextImage}
        fill
        priority
        style={{ overflowClipMargin: 'unset' }}
        onError={() => setSrc(`https://placehold.co/${px(w)}x${px(h)}.png`)}
      />
    </Paper>
  );
}
