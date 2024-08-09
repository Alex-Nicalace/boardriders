import { useQuery } from '@tanstack/react-query';
import { getBrands } from '../../services/apiBrands';

export function useBrands() {
  const {
    data: brands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  return { brands, isLoading, error };
}
