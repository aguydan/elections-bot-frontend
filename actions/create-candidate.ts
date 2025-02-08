'use server';

import { API_PATH } from '@/constants/api';
import { validate } from '@/lib/action-utils';
import { safeFetch } from '@/lib/fetch-utils';
import { candidateSchema } from '@/schema/candidate';
import { Candidate } from '@/types/schema-to-types';
import { revalidatePath } from 'next/cache';

export async function createCandidate(
  data: Candidate,
): Promise<{ message: string; error: boolean; redirect: boolean }> {
  const validation = validate(candidateSchema, data);

  if (validation.error) {
    return { ...validation, redirect: false };
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
      redirect: false,
    };
  }

  revalidatePath('/candidates');

  return {
    message: 'Candidate was successfully created',
    error: false,
    redirect: true,
  };
}
