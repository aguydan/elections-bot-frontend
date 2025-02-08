import { Box, Paper, PaperProps, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';

export default function ErrorMessage({
  title,
  showAssurance = true,
  icon,
  message,
  description,
  children,
  ...others
}: {
  message: string;
  title?: string;
  showAssurance?: boolean;
  icon?: ReactNode;
  description?: string;
  children?: ReactNode;
} & PaperProps) {
  return (
    <Paper {...others}>
      {icon || <FaCircleXmark size="6rem" color="#bc3f3f" />}
      <Title
        mt="1rem"
        mb={{ base: '2rem', xs: '3rem' }}
        fz={{
          base: '1.4rem',
          xs: '1.6rem',
          sm: '2.2rem',
        }}
      >
        {title || 'Woops, an error has occured!'}
      </Title>
      <Box mb="1rem">
        <Text fw={600}>{description}</Text>
        {showAssurance && (
          <Text fw={600}>
            We are already investigating the issue, meanwhile try reloading the
            page.
          </Text>
        )}
      </Box>
      <Text fw={600} c="#656565">
        {message}
      </Text>
      {children}
    </Paper>
  );
}
