import store from '../store';

export type TWishListState = {
  wishList: number[];
};

export type TCartState = {
  cart: number[];
};

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
