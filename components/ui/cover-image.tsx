'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { Box, Image, Loader, ImageProps, Text, Stack } from '@mantine/core';
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
      {loading && <Loader size="6rem" color="#504f4f" />}
      {error ? (
        <Stack align="center" c="#504f4f">
          <FaImage size="6rem" />
          <Text fw="500">Image not found</Text>
        </Stack>
      ) : (
        <Image
          {...props}
          component={NextImage}
          sizes="14vw"
          fill
          priority
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </Box>
  );
}
