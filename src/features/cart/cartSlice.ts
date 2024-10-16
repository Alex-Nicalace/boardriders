import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { TAppDispatch, TCartItem, TCartState, TRootState } from '../../types';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';

function countTotalQuantity(cart: TCartItem[]) {
  return Object.values(cart).reduce((acc, item) => acc + item.count, 0);
}

const initialState: TCartState = {
  cart: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<TCartItem[]>) {
      state.cart = action.payload;
      state.totalQuantity = countTotalQuantity(state.cart);
    },
    editCart(state, action: PayloadAction<TCartItem>) {
      const { productVariantId, ...rest } = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productVariantId === productVariantId
      );
      if (index !== -1) {
        state.cart[index] = { productVariantId, ...rest };
        state.totalQuantity = countTotalQuantity(state.cart);
      }
    },
    addCart(
      state,
      action: PayloadAction<Omit<TCartItem, 'count'> & { count?: number }>
    ) {
      const { productVariantId, count = 1, ...rest } = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productVariantId === productVariantId
      );
      if (index !== -1) {
        state.cart[index].count += count;
      } else {
        state.cart.push({ productVariantId, count, ...rest });
      }
      state.totalQuantity += count;
    },
    incProductCount(state, action: PayloadAction<number>) {
      const productVariantId = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productVariantId === productVariantId
      );
      if (index !== -1) {
        state.cart[index].count++;
        state.totalQuantity++;
      }
    },
    decProductCount(state, action: PayloadAction<number>) {
      const productVariantId = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productVariantId === productVariantId
      );
      if (index !== -1) {
        if (state.cart[index].count > 1) {
          state.cart[index].count--;
        }
        if (state.cart[index].count === 1) {
          state.cart.splice(index, 1);
        }
        state.totalQuantity--;
      }
    },
    /**
     * Удаление id товара из корзины
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    removeCart(state, action: PayloadAction<number>) {
      const productVariantId = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productVariantId === productVariantId
      );
      if (index !== -1) {
        const countDeleted = state.cart[index].count;
        state.cart.splice(index, 1);
        state.totalQuantity = state.totalQuantity - countDeleted;
      }
    },
    /**
     * Очистка списка корзины
     * @param state - state редьюсера
     */
    clearCart(state) {
      state.cart = [];
      state.totalQuantity = 0;
    },
  },
});

// экспорт action creator
export const {
  setCart,
  editCart,
  addCart,
  removeCart,
  clearCart,
  incProductCount,
  decProductCount,
} = cartSlice.actions;
export const addCartWithToast =
  ({ productVariantId, count }: { productVariantId: number; count?: number }) =>
  async (dispatch: TAppDispatch) => {
    try {
      dispatch(addCart({ productVariantId, count }));
      toast.success('Товар добавлен в корзину');
    } catch (error) {
      console.error(error);
      toast.error('Произошла ошибка при добавлении в корзину');
    }
  };

export const removeCartWithToast =
  (productVariantId: number) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(removeCart(productVariantId));
      toast.success('Товар удален из корзины');
    } catch (error) {
      console.error(error);
      toast.error('Произошла ошибка при удалении из корзины');
    }
  };

// экспорт редьюсера
export default cartSlice.reducer;

// экспорт селекторов
const getCartData = (state: TRootState) => state.cart;
export const getCart = createSelector(getCartData, (cart) => cart.cart);
export const getTotalQuantity = (state: TRootState) => state.cart.totalQuantity;
export const isProductInCart = (productVariantId: number) =>
  createSelector(
    getCartData,
    (cart) =>
      cart.cart.findIndex(
        (item) => item.productVariantId === productVariantId
      ) !== -1
  );
export const getCartIds = createSelector(getCartData, (cart) =>
  cart.cart.map((item) => item.productVariantId)
);
export const getCartMapping = createSelector(getCartData, (cart) =>
  cart.cart.reduce((acc, item) => {
    acc[item.productVariantId] = item;
    return acc;
  }, {} as Record<number, TCartItem>)
);

export function restoreCartFromLocalStorage() {
  const cart: TCartItem[] = loadFromLocalStorage('cart') ?? [];
  const totalQuantity = countTotalQuantity(cart);

  return { cart, totalQuantity };
}
