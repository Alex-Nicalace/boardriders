import toast from 'react-hot-toast';
import { TDeliveryRegionListProviderProps } from './deliveryRegion.types';
import { useDeliveryRegionList } from './useDeliveryRegionList';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getDeliveryRegionId, setDeliveryRegion } from './deliveryRegionSlice';

function DeliveryRegionListProvider({
  render,
  renderLoading,
  renderError,
}: TDeliveryRegionListProviderProps) {
  const { deliveryRegionList, isLoading, error } = useDeliveryRegionList();
  const currentDeliveryRegionId = useAppSelector(getDeliveryRegionId);
  const dispatch = useAppDispatch();

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

  function handleChangeDeliveryRegion(id: number) {
    dispatch(setDeliveryRegion(id));
  }

  return render(
    deliveryRegionList,
    currentDeliveryRegionId,
    handleChangeDeliveryRegion
  );
}

export default DeliveryRegionListProvider;
