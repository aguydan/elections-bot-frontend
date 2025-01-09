import { ActionIcon } from '@mantine/core';
import EditIcon from '../icons/edit-icon';
import Link from 'next/link';

export default function EditButton({ href }: { href: string }) {
  return (
    <ActionIcon
      href={href}
      component={Link}
      aria-label="Edit"
      variant="transparent"
      size="lg"
    >
      <EditIcon />
    </ActionIcon>
  );
}
