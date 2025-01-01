import { Box, Stack, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

export default function ErrorWrapper({
  error,
  specificInfo,
  children,
}: {
  error: string | null;
  specificInfo?: string;
  children: ReactNode;
}) {
  return error ? (
    <Stack align="center" gap={0}>
      <Box px="2rem" mb="2.5rem" style={{ textAlign: 'center' }}>
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
        <Text fw={600}>{specificInfo}</Text>
        <Text fw={600} mb="1rem">
          We are already investigating the issue, meanwhile try reloading the
          page.
        </Text>
        <Text fw={600} c="#656565">
          {error}
        </Text>
      </Box>
      {children}
    </Stack>
  ) : (
    <Box>{children}</Box>
  );
}
