import { useQuery } from '@tanstack/react-query';
import { checkCartIncludesItem } from '../../services/apiCart';
import { useUser } from '../authentication/useUser';
import { useAppSelector } from '../../hooks/reduxHooks';
import { isProductInCart } from './cartSlice';

export function useCartIncludesItem(productVariantId: number) {
  const { isAuthenticated } = useUser();

  const isInCartNotAuth = useAppSelector(
    isProductInCart(productVariantId ?? 0)
  );

  const {
    data: isInCartAuth,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cartIncludesItem', productVariantId],
    queryFn: () => checkCartIncludesItem(productVariantId),
    enabled: isAuthenticated,
  });

  const isInCart = isAuthenticated ? isInCartAuth : isInCartNotAuth;

  return { isInCart, isLoading, error };
}
