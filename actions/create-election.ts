'use server';

import { API_PATH } from '@/constants/api';
import { electionSchema } from '@/schema/election';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function createElection(
  data: z.infer<typeof electionSchema>,
): Promise<{ error: unknown }> {
  const parsed = electionSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${API_PATH}/elections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { error: 'Election was not created: ' + response.statusText };
  }

  revalidatePath('/elections');
  redirect('/elections');
}
