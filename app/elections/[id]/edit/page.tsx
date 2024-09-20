import ElectionForm from '@/components/form/election-form';
import { electionSchema } from '@/schema/election';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch('http://localhost:3001/elections/' + params.id);
  const data = await response.json();

  //maybe postgres can fix this
  data.turnout = Number(data.turnout);

  const parsed = electionSchema.safeParse(data);
  if (!parsed.success) {
    console.dir(
      {
        message: 'Invalid data',
        issues: parsed.error.issues.map((issue) => issue),
      },
      { depth: null }
    );

    throw new Error(
      "Candidate data on this page doesn't adhere to the current candidate schema and thus cannot be edited and saved."
    );
  }

  const onDataAction = async (data: z.infer<typeof electionSchema>) => {
    'use server';

    data.updated_at = new Date(Date.now()).toISOString();

    const parsed = electionSchema.safeParse(data);
    if (!parsed.success) {
      return {
        message: 'Invalid data',
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }

    try {
      const response = await fetch(
        'http://localhost:3001/elections/' + params.id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw response;

      revalidatePath('/elections');
      revalidatePath('/elections/' + params.id);
    } catch (error) {
      console.log(error);

      return {
        message: 'Error occured',
      };
    }

    redirect('/elections/' + params.id);
  };

  return <ElectionForm initialValues={data} onDataAction={onDataAction} />;
}
