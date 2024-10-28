import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrders, TGetOrdersArgs } from '../../services/apiOrders';
import { PAGE_SIZE_ORDERS_DEFAULT } from '../../constants';

type TUseOrdersArgs = TGetOrdersArgs;
export function useOrders({ page, pageSize }: TUseOrdersArgs) {
  const queryClient = useQueryClient();
  const pageSizeValue = pageSize ?? PAGE_SIZE_ORDERS_DEFAULT;

  const queryKey = ['orders', pageSizeValue];

  const {
    data: { data: orders, count: countOrders } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: () => getOrders({ page, pageSize }),
  });

  const totalPages = Math.ceil((countOrders ?? 0) / pageSizeValue);

  // предварительная подгрузка следующей страницы
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [...queryKey, page + 1],
      queryFn: () =>
        getOrders({
          pageSize,
          page: page + 1,
        }),
    });
  }
  // предварительная подгрузка предыдущей страницы
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [...queryKey, page - 1],
      queryFn: () =>
        getOrders({
          pageSize,
          page: page - 1,
        }),
    });
  }

  return { orders, isLoading, error, totalPages, countOrders };
}
