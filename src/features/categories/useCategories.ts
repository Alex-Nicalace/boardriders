import { useQuery } from '@tanstack/react-query';
import { getGenderCategories } from '../../services/apiCategories';

export function useGenderCategories() {
  const {
    data: genderCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['genderCategories'],
    queryFn: getGenderCategories,
    staleTime: Infinity,
  });

  return { genderCategories, isLoading, error };
}
