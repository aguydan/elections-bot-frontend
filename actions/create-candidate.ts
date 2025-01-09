'use server';

import { API_PATH } from '@/constants/api';
import { validate } from '@/lib/action-utils';
import { safeFetch } from '@/lib/fetch-utils';
import { candidateSchema } from '@/schema/candidate';
import { Candidate } from '@/types/schema-to-types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCandidate(
  data: Candidate,
): Promise<{ message: string; error: boolean } | void> {
  const validation = validate(candidateSchema, data);

  if (validation.error) {
    return validation;
  }

  const result = await safeFetch(`${API_PATH}/candidates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (result.error) {
    return {
      message: 'Candidate was not created',
      error: true,
    };
  }

  const cookieStore = cookies();
  cookieStore.set('actionId', crypto.randomUUID(), { sameSite: 'strict' });
  cookieStore.set('action', 'created', { sameSite: 'strict' });
  cookieStore.set('resource', 'Candidate', { sameSite: 'strict' });

  revalidatePath('/candidates');
  redirect('/candidates');
}
