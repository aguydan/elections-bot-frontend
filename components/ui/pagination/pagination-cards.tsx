import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';

export default async function PaginationCards({
  itemsPath,
  currentPage,
  cards,
}: {
  itemsPath: string;
  currentPage: number;
  cards: (data: any[]) => JSX.Element[] | JSX.Element[];
}) {
  const offset = PAGINATION_LIMIT * (currentPage - 1);

  const items = await safeFetch<unknown[]>(
    `${API_PATH}/${itemsPath}?limit=${PAGINATION_LIMIT}&offset=${offset}`,
  );

  if (!items.data) {
    throw new Error(items.error);
  }

  return <>{typeof cards === 'function' ? cards(items.data) : cards}</>;
}
