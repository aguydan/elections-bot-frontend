'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { Box, Image, ImageProps, Text, Stack, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa6';

export default function CoverImage(props: ImageProps & NextImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [props.src]);

  return (
    <Box
      h="100%"
      pos="relative"
      style={{
        display: 'grid',
        placeContent: 'center',
      }}
    >
      {loading && (
        <Skeleton radius={props.radius} pos="absolute" style={{ inset: 0 }} />
      )}
      {error ? (
        <Stack align="center" c="#504f4f">
          <FaImage size="6rem" />
          <Text fw="500">Image not found</Text>
        </Stack>
      ) : (
        <Image
          {...props}
          component={NextImage}
          sizes="(max-width: 400px) 90vw, (max-width: 576px) 64vw, (max-width: 992px) 44vw, 22vw"
          fill
          priority
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </Box>
  );
}
