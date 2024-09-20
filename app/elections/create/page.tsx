import ElectionForm from '@/components/form/election-form';
import { electionSchema } from '@/schema/election';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export default function Page() {
  const data = {
    type: 'presidential' as 'presidential' | 'general',
    country: '',
    name: '',
    date: null,
    electorate: 1,
    turnout: null,
    flag_url: null,
  };

  const onDataAction = async (data: z.infer<typeof electionSchema>) => {
    'use server';

    const parsed = electionSchema.safeParse(data);
    if (!parsed.success) {
      return {
        message: 'Invalid data',
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }

    try {
      const response = await fetch('http://localhost:3001/elections/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw response;

      //make better messages both on api and here
      revalidatePath('/elections');
    } catch (error) {
      console.log(error);
    }

    redirect('/elections');
  };

  return <ElectionForm initialValues={data} onDataAction={onDataAction} />;
}
