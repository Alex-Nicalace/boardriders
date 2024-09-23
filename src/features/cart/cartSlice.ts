import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCartState, TRootState } from '../../types';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';

function countTotalQuantity(cart: Map<number, number>) {
  return [...cart.values()].reduce((acc, item) => acc + item, 0);
}

const initialCart: Map<number, number> =
  loadFromLocalStorage('cart') ?? new Map();
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
      state.cart = new Map(
        action.payload.map(({ productVariantId, count }) => [
          productVariantId,
          count,
        ])
      );

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
      const prevQuantity = state.cart.get(key);
      if (prevQuantity) {
        state.cart.set(key, prevQuantity + count);
      } else {
        state.cart.set(key, count);
      }

      state.totalQuantity = state.totalQuantity + (action.payload.count ?? 1);
    },
    incProductCount(state, action: PayloadAction<number>) {
      const key = action.payload;
      const prevValue = state.cart.get(key);
      if (prevValue) {
        state.cart.set(key, prevValue + 1);
        state.totalQuantity++;
      }
    },
    decProductCount(state, action: PayloadAction<number>) {
      const key = action.payload;
      const prevValue = state.cart.get(key);
      if (prevValue && prevValue > 1) {
        state.cart.set(key, prevValue - 1);
        state.totalQuantity--;
      }
      if (prevValue && prevValue === 1) {
        state.cart.delete(key);
        state.totalQuantity--;
      }
    },
    /**
     * Удаление id товара из корзины
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    removeCart(state, action: PayloadAction<number>) {
      const countDeleted = state.cart.get(action.payload);
      state.cart.delete(action.payload);
      state.totalQuantity = state.totalQuantity - (countDeleted ?? 0);
    },
    /**
     * Очистка списка корзины
     * @param state - state редьюсера
     */
    clearCart(state) {
      state.cart.clear();
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

// экспорт редьюсера
export default cartSlice.reducer;

// экспорт селекторов
export const getCart = (state: TRootState) => state.cart.cart;
export const getTotalQuantity = (state: TRootState) => state.cart.totalQuantity;
