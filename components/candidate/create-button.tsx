import Link from 'next/link';
import { Paper, PaperProps, Stack, Text } from '@mantine/core';

export default function CreateButton({
  path,
  label,
  icon,
  ...others
}: {
  path: string;
  label: string;
  icon?: JSX.Element;
} & PaperProps) {
  return (
    <Paper
      w={{ base: '16rem', xss: '10.4rem', sm: '14rem', md: '16rem' }}
      radius="lg"
      c="inherit"
      bg="gray"
      component={Link}
      href={path}
      px="1rem"
      {...others}
    >
      <Stack align="center" justify="center" h="100%" p="2rem 0">
        {icon}
        <Text fw={600}>{label}</Text>
      </Stack>
    </Paper>
  );
}
