'use server';

import { API_PATH } from '@/constants/api';
import { safeFetch } from '@/lib/fetch-utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteCandidate(
  id: string,
): Promise<{ message: string; error: boolean } | void> {
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
    };
  }

  const cookieStore = cookies();
  cookieStore.set('actionId', crypto.randomUUID(), { sameSite: 'strict' });
  cookieStore.set('action', 'deleted', { sameSite: 'strict' });
  cookieStore.set('resource', 'Candidate', { sameSite: 'strict' });

  revalidatePath('/candidates');
  redirect('/candidates');
}
