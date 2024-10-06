import toast from 'react-hot-toast';
import { TDeliveryRegionListProviderProps } from './deliveryRegion.types';
import { useDeliveryRegionList } from './useDeliveryRegionList';

function DeliveryRegionListProvider({
  render,
  renderLoading,
  renderError,
}: TDeliveryRegionListProviderProps) {
  const { deliveryRegionList, isLoading, error } = useDeliveryRegionList();

  if (isLoading) {
    return renderLoading?.();
  }

  if (error) {
    toast.error(error.message);
    return renderError?.(error);
  }

  if (!deliveryRegionList || !deliveryRegionList.length) {
    return null;
  }

  return render(deliveryRegionList);
}

export default DeliveryRegionListProvider;
