import Link from 'next/link';
import { Paper, Stack, Text } from '@mantine/core';
import { FaPersonCirclePlus } from 'react-icons/fa6';

export default function CreateCandidateButton() {
  return (
    <Paper
      radius="lg"
      c="inherit"
      bg="gray"
      component={Link}
      href={'candidates/create'}
    >
      <Stack align="center" justify="center" h="100%" p="2rem 0">
        <FaPersonCirclePlus size="6rem" />
        <Text fw={600}>Create candidate</Text>
      </Stack>
    </Paper>
  );
}
