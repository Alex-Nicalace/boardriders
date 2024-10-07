import DeliveryOption from '../../components/DeliveryOption';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useDeliveryRegionList } from './useDeliveryRegionList';

// type TDeliveryOptionContainerProps = { }
function DeliveryOptionContainer(/*{ }: TDeliveryOptionContainerProps*/): JSX.Element {
  const { deliveryRegionList, isLoading, error } = useDeliveryRegionList();

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  return <DeliveryOption deliveryRegionList={deliveryRegionList || []} />;
}

export default DeliveryOptionContainer;
