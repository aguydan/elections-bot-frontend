import CandidateCard from '@/components/candidate/candidate-card';

export default function Page({ params }: { params: { id: string } }) {
  return <CandidateCard id={params.id} />;
}
