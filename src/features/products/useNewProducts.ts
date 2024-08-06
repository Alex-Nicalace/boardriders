import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getNewProducts } from '../../services/apiProducts';
import { useGenderCategoryProduct } from './useGenderCategoryProduct';

export function useNewProducts(limit: number) {
  const params = useParams();
  const genderCategory = useGenderCategoryProduct();
  const categoryName = params.categoryGender || genderCategory;

  const {
    data: newProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['newProducts', categoryName],
    queryFn: () => getNewProducts({ limit, categoryName }),
  });

  return { newProducts, isLoading, error };
}
