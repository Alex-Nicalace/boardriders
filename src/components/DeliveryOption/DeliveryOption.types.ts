import { TDeliveryData, TDeliveryMethod } from '../../types';

export type TWayDelivery = {
  title: string;
  donedTitle?: string;
  price?: string;
  hint: string;
  content: JSX.Element;
  disabled?: boolean;
  value: TDeliveryMethod;
};
export type TDeliveryForm = TDeliveryData;

export type TDeliveryOptionProps = {
  deliveryRegionList: { id: number; name: string }[];
  onSubmit?: (data: TDeliveryForm) => void;
  defaultValues?: TDeliveryForm;
};
