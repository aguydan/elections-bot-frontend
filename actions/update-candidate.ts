'use server';

import { API_PATH } from '@/constants/api';
import { validate } from '@/lib/action-utils';
import { safeFetch } from '@/lib/fetch-utils';
import { candidateSchema } from '@/schema/candidate';
import { Candidate } from '@/types/schema-to-types';
import { revalidatePath } from 'next/cache';

export async function updateCandidate(
  id: string,
  data: Candidate,
): Promise<{ message: string; error: boolean; redirect: boolean }> {
  //I wonder if this can be done in Postgres or just in a better way
  data.updated_at = new Date(Date.now()).toISOString();

  const validation = validate(candidateSchema, data);

  if (validation.error) {
    return { ...validation, redirect: false };
  }

  const result = await safeFetch(`${API_PATH}/candidates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (result.error) {
    return {
      message: 'Candidate was not updated',
      error: true,
      redirect: false,
    };
  }

  revalidatePath(`/candidates/${id}`);
  revalidatePath('/candidates');

  return {
    message: 'Candidate was updated successfully',
    error: false,
    redirect: false,
  };
}
