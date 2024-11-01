import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStateHint from '../../components/OrderStateHint';
import OrderStatusDetails from '../../components/OrderStatusDetails';
import Spinner from '../../components/Spinner';
import { TDeliveryCourierData } from '../../types';
import {
  isTDeliveryMethod,
  isTStatusOrderKey,
} from '../../utils/assertionFunc';
import { formaterDateTime } from '../../utils/formaters';
import { DELIVERY_METHODS } from './deliveryMethodsConfig';
import { useOrderDeliveryById } from './useOrderDeliveryById';
import { useOrderProductsById } from './useOrderProductsById';

type TOrderStatusDetailsContainerProps = { orderId: number };
function OrderStatusDetailsContainer({
  orderId,
}: TOrderStatusDetailsContainerProps): JSX.Element {
  const {
    orderDeliveryData,
    isLoading: isLoadingDelivery,
    error: errorDelivery,
  } = useOrderDeliveryById(orderId);

  const {
    orderProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useOrderProductsById(orderId);

  const isLoading = isLoadingDelivery || isLoadingProducts;
  const error = errorDelivery || errorProducts;

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!orderDeliveryData || !orderProducts)
    return <Empty description="Данные заказа отсутствуют" />;

  const {
    status,
    deliveryMethod: deliveryMethodString,
    deliveryData: deliveryDataJSON,
    createdAt,
  } = orderDeliveryData;

  const deliveryMethod = isTDeliveryMethod(deliveryMethodString)
    ? deliveryMethodString
    : null;

  const orderData = [
    { key: 'Номер заказа', value: orderId },
    {
      key: 'Статус',
      value: isTStatusOrderKey(status) ? (
        <OrderStateHint state={status} iconWidth={14} iconHeight={20} />
      ) : (
        'Неизвестный статус заказа'
      ),
    },
    {
      key: 'Способ доставки',
      value: deliveryMethod
        ? DELIVERY_METHODS[deliveryMethod]
        : 'Неизвестный способ доставки',
    },
    {
      key: 'Дата оформления заказа',
      value: formaterDateTime(new Date(createdAt)),
    },
    { key: 'Телефон', value: orderDeliveryData.contactPhone },
  ];

  if (deliveryMethod === 'courier') {
    const deliveryData = JSON.parse(
      deliveryDataJSON as string
    ) as TDeliveryCourierData;

    const address = [
      deliveryData.street,
      deliveryData.building,
      deliveryData.apartment && `кв. ${deliveryData.apartment}`,
      deliveryData.entrance && `подъезд ${deliveryData.entrance}`,
      deliveryData.floor && `этаж ${deliveryData.floor}`,
    ]
      .filter(Boolean)
      .join(' ');

    orderData.push({
      key: 'Адрес доставки',
      value: `${orderDeliveryData.contactName}\n${address}`,
    });
  }

  return (
    <OrderStatusDetails deliveryData={orderData} cartListData={orderProducts} />
  );
}

export default OrderStatusDetailsContainer;
