import { Box, BoxProps, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

export default function ErrorMessage({
  message,
  description,
  children,
  ...others
}: {
  message: string;
  description?: string;
  children?: ReactNode;
} & BoxProps) {
  return (
    <Box
      px={{ base: '1rem', xss: '2rem' }}
      style={{ textAlign: 'center' }}
      {...others}
    >
      <FaCircleXmark size="6rem" color="#bc3f3f" />
      <Title
        mt="1rem"
        mb={{ base: '2rem', xs: '3rem' }}
        fz={{
          base: '1.4rem',
          xs: '1.6rem',
          sm: '2.2rem',
        }}
      >
        Woops, an error has occured!
      </Title>
      <Text fw={600}>{description}</Text>
      <Text fw={600} mb="1rem">
        We are already investigating the issue, meanwhile try reloading the
        page.
      </Text>
      <Text fw={600} c="#656565" mb="1rem">
        {message}
      </Text>
      {children}
    </Box>
  );
}
