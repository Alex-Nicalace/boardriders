import { statusOrder } from '../constants';

export type TStatusOrderKey = keyof typeof statusOrder;

interface ILinkData {
  title: string;
  to: string;
  // isMark?: boolean;
  isAccented?: boolean;
}

export interface IMenuData extends ILinkData {
  submenu?: {
    sections: {
      title: string;
      isWideSection?: boolean;
      links: ILinkData[];
    }[];
    imgLinkData?: {
      src: string;
      to: string;
      title?: string;
    };
  };
}

export type TDeliveryMethod =
  | 'get-in-shop'
  | 'delivery-in-shop'
  | 'courier'
  | 'pick-up-point';

export type TKeyDeliveryCourierData =
  | 'apartment'
  | 'building'
  | 'entrance'
  | 'floor'
  | 'street'
  | 'time';

export type TDeliveryCourierData = Record<TKeyDeliveryCourierData, string>;
