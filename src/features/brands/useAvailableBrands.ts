import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableBrands } from '../../services/apiBrands';

export function useAvailableBrands() {
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
    queryKey: ['availableBrands', categoriesList],
    queryFn: () => getAvailableBrands(categoriesList),
    staleTime: Infinity,
  });

  const data = rowData?.map((item) => ({
    value: item.id.toString(),
    title: item.name,
    count: item.countProduct,
  }));

  return { data, isLoading, error };
}
