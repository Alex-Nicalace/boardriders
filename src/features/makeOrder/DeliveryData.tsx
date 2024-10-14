import DeliveryCourierData from '../../components/DeliveryCourierData';
import ErrorMessage from '../../components/ErrorMessage';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getOrderDataOnStep } from './makeOrderSlice';

function DeliveryData(): JSX.Element {
  const deliveryData = useAppSelector(getOrderDataOnStep(0));

  if (deliveryData.deliveryMethod === 'courier' && deliveryData.courier) {
    const { street, building, apartment, entrance, floor, date, time } =
      deliveryData.courier;
    return (
      <DeliveryCourierData
        street={street}
        building={building}
        dateDelivery={new Date(date)}
        timeDelivery={time}
        apartment={apartment}
        entrance={entrance}
        floor={floor}
      />
    );
  }

  // if (deliveryData.deliveryMethod === 'delivery-in-shop' && deliveryData['delivery-in-shop']) {
  //   // компонент, который показывает введнные пользователем данные о доставке данным способом
  // }

  return <ErrorMessage message="Не предусмотренный способ доставки!" />;
}

export default DeliveryData;
