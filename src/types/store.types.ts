import store from '../store';

export type TWishListState = {
  wishList: number[];
};

export type TCartState = {
  cart: Map<number, number>;
  totalQuantity: number;
};

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
