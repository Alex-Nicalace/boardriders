import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductVariants } from '../../services/apiProducts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCartIds, getCartMapping } from './cartSlice';
import { useUser } from '../authentication/useUser';
import { getCartProducts } from '../../services/apiCart';
import { getCartSummary } from './helpers';

export function useCart(enabled = true) {
  const productVariantIds = useAppSelector(getCartIds);
  const cartMapping = useAppSelector(getCartMapping);
  const { isAuthenticated } = useUser();

  const {
    data: productsNotAuth,
    isLoading: isLoadingNotAuth,
    error: errorNotAuth,
  } = useQuery({
    queryKey: ['cart', 'notAuth'],
    queryFn: () => getProductVariants(productVariantIds),
    select: useCallback(
      <T extends { productVariantId: number; price: number }>(data: T[]) =>
        getCartSummary(
          data.map((product) => ({
            ...product,
            quantity: cartMapping[product.productVariantId]?.count,
          }))
        ),
      [cartMapping]
    ),
    enabled: enabled && !isAuthenticated,
  });

  const {
    data: productsAuth,
    isLoading: isLoadingAuth,
    error: errorAuth,
  } = useQuery({
    queryKey: ['cart', 'auth'],
    queryFn: getCartProducts,
    // select - функция для обработки полученных данных. Хороша тем, что она запускается
    // каждый раз при изменении данных
    select: getCartSummary,
    enabled: enabled && isAuthenticated,
  });

  const isLoading = isAuthenticated ? isLoadingAuth : isLoadingNotAuth;
  const error = isAuthenticated ? errorAuth : errorNotAuth;
  const cartSummary = isAuthenticated ? productsAuth : productsNotAuth;

  return { ...cartSummary, isLoading, error };
}
