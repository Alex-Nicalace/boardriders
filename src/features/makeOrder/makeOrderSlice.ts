import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TDeliveryData,
  TMakingOrderState,
  TOrderStepType,
  TPaymentData,
  TRootState,
} from '../../types';
import { WAY_DELIVERY } from '../../components/DeliveryOption';
import { PAYMENT_METHOD } from '../../components/PaymentOption';

const initialState: TMakingOrderState = [
  {
    nameStep: 'Доставка',
    isDone: false,
    regionDeliveryId: null,
    deliveryMethod: null,
    donedNameStep: '',
  },
  {
    nameStep: 'Оплата',
    isDone: false,
    paymentMethod: null,
    donedNameStep: '',
  },
  {
    nameStep: 'Контакты',
    isDone: false,
    name: '',
    phone: '',
    email: '',
    comment: '',
    isSubscribed: false,
    donedNameStep: '',
  },
];

const makeOrder = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    setOrderFirstStep(state, action: PayloadAction<TDeliveryData>) {
      const { title, donedTitle } =
        WAY_DELIVERY.find(
          (item) => item.value === action.payload.deliveryMethod
        ) ?? {};
      const donedNameStep = donedTitle || title || '';

      state[0] = {
        ...state[0],
        ...action.payload,
        isDone: true,
        donedNameStep,
      };
    },
    setOrderTwoStep(state, action: PayloadAction<TPaymentData>) {
      const { title, donedTitle } =
        PAYMENT_METHOD.find(
          (item) => item.value === action.payload.paymentMethod
        ) ?? {};
      const donedNameStep = donedTitle || title || '';

      state[1] = {
        ...state[1],
        ...action.payload,
        isDone: true,
        donedNameStep,
      };
    },
    setStepNotDone(state, action: PayloadAction<number>) {
      state[action.payload].isDone = false;
    },
  },
});

// экспорт action creator
export const { setOrderFirstStep, setOrderTwoStep, setStepNotDone } =
  makeOrder.actions;

// экспорт редьюсера
export default makeOrder.reducer;

// экспорт селекторов
const getMakeOrder = (state: TRootState) => state.makeOrder;

export const getMakeOrderSteps = createSelector(getMakeOrder, (state) =>
  state.map(({ nameStep, isDone, donedNameStep }, index, array) => ({
    nameStep,
    isDone,
    disabled: index !== 0 && !isDone && !array[index - 1].isDone,
    donedNameStep,
  }))
);

export const getOrderDataOnStep = <Index extends keyof TMakingOrderState>(
  stepNum: Index
) =>
  createSelector(
    getMakeOrder,
    (state) => state[stepNum] as TOrderStepType<Index>
  ); // Приводим к конкретному типу);
