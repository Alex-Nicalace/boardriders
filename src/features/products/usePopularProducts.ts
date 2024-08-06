import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPopularProducts } from '../../services/apiProducts';
import { useGenderCategoryProduct } from './useGenderCategoryProduct';

export function usePopularProducts(limit: number) {
  const params = useParams();
  const genderCategory = useGenderCategoryProduct();
  const categoryName = params.categoryGender || genderCategory;

  const {
    data: popularProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topSaleProducts', categoryName],
    queryFn: () => getPopularProducts({ limit, categoryName }),
  });

  return { popularProducts, isLoading, error };
}
