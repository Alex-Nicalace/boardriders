import { useSearchParams } from 'react-router-dom';

export function useSortByPage() {
  const [searchParams] = useSearchParams();
  const sortByString = searchParams.get('sortBy');
  const sortByValue = !!sortByString && sortByString.split('-');
  const sortBy = !sortByValue
    ? undefined
    : { field: sortByValue[0], value: sortByValue[1] };

  const page = Number(searchParams.get('page'));
  const pageNum = isNaN(page) || page < 1 ? 1 : page;

  return { sortBy, pageNum };
}
