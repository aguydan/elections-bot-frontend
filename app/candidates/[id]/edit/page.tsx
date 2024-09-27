import CandidateForm from '@/components/form/candidate-form';
import { API_PATH } from '@/constants/api';
import { candidateSchema } from '@/schema/candidate';
import { HTTPService } from '@/services/http-service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_PATH}/candidates/${params.id}`);
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
      const response = await HTTPService.put(
        `${API_PATH}/candidates/${params.id}`,
        data
      );

      if (!response.ok) throw response;

      revalidatePath('/candidates');
      revalidatePath(`/candidates/${params.id}`);
    } catch (error) {
      console.log(error);

      return {
        message: 'Error occured',
      };
    }

    redirect(`/candidates/${params.id}`);
  };

  return <CandidateForm initialValues={data} onDataAction={onDataAction} />;
}
