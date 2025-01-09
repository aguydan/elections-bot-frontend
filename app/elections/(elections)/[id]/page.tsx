export default function Page({ params }: { params: { id: string } }) {
  return <h1>elections{params.id}</h1>;
}
