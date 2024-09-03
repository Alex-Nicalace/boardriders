import { useQuery } from '@tanstack/react-query';
import { getBrand } from '../../services/apiBrands';
import { useParams } from 'react-router-dom';

/**
 * Используйте запрос для получения данных о бренде.
 *
 * @param enabled - Делать ли запрос на сервер.(по умолчанию: true)
 * @returns - Объект с данными о бренде
 */
export function useBrand(enabled: boolean = true) {
  const params = useParams();
  const { brand } = params;

  const {
    data: brands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['brand', brand],
    queryFn: () => getBrand(brand || ''),
    enabled,
  });

  return { brands, isLoading, error };
}
