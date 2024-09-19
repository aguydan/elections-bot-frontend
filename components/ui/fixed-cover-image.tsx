'use client';

import NextImage from 'next/image';
import { Image } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function FixedCoverImage(props: { src: string | null }) {
  //custom hook useimage?
  const [src, setSrc] = useState(props.src);

  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  return (
    <Image
      w={200}
      height={200}
      width={200}
      src={src}
      alt="Candidate portrait"
      component={NextImage}
      priority
      onError={() => setSrc('https://placehold.co/200x200.png')}
    />
  );
}
