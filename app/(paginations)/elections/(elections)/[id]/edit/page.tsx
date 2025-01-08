import { updateElection } from '@/actions/update-election';
import ElectionForm from '@/components/form/election-form';
import { API_PATH } from '@/constants/api';
import { electionSchema } from '@/schema/election';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_PATH}/elections/${params.id}`);
  const data = await response.json();

  const parsed = electionSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      "Election data on this page doesn't adhere to the current election schema and thus cannot be edited and saved.",
    );
  }
  const updateElectionWithId = updateElection.bind(null, params.id);

  return <ElectionForm initialValues={data} action={updateElectionWithId} />;
}
