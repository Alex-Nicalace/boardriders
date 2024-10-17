import { getMakeOrderSteps } from '../features/makeOrder/makeOrderSlice';
import store from '../store';

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

/* TRootStateManual зачем, если есть TRootState. Потребность в ручном типе возникла
когда начал использовать middleware в configureStore. Если использовал тип TRootState
то происходило зацикливание.
*/
export type TRootStateManual = {
  cart: TCartState;
  wishList: TWishListState;
  gender: TGenderState;
  deliveryRegion: TDeliveryRegionState;
  makeOrder: TMakingOrderState;
};

export type TWishListState = {
  wishList: number[];
};

export type TCartItem = { productVariantId: number; count: number };

export type TCartState = {
  cart: TCartItem[];
  totalQuantity: number;
};

export type TDeliveryRegionState = {
  id: number;
};

export type TGenderState = {
  gender: string;
};

type TCommonDataStep = {
  nameStep: string;
  isDone: boolean;
  donedNameStep: string;
};

type TDeliveryShopOut = {};

type TDeliveryShopIn = {};

type TDeliveryCourier = {
  street: string;
  building: string;
  apartment: string;
  entrance: string;
  floor: string;
  date: string;
  time: string;
};

type TDeliveryPoint = {};

export type TDeliveryMethod =
  | 'get-in-shop'
  | 'delivery-in-shop'
  | 'courier'
  | 'pick-up-point'
  | null;

export type TDeliveryData = {
  regionDeliveryId: number | null;
  deliveryMethod: TDeliveryMethod;
  'get-in-shop'?: TDeliveryShopOut;
  'delivery-in-shop'?: TDeliveryShopIn;
  courier?: TDeliveryCourier;
  'pick-up-point'?: TDeliveryPoint;
};

export type TDelivery = TCommonDataStep & TDeliveryData;

export type TPaymentData = {
  paymentMethod: 'cash' | 'card' | null;
};

type TPayment = TCommonDataStep & TPaymentData;

export type TContactsData = {
  name: string;
  phone: string;
  email: string;
  comment: string;
  isSubscribed: boolean;
};

type TContacts = TCommonDataStep & TContactsData;

export type TMakingOrderState = [TDelivery, TPayment, TContacts];

// Дженерик для получения типа элемента по индексу
export type TOrderStepType<Index extends keyof TMakingOrderState> =
  TMakingOrderState[Index];

export type TGetMakeOrderStepsReturn = ReturnType<
  typeof getMakeOrderSteps
>[number];
