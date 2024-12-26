'use server';

import { API_PATH } from '@/constants/api';
import { electionSchema } from '@/schema/election';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function updateElection(
  id: string,
  data: z.infer<typeof electionSchema>,
): Promise<{ error: unknown }> {
  //I wonder if this can be done in Postgres or just in a better way
  data.updated_at = new Date(Date.now()).toISOString();

  const parsed = electionSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${API_PATH}/elections/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { error: 'Election was not updated: ' + response.statusText };
  }

  revalidatePath(`/elections/${id}`);
  revalidatePath('/elections');
  redirect(`/elections/${id}`);
}
