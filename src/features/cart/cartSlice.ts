import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { TAppDispatch, TCart, TCartState, TRootState } from '../../types';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';

function countTotalQuantity(cart: TCart) {
  return Object.values(cart).reduce((acc, item) => acc + item, 0);
}

const initialCart: TCart = loadFromLocalStorage('cart') ?? {};
const initialTotalQuantity = countTotalQuantity(initialCart);

const initialState: TCartState = {
  cart: initialCart,
  totalQuantity: initialTotalQuantity,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Установка списка корзины
     * @param state - state редьюсера
     * @param action - экшн с массивом id
     */
    setCart(
      state,
      action: PayloadAction<{ productVariantId: number; count: number }[]>
    ) {
      action.payload.reduce((acc, { productVariantId, count }) => {
        acc[productVariantId] = count;
        return acc;
      }, state.cart);

      state.totalQuantity = countTotalQuantity(state.cart);
    },
    /**
     * Добавление id товара в корзину
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    addCart(
      state,
      action: PayloadAction<{ productVariantId: number; count?: number }>
    ) {
      const key = action.payload.productVariantId;
      const count = action.payload.count ?? 1;
      if (Object.prototype.hasOwnProperty.call(state.cart, key)) {
        state.cart[key] = state.cart[key] + count;
      } else {
        state.cart[key] = count;
      }

      state.totalQuantity = state.totalQuantity + (action.payload.count ?? 1);
    },
    incProductCount(state, action: PayloadAction<number>) {
      const key = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.cart, key)) {
        state.cart[key]++;
        state.totalQuantity++;
      }
    },
    decProductCount(state, action: PayloadAction<number>) {
      const key = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.cart, key)) {
        if (state.cart[key] > 1) {
          state.cart[key]--;
          state.totalQuantity--;
        }
        if (state.cart[key] === 1) {
          delete state.cart[key];
          state.totalQuantity--;
        }
      }
    },
    /**
     * Удаление id товара из корзины
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    removeCart(state, action: PayloadAction<number>) {
      const countDeleted = state.cart[action.payload];
      delete state.cart[action.payload];
      state.totalQuantity = state.totalQuantity - (countDeleted ?? 0);
    },
    /**
     * Очистка списка корзины
     * @param state - state редьюсера
     */
    clearCart(state) {
      state.cart = {};
      state.totalQuantity = 0;
    },
  },
});

// экспорт action creator
export const {
  setCart,
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
  createSelector(getCartData, (cart) => Boolean(cart.cart[productVariantId]));
export const getProductVariantIds = createSelector(getCartData, (cart) =>
  Object.keys(cart.cart).map(Number)
);
