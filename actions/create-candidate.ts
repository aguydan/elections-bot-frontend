'use server';

import { API_PATH } from '@/constants/api';
import { candidateSchema } from '@/schema/candidate';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function createCandidate(
  data: z.infer<typeof candidateSchema>,
): Promise<{ error: unknown }> {
  const parsed = candidateSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${API_PATH}/candidates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { error: 'Candidate was not created: ' + response.statusText };
  }

  revalidatePath('/candidates');
  redirect('/candidates');
}
