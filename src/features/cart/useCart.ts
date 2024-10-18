import { useQuery } from '@tanstack/react-query';
import { getProductVariants } from '../../services/apiProducts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCartIds, getCartMapping } from './cartSlice';
import { useUser } from '../authentication/useUser';
import { getCartProducts } from '../../services/apiCart';

export function useCart(enabled = true) {
  const productVariantIds = useAppSelector(getCartIds);
  const cartMapping = useAppSelector(getCartMapping);
  const { isAuthenticated } = useUser();

  const {
    data: productsNotAuth,
    isLoading: isLoadingNotAuth,
    error: errorNotAuth,
  } = useQuery({
    queryKey: ['cart', 'notAuthenticated'],
    queryFn: () => getProductVariants(productVariantIds),
    enabled: enabled && !isAuthenticated,
  });

  const {
    data: productsAuth,
    isLoading: isLoadingAuth,
    error: errorAuth,
  } = useQuery({
    queryKey: ['cart', 'authenticated'],
    queryFn: getCartProducts,
    enabled: enabled && isAuthenticated,
  });

  const isLoading = isAuthenticated ? isLoadingAuth : isLoadingNotAuth;
  const error = isAuthenticated ? errorAuth : errorNotAuth;

  const products = isAuthenticated
    ? productsAuth
    : productsNotAuth?.map((product) => ({
        ...product,
        quantity: cartMapping[product.productVariantId].count,
      }));

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
