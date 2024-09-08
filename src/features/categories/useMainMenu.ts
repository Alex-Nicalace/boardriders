import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMainMenu } from '../../services/apiCategories';
import { useGenderCategoryProduct } from '../products/useGenderCategoryProduct';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getGender } from '../gender/genderSlice';

export function useMainMenu(enabled = true) {
  const params = useParams();
  const genderCategoryProduct = useGenderCategoryProduct();
  const genderCategoryStored = useAppSelector(getGender);
  const categoryGender =
    params.categoryGender || genderCategoryProduct || genderCategoryStored;

  const {
    data: { mainMenu, mainMenuFlattened } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['mainMenu', categoryGender],
    queryFn: () => getMainMenu(categoryGender),
    staleTime: Infinity,
    enabled,
  });

  return { mainMenu, mainMenuFlattened, isLoading, error, categoryGender };
}
