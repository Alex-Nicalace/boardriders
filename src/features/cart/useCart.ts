import { useQuery } from '@tanstack/react-query';
import { getProductVariants } from '../../services/apiProducts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCartIds, getCartMapping } from './cartSlice';
import { useUser } from '../authentication/useUser';
import { getCartProducts } from '../../services/apiCart';

function getCartSummary<T extends { quantity: number; price: number }>(
  products: T[]
) {
  const { quantityTotal, priceTotal } = products.reduce(
    (acc, item) => ({
      quantityTotal: acc.quantityTotal + item.quantity,
      priceTotal: acc.priceTotal + item.price * item.quantity,
    }),
    {
      quantityTotal: 0,
      priceTotal: 0,
    }
  );
  return { products, quantityTotal, priceTotal };
}

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

  const cartSummary = isAuthenticated
    ? productsAuth
    : // getCartSummary не нужно переносить в select, так как он вызывается только при изменении данных'
      // возвращенных queryFn и т.о. не будет обрабатываться изменения в cartMapping
      getCartSummary(
        productsNotAuth?.map((product) => ({
          ...product,
          quantity: cartMapping[product.productVariantId].count,
        })) ?? []
      );

  return { ...cartSummary, isLoading, error };
}
