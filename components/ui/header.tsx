import { Box, Button, Group, Paper, Text } from '@mantine/core';
import Link from 'next/link';

export default function Header() {
  return (
    <Paper
      radius={0}
      px="1rem"
      shadow="sm"
      component="header"
      pos="sticky"
      top={0}
      style={{
        zIndex: 1000,
      }}
    >
      <Group
        py="0.8rem"
        m="0 auto"
        justify="space-between"
        maw={1200}
        component="nav"
      >
        <Box
          component={Link}
          href="/"
          c="inherit"
          style={{ textDecoration: 'none' }}
        >
          <Text fw={700} size="xl" component="h1">
            Elections Bot
          </Text>
        </Box>
        <Group gap={0} visibleFrom="sm">
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
      </Group>
    </Paper>
  );
}
