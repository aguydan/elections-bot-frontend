'use client';

import { ActionIcon } from '@mantine/core';
import DeleteIcon from '../icons/delete-icon';
import { toast } from 'react-toastify';
import { isRedirectError } from 'next/dist/client/components/redirect';

export default function DeleteButton({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ message: string; error: boolean } | void>;
}) {
  const handleClick = async () => {
    try {
      const result = await action(id);

      if (result && result.error) {
        toast.error(result.message);
      }
    } catch (error) {
      if (isRedirectError(error)) throw error;

      console.error(error);
      toast.error("Couldn't connect to the server");
    }
  };

  return (
    <ActionIcon
      onClick={handleClick}
      aria-label="Delete"
      variant="transparent"
      size="lg"
    >
      <DeleteIcon />
    </ActionIcon>
  );
}
