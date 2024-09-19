import CandidateForm from '@/components/form/candidate-form';
import { candidateScoreNames } from '@/lang/constants';
import { candidateSchema } from '@/schema/candidate';
import { z } from 'zod';

export default function Page() {
  const data = {
    name: '',
    color: '',
    origin: null,
    running_mate: null,
    party: null,
    image_url: null,
    score: Object.fromEntries(
      Object.entries(candidateScoreNames).map((entry) => [entry[0], 0])
    ),
    //should be done entirely on the server
    // created_at: null,
    // updated_at: null,
  };

  const onDataAction = async (data: z.infer<typeof candidateSchema>) => {
    'use server';

    const parsed = candidateSchema.safeParse(data);

    if (!parsed.success) {
      return {
        message: 'Invalid data',
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }

    try {
      const response = await fetch('http://localhost:3001/candidates/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw response;

      //make better messages both on api and here
      return {
        message: 'Candidate successfully created',
      };
    } catch (error) {
      console.log(error);

      return {
        message: 'Error occured',
      };
    }
  };

  return <CandidateForm initialValues={data} onDataAction={onDataAction} />;
}
