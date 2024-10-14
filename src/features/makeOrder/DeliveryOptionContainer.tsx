import DeliveryOption, { TDeliveryForm } from '../../components/DeliveryOption';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getOrderDataOnStep, setOrderFirstStep } from './makeOrderSlice';
import { getDeliveryRegionId } from '../delivery/deliveryRegionSlice';
import { useDeliveryRegionList } from '../delivery/useDeliveryRegionList';

// type TDeliveryOptionContainerProps = { }
function DeliveryOptionContainer(/*{ }: TDeliveryOptionContainerProps*/): JSX.Element {
  const { deliveryRegionList, isLoading, error } = useDeliveryRegionList();
  const dispatch = useAppDispatch();
  const deliveryData = useAppSelector(getOrderDataOnStep(0));
  const regionDeliveryId = useAppSelector(getDeliveryRegionId); // взять по умолчанию регион из шапки

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  function handleSubmit(data: TDeliveryForm) {
    dispatch(setOrderFirstStep(data));
  }

  return (
    <DeliveryOption
      deliveryRegionList={deliveryRegionList || []}
      defaultValues={{
        ...deliveryData,
        ...(!deliveryData.regionDeliveryId && { regionDeliveryId }),
      }}
      onSubmit={handleSubmit}
    />
  );
}

export default DeliveryOptionContainer;
