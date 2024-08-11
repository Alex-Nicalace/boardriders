import { useQuery } from '@tanstack/react-query';
import { getBrand } from '../../services/apiBrands';
import { useParams } from 'react-router-dom';

export function useBrand() {
  const params = useParams();
  const { brand } = params;

  const {
    data: brands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['brand', brand],
    queryFn: () => getBrand(brand || ''),
  });

  return { brands, isLoading, error };
}
