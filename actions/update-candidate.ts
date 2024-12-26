'use server';

import { API_PATH } from '@/constants/api';
import { candidateSchema } from '@/schema/candidate';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function updateCandidate(
  id: string,
  data: z.infer<typeof candidateSchema>,
): Promise<{ error: unknown }> {
  //I wonder if this can be done in Postgres or just in a better way
  data.updated_at = new Date(Date.now()).toISOString();

  const parsed = candidateSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${API_PATH}/candidates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { error: 'Candidate was not updated: ' + response.statusText };
  }

  revalidatePath(`/candidates/${id}`);
  revalidatePath('/candidates');
  redirect(`/candidates/${id}`);
}
