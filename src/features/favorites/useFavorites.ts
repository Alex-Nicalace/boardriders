import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '../../services/apiFavorites';

export function useFavorites(enabled: boolean = true) {
  const {
    data: { favorites, count, favoritesIds } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled,
  });

  return { favorites, favoritesIds, isLoading, error, count };
}
