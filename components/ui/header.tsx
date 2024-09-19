import { Button, Center, Group, Paper, Text } from '@mantine/core';
import Link from 'next/link';

export default function Header() {
  return (
    <Paper radius="unset" shadow="sm" h="4rem" component="header">
      <Center h="100%">
        <Group justify="space-between" w={1200}>
          <Text fw={700} size="xl">
            🌎 Elections Bot Forms
          </Text>
          <Group gap={0} component="nav">
            <Button component={Link} href="/" variant="subtle">
              Home
            </Button>
            <Button component={Link} href="/candidates" variant="subtle">
              Candidates
            </Button>
            <Button component={Link} href="/elections" variant="subtle">
              Elections
            </Button>
          </Group>
        </Group>
      </Center>
    </Paper>
  );
}
