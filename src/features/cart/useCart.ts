import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductVariants } from '../../services/apiProducts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCartIds, getCartMapping } from './cartSlice';

export function useCart(enabled = true) {
  const productVariantIds = useAppSelector(getCartIds);
  const cartMapping = useAppSelector(getCartMapping);

  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getProductVariants(productVariantIds),
    enabled,
  });

  const products = useMemo(
    () =>
      data?.map((product) => {
        return {
          ...product,
          quantity: cartMapping[product.id].count,
        };
      }),
    [data, cartMapping]
  );

  return { products, isLoading, error };
}
