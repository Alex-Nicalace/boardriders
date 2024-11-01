import { useQuery } from '@tanstack/react-query';
import { getOrderProductsById } from '../../services/apiOrders/getOrderProductsById';

export function useOrderProductsById(orderID: number) {
  const {
    data: orderProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orderProductsById', orderID],
    queryFn: () => getOrderProductsById(orderID),
  });

  return { orderProducts, isLoading, error };
}
