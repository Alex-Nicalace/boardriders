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

  const { quantityTotal, priceTotal } = products?.reduce(
    (acc, item) => ({
      quantityTotal: acc.quantityTotal + item.quantity,
      priceTotal: acc.priceTotal + item.price * item.quantity,
    }),
    {
      quantityTotal: 0,
      priceTotal: 0,
    }
  ) ?? { quantityTotal: 0, priceTotal: 0 };

  return { products, isLoading, error, quantityTotal, priceTotal };
}
