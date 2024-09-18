import CandidateForm from '@/components/form/candidate-form';
import { candidateSchema } from '@/schema/candidate';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch('http://localhost:3001/candidates/' + params.id);
  const data = await response.json();

  const parsed = candidateSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      "Candidate data on this page doesn't adhere to the current candidate schema and thus cannot be edited and saved."
    );
  }

  const onDataAction = async (data: z.infer<typeof candidateSchema>) => {
    'use server';

    data.updated_at = new Date(Date.now()).toISOString();

    const parsed = candidateSchema.safeParse(data);

    if (!parsed.success) {
      return {
        message: 'Invalid data',
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }

    try {
      const response = await fetch(
        'http://localhost:3001/candidates/' + params.id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw response;

      revalidatePath('/candidates');
      revalidatePath('/candidates/' + params.id);
    } catch (error) {
      console.log(error);

      return {
        message: 'Error occured',
      };
    }

    redirect('/candidates/' + params.id);
  };

  return <CandidateForm initialValues={data} onDataAction={onDataAction} />;
}
