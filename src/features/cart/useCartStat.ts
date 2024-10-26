import { useQuery } from '@tanstack/react-query';
import { getCartStat } from '../../services/apiCart';
import { useUser } from '../authentication/useUser';
import { useCallback } from 'react';
import { getCartSummary } from './helpers';

export function useCartStat(enabled = true) {
  const { user } = useUser();
  const { id: userId } = user || {};

  const queryFn = useCallback(() => getCartStat(userId), [userId]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['cart', 'stat'],
    queryFn,
    select: getCartSummary,
    enabled,
  });

  return { ...data, isLoading, error };
}
