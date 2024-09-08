import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts, TFilters } from '../../services/apiProducts';
import { PAGE_SIZE_PRODUCTS } from '../../services/constants';
import { useMainMenu } from '../categories/useMainMenu';
import { useGenderCategories } from '../categories/useCategories';
import { TFilterName } from '../../components/Filters';

const FILTER_MAPPINGS: {
  filterName: TFilterName;
  fieldName: string;
  method: 'eq' | 'in' | 'gte' | 'lte';
}[] = [
  {
    method: 'in',
    filterName: 'category',
    fieldName: 'category.name',
  },
  {
    method: 'in',
    filterName: 'brand',
    fieldName: 'brands.id',
  },
  {
    method: 'in',
    filterName: 'size',
    fieldName: 'productVariants.sizeId',
  },
  {
    method: 'in',
    filterName: 'color',
    fieldName: 'productVariants.colorId',
  },
  {
    method: 'gte',
    filterName: 'minPrice',
    fieldName: 'price',
  },
  {
    method: 'lte',
    filterName: 'maxPrice',
    fieldName: 'price',
  },
];

export function useProducts() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { mainMenuFlattened } = useMainMenu();
  const { genderCategories } = useGenderCategories();

  const { categoryGender, category, brand } = params;
  const categoryFilters = [categoryGender, category].filter(
    (item) => item !== undefined
  );
  const page = Number(searchParams.get('page'));
  const pageNum = isNaN(page) || page < 1 ? 1 : page;

  // FILTERS
  const filters: TFilters[] = [];
  if (brand) {
    filters.push({
      method: 'eq',
      field: 'brands.name',
      value: brand,
    });
  }

  const updateFilters = () => {
    FILTER_MAPPINGS.forEach(({ filterName, fieldName, method }) => {
      const valueParam = searchParams.get(filterName);
      if (!valueParam) return;

      switch (method) {
        case 'in':
          {
            const values = valueParam.split(',').filter(Boolean);
            if (values.length > 0) {
              filters.push({
                method: 'in',
                field: fieldName,
                value: values,
              });
            }
          }
          break;
        default:
          filters.push({
            method,
            field: fieldName,
            value: valueParam,
          });
      }
    });
  };
  updateFilters();

  // SORT
  const sortByString = searchParams.get('sortBy');
  const sortByValue = !!sortByString && sortByString.split('-');
  const sortBy = !sortByValue
    ? undefined
    : { field: sortByValue[0], value: sortByValue[1] };

  const queryKeys = ['products', ...categoryFilters, filters, sortBy];
  const args = {
    categoryFilters,
    page: pageNum,
    filters,
    sortBy,
  };

  const {
    data: { products, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys, pageNum],
    queryFn: () => getProducts(args),
  });

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE_PRODUCTS);

  // предварительная подгрузка следующей страницы
  if (pageNum < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [...queryKeys, pageNum + 1],
      queryFn: () =>
        getProducts({
          ...args,
          page: pageNum + 1,
        }),
    });
  }
  // предварительная подгрузка предыдущей страницы
  if (pageNum > 1) {
    queryClient.prefetchQuery({
      queryKey: [...queryKeys, pageNum - 1],
      queryFn: () =>
        getProducts({
          ...args,
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
