import DeliveryOption, { TDeliveryForm } from '../../components/DeliveryOption';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setOrderFirstStep } from '../makeOrder/makeOrderSlice';
import { useDeliveryRegionList } from './useDeliveryRegionList';

// type TDeliveryOptionContainerProps = { }
function DeliveryOptionContainer(/*{ }: TDeliveryOptionContainerProps*/): JSX.Element {
  const { deliveryRegionList, isLoading, error } = useDeliveryRegionList();
  const dispatch = useAppDispatch();

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  function handleSubmit(data: TDeliveryForm) {
    dispatch(setOrderFirstStep(data));
  }

  return (
    <DeliveryOption
      deliveryRegionList={deliveryRegionList || []}
      onSubmit={handleSubmit}
    />
  );
}

export default DeliveryOptionContainer;
