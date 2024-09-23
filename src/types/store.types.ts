import store from '../store';

export type TWishListState = {
  wishList: number[];
};

export type TCart = { [key: number]: number };

export type TCartState = {
  cart: TCart;
  totalQuantity: number;
};

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
