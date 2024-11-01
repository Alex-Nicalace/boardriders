import { TShippingDetailsData } from '../ShippingDetails';
import { TWareCardCartDataOrdered } from '../ui/WareCardCart';

export type TOrderStatusDetailsProps = {
  className?: string;
  deliveryData: TShippingDetailsData[];
  cartListData: TWareCardCartDataOrdered[];
};
