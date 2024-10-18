import { useQuery } from '@tanstack/react-query';
import { getTotalItemsCart } from '../../services/apiCart';
import { useUser } from '../authentication/useUser';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getTotalQuantity } from './cartSlice';

export function useTotalItemsCart() {
  const { isAuthenticated } = useUser();
  const totalQuantity = useAppSelector(getTotalQuantity);

  const {
    data: totalQuantityRemote,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['totalItemsCart'],
    queryFn: getTotalItemsCart,
    enabled: isAuthenticated,
  });

  const totalItemsCart = isAuthenticated ? totalQuantityRemote : totalQuantity;

  return { totalItemsCart, isLoading, error };
}
