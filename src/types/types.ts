export enum EOrderState {
  'Отменен',
  'Возврат',
  'Заказ передан в службу доставки',
  'Переадресация товара в магазин',
}
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
