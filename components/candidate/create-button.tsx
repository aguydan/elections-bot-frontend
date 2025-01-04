import Link from 'next/link';
import { Paper, Stack, Text } from '@mantine/core';

export default function CreateButton({
  path,
  label,
  icon,
}: {
  path: string;
  label: string;
  icon?: JSX.Element;
}) {
  return (
    <Paper
      radius="lg"
      c="inherit"
      bg="gray"
      component={Link}
      href={path}
      px="1rem"
    >
      <Stack align="center" justify="center" h="100%" p="2rem 0">
        {icon}
        <Text fw={600}>{label}</Text>
      </Stack>
    </Paper>
  );
}
