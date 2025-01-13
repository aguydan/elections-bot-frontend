'use client';

import { Box, Burger, Button } from '@mantine/core';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';

import './primary-navigation.css';

export default function PrimaryNavigation() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <Box>
      <Box className={opened ? 'navigationOpened' : 'navigationClosed'}>
        <Button component={Link} href="/docs" variant="subtle" onClick={close}>
          Docs
        </Button>
        <Button
          component={Link}
          href="/candidates"
          variant="subtle"
          onClick={close}
        >
          Candidates
        </Button>
        <Button
          component={Link}
          href="/elections"
          variant="subtle"
          onClick={close}
        >
          Elections
        </Button>
        <Button
          component={Link}
          href="/results"
          variant="subtle"
          onClick={close}
        >
          Results
        </Button>
      </Box>
      <Burger
        className="burger"
        opened={opened}
        hiddenFrom="sm"
        aria-label="Toggle navigation"
        onClick={toggle}
      />
    </Box>
  );
}
