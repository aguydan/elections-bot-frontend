'use server';

import { API_PATH } from '@/constants/api';
import { validate } from '@/lib/action-utils';
import { safeFetch } from '@/lib/fetch-utils';
import { electionSchema } from '@/schema/election';
import { Election } from '@/types/schema-to-types';
import { revalidatePath } from 'next/cache';

export async function updateElection(
  id: string,
  data: Election,
): Promise<{ message: string; error: boolean }> {
  //I wonder if this can be done in Postgres or just in a better way
  data.updated_at = new Date(Date.now()).toISOString();

  const validation = validate(electionSchema, data);

  if (validation.error) {
    return validation;
  }

  const result = await safeFetch(`${API_PATH}/elections/${id}`, {
    method: 'PUT',
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

  revalidatePath(`/elections/${id}`);
  revalidatePath('/elections');
  return {
    message: 'Election was updated successfully',
    error: false,
  };
}
