import { useScreenWidth } from '../../Context/useScreenWidthContext';
import CartList from '../CartList';
import ShippingDetails from '../ShippingDetails';
import './OrderStatusDetails.scss';
import { TOrderStatusDetailsProps } from './OrderStatusDetails.types';

function OrderStatusDetails({
  className,
  deliveryData,
  cartListData,
}: TOrderStatusDetailsProps): JSX.Element {
  const { isLessMobileSmall } = useScreenWidth();

  return (
    <div
      className={['order-status-details', className].filter(Boolean).join(' ')}
    >
      <ShippingDetails
        className="order-status-details__shipping-details"
        data={deliveryData}
        mode={isLessMobileSmall ? 'compact' : 'normal'}
      />
      <CartList
        className="order-status-details__orders"
        data={cartListData}
        isOrdered
      />
    </div>
  );
}

export default OrderStatusDetails;
