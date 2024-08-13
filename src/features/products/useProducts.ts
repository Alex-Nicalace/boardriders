import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/apiProducts';
import { PAGE_SIZE_PRODUCTS } from '../../services/constants';
import { useMainMenu } from '../categories/useMainMenu';
import { useGenderCategories } from '../categories/useCategories';

export function useProducts() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { mainMenuFlattened } = useMainMenu();
  const { genderCategories } = useGenderCategories();

  const { categoryGender, category, brand } = params;
  const categories = [categoryGender, category].filter(
    (item) => item !== undefined
  );
  const page = Number(searchParams.get('page'));
  const pageNum = isNaN(page) || page < 1 ? 1 : page;

  // FILTERS
  const filters: { field: string; value: string }[] = [];
  if (brand) {
    filters.push({
      field: 'brands.name',
      value: brand,
    });
  }

  // SORT
  const sortByString = searchParams.get('sortBy');
  const sortByValue = !!sortByString && sortByString.split('-');
  const sortBy = !sortByValue
    ? undefined
    : { field: sortByValue[0], value: sortByValue[1] };

  const {
    data: { products, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', ...categories, filters, sortBy, pageNum],
    queryFn: () =>
      getProducts({
        categories,
        page: pageNum,
        filters,
        sortBy,
      }),
  });

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE_PRODUCTS);

  // предварительная подгрузка следующей страницы
  if (pageNum < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['products', ...categories, pageNum + 1, brand],
      queryFn: () =>
        getProducts({
          categories,
          page: pageNum + 1,
        }),
    });
  }
  // предварительная подгрузка предыдущей страницы
  if (pageNum > 1) {
    queryClient.prefetchQuery({
      queryKey: ['products', ...categories, pageNum - 1, brand],
      queryFn: () =>
        getProducts({
          categories,
          page: pageNum - 1,
        }),
    });
  }

  const getCategoryDisplay = () => {
    const categoryDisplay =
      (mainMenuFlattened ?? []).find((item) => item.name === category)
        ?.displayName || '';

    const categoryGenderDisplay =
      (genderCategories ?? []).find((item) => item.name === categoryGender)
        ?.displayName || '';

    return [categoryDisplay, brand, categoryGenderDisplay.toLowerCase()]
      .filter(Boolean)
      .join(' ');
  };

  return {
    products,
    isLoading,
    error,
    count,
    totalPages,
    pageNum,
    categoryDisplay: getCategoryDisplay(),
  };
}
