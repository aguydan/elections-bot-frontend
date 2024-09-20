'use client';

import NextImage from 'next/image';
import { Box, Image, px } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function CoverImage(props: {
  src: string | null;
  w: string;
  h: string;
  alt: string;
}) {
  const [src, setSrc] = useState(props.src);

  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  return (
    <Box pos="relative" w={props.w} h={props.h}>
      <Image
        src={src}
        alt={props.alt}
        component={NextImage}
        radius="md"
        fill
        priority
        style={{ overflowClipMargin: 'unset' }}
        onError={() =>
          setSrc(`https://placehold.co/${px(props.w)}x${px(props.h)}.png`)
        }
      />
    </Box>
  );
}
