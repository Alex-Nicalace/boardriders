import { useQuery } from '@tanstack/react-query';
import { getDeliveryRegionList } from '../../services/apiDeliveryRegion';

export function useDeliveryRegionList() {
  const {
    data: deliveryRegionList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['deliveryRegionList'],
    queryFn: getDeliveryRegionList,
  });

  return { deliveryRegionList, isLoading, error };
}
