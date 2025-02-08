'use server';

import { API_PATH } from '@/constants/api';
import { safeFetch } from '@/lib/fetch-utils';
import { revalidatePath } from 'next/cache';

export async function deleteCandidate(
  id: string,
): Promise<{ message: string; error: boolean; redirect: boolean }> {
  const result = await safeFetch(`${API_PATH}/candidates/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (result.error) {
    return {
      message: 'Candidate was not deleted',
      error: true,
      redirect: false,
    };
  }

  revalidatePath(`/candidates/${id}`);
  revalidatePath('/candidates');

  return {
    message: 'Candidate was deleted successfully',
    error: false,
    redirect: true,
  };
}
