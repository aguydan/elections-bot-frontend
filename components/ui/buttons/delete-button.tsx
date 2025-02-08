'use client';

import { ActionIcon } from '@mantine/core';
import DeleteIcon from '../icons/delete-icon';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function DeleteButton({
  id,
  action,
}: {
  id: string;
  action: (
    id: string,
  ) => Promise<{ message: string; error: boolean; redirect: boolean }>;
}) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const result = await action(id);

      if (result.error) {
        toast.error(result.message);

        return;
      }

      toast.success(result.message);

      if (result.redirect) {
        router.push('/candidates');
      }
    } catch (error) {
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
