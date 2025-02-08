import { API_PATH } from '@/constants/api';
import { PAGINATION_LIMIT } from '@/constants/app';
import { safeFetch } from '@/lib/fetch-utils';
import ErrorMessage from '../error-message';
import classes from './pagination-cards.module.css';

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
    return (
      <ErrorMessage
        className={classes.error}
        radius="lg"
        bg="#3f2a2a"
        message={items.error}
        description="Cards might not show right now."
      />
    );
  }

  return <>{typeof cards === 'function' ? cards(items.data) : cards}</>;
}
