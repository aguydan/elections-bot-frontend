import { updateCandidate } from '@/actions/update-candidate';
import CandidateForm from '@/components/form/candidate-form';
import { API_PATH } from '@/constants/api';
import { candidateSchema } from '@/schema/candidate';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_PATH}/candidates/${params.id}`);
  const data = await response.json();

  const parsed = candidateSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      "Candidate data on this page doesn't adhere to the current candidate schema and thus cannot be edited and saved.",
    );
  }

  const updateCandidateWithId = updateCandidate.bind(null, params.id);

  return <CandidateForm initialValues={data} action={updateCandidateWithId} />;
}
