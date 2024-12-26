import { Button, Group, Paper, Text } from '@mantine/core';
import Link from 'next/link';

export default function Header() {
  return (
    <Paper
      shadow="sm"
      component="header"
      pos="sticky"
      top={0}
      style={{
        zIndex: 1000,
      }}
    >
      <Group p="0.8rem 1.2rem" m="0 auto" justify="space-between" maw={1200}>
        <Text fw={700} size="xl" component="span">
          Elections Bot
        </Text>
        <nav>
          <Group gap={0} visibleFrom="sm">
            <Button component={Link} href="/" variant="subtle">
              Home
            </Button>
            <Button component={Link} href="/docs" variant="subtle">
              Docs
            </Button>
            <Button component={Link} href="/candidates" variant="subtle">
              Candidates
            </Button>
            <Button component={Link} href="/elections" variant="subtle">
              Elections
            </Button>
            <Button component={Link} href="/results" variant="subtle">
              Results
            </Button>
          </Group>
        </nav>
      </Group>
    </Paper>
  );
}
