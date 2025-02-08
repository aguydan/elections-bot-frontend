'use server';

import { API_PATH } from '@/constants/api';
import { validate } from '@/lib/action-utils';
import { safeFetch } from '@/lib/fetch-utils';
import { electionSchema } from '@/schema/election';
import { Election } from '@/types/schema-to-types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createElection(
  data: Election,
): Promise<{ message: string; error: boolean } | void> {
  const validation = validate(electionSchema, data);

  if (validation.error) {
    return validation;
  }

  const result = await safeFetch(`${API_PATH}/elections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (result.error) {
    return {
      message: 'Election was not created',
      error: true,
    };
  }

  const cookieStore = cookies();
  cookieStore.set('actionId', crypto.randomUUID(), {
    sameSite: 'strict',
  });
  cookieStore.set('action', 'created', { sameSite: 'strict' });
  cookieStore.set('resource', 'Election', { sameSite: 'strict' });

  revalidatePath('/elections');
  redirect('/elections');
}
