import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductVariants } from '../../services/apiProducts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCart, getProductVariantIds } from './cartSlice';

export function useCart() {
  const productVariantIds = useAppSelector(getProductVariantIds);
  const cart = useAppSelector(getCart);

  const { data, isLoading, error } = useQuery({
    queryKey: ['cart', productVariantIds],
    queryFn: () => getProductVariants(productVariantIds),
  });

  const products = useMemo(
    () =>
      data?.map((product) => {
        return {
          ...product,
          quantity: cart[product.id],
        };
      }),
    [data, cart]
  );

  return { products, isLoading, error };
}
