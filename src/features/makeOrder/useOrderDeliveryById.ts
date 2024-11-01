import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../services/apiOrders';

export function useOrderDeliveryById(orderId: number) {
  const {
    data: orderDeliveryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orderDeliveryById', orderId],
    queryFn: () =>
      getOrderById(orderId, [
        'id',
        'status',
        'deliveryMethod',
        'createdAt',
        'contactPhone',
        'contactName',
        'deliveryData',
      ]),
  });

  return { orderDeliveryData, isLoading, error };
}
