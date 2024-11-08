import { createElection } from '@/actions/create-election';
import ElectionForm from '@/components/form/election-form';

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

  return <ElectionForm initialValues={data} action={createElection} />;
}
