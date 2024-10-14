import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TDeliveryData,
  TMakingOrderState,
  TOrderStepType,
  TRootState,
} from '../../types';

const initialState: TMakingOrderState = [
  {
    nameStep: 'Доставка',
    isDone: false,
    regionDeliveryId: null,
    deliveryMethod: null,
  },
  {
    nameStep: 'Оплата',
    isDone: false,
    paymentMethod: null,
  },
  {
    nameStep: 'Контакты',
    isDone: false,
    name: '',
    phone: '',
    email: '',
    comment: '',
    isSubscribed: false,
  },
];

const makeOrder = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    setOrderFirstStep(state, action: PayloadAction<TDeliveryData>) {
      state[0] = { ...state[0], ...action.payload, isDone: true };
    },
    setStepNotDone(state, action: PayloadAction<number>) {
      state[action.payload].isDone = false;
    },
  },
});

// экспорт action creator
export const { setOrderFirstStep, setStepNotDone } = makeOrder.actions;

// экспорт редьюсера
export default makeOrder.reducer;

// экспорт селекторов
const getMakeOrder = (state: TRootState) => state.makeOrder;
export const getMakeOrderSteps = createSelector(getMakeOrder, (state) =>
  state.map((item, index, array) => ({
    nameStep: item.nameStep,
    isDone: item.isDone,
    disabled: index !== 0 && !item.isDone && !array[index - 1].isDone,
  }))
);

export const getOrderDataOnStep = <Index extends keyof TMakingOrderState>(
  stepNum: Index
) =>
  createSelector(
    getMakeOrder,
    (state) => state[stepNum] as TOrderStepType<Index>
  ); // Приводим к конкретному типу);
