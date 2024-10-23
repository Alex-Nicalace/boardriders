import { getDeliveryRegionId, setDeliveryRegion } from './deliveryRegionSlice';
import { useDeliveryRegionList } from './useDeliveryRegionList';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import DeliveryRegion from '../../components/Header/DeliveryRegion/DeliveryRegion';
import toast from 'react-hot-toast';

type TDeliveryRegionContainerProps = { className?: string; label?: string };
function DeliveryRegionContainer({
  className,
  label,
}: TDeliveryRegionContainerProps) {
  const { deliveryRegionList, isLoading, error } = useDeliveryRegionList();
  const currentDeliveryRegionId = useAppSelector(getDeliveryRegionId);
  const dispatch = useAppDispatch();

  function handleChangeDeliveryRegion(id: string) {
    dispatch(setDeliveryRegion(+id));
  }

  if (isLoading) return null;

  if (error) {
    console.error(error);
    return toast.error(error.message);
  }

  if (!deliveryRegionList?.length) return null;

  return (
    <DeliveryRegion
      className={className}
      selected={`${currentDeliveryRegionId}`}
      list={deliveryRegionList}
      label={label}
      onChange={handleChangeDeliveryRegion}
    />
  );
}

export default DeliveryRegionContainer;
