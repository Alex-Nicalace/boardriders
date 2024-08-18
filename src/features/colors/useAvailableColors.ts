import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableColors } from '../../services/apiColors';

export function useAvailableColors() {
  const params = useParams();
  const { categoryGender, category } = params;
  const categoriesList = [categoryGender, category].filter(
    (item) => item !== undefined
  );

  const {
    data: rowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['availableColors', categoriesList],
    queryFn: () => getAvailableColors(categoriesList),
    staleTime: Infinity,
  });

  const data = rowData?.map((item) => ({
    value: item.hexValue,
    title: item.name,
    count: item.countProduct,
  }));

  return { data, isLoading, error };
}
