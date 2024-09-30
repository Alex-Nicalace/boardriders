import store from '../store';

export type TWishListState = {
  wishList: number[];
};

export type TCartItem = { productVariantId: number; count: number };

export type TCartState = {
  cart: TCartItem[];
  totalQuantity: number;
};

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
