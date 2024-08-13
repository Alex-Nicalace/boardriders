import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMainMenu } from '../../services/apiCategories';
import { useGenderCategoryProduct } from '../products/useGenderCategoryProduct';

export function useMainMenu() {
  const params = useParams();
  const genderCategoryProduct = useGenderCategoryProduct();
  const categoryGender = params.categoryGender || genderCategoryProduct || '';

  const {
    data: { mainMenu, mainMenuFlattened } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['mainMenu', categoryGender],
    queryFn: () => getMainMenu(categoryGender),
    staleTime: Infinity,
  });

  return { mainMenu, mainMenuFlattened, isLoading, error, categoryGender };
}
