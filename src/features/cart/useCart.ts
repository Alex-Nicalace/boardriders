import { useQuery } from '@tanstack/react-query';
import { getProductVariants } from '../../services/apiProducts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getCartIds, getCartMapping } from './cartSlice';
import { useUser } from '../authentication/useUser';
import { getCartProducts } from '../../services/apiCart/getCartProducts';
import { TCartItem } from './cart.types';

export function useCart(enabled = true) {
  const productVariantIds = useAppSelector(getCartIds);
  const cartMapping = useAppSelector(getCartMapping);
  const { isAuthenticated } = useUser();

  /**
   * Получение товаров и сопоставление с количеством
   */
  const getCartFromLocalStorage = async () => {
    const data = await getProductVariants(productVariantIds);
    return data.map((product) => {
      return {
        ...product,
        quantity: cartMapping[product.productVariantId].count,
      };
    });
  };

  /**
   * Получение товаров из удлаленной корзины или из локального хранилища
   */
  const queryFn: () => Promise<TCartItem[]> = async () =>
    isAuthenticated ? getCartProducts() : getCartFromLocalStorage();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart', isAuthenticated],
    queryFn,
    enabled,
  });

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
