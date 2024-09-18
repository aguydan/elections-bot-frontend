'use client';

import NextImage from 'next/image';
import { Box, Image } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function CoverImage(props: { src: string | null }) {
  const [src, setSrc] = useState(props.src);

  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  return (
    <Box pos="relative" w="12rem" h="16rem">
      <Image
        src={src}
        alt="Candidate portrait"
        component={NextImage}
        radius="md"
        fill
        priority
        style={{ overflowClipMargin: 'unset' }}
        onError={() => setSrc('https://placehold.co/188x250.png')}
      />
    </Box>
  );
}
