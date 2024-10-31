import { createCandidate } from '@/actions/create-candidate';
import CandidateForm from '@/components/form/candidate-form';
import { candidateScoreNames } from '@/lang/constants';

export default function Page() {
  const data = {
    name: '',
    color: '',
    origin: null,
    running_mate: null,
    party: null,
    image_url: null,
    score: Object.fromEntries(
      Object.entries(candidateScoreNames).map((entry) => [entry[0], 0]),
    ),
  };

  return <CandidateForm initialValues={data} action={createCandidate} />;
}
