import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCartState } from '../../types';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';

const initialState: TCartState = {
  cart: loadFromLocalStorage('cart') ?? ([] as number[]),
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
    setCart(state, action: PayloadAction<number[]>) {
      state.cart = action.payload;
    },
    /**
     * Добавление id товара в корзину
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    addCart(state, action: PayloadAction<number>) {
      state.cart.push(action.payload);
    },
    /**
     * Удаление id товара из корзины
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    removeCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item !== action.payload);
    },
    /**
     * Очистка списка корзины
     * @param state - state редьюсера
     */
    clearCart(state) {
      state.cart = [];
    },
  },
});

// экспорт action creator
export const { setCart, addCart, removeCart, clearCart } = cartSlice.actions;

// экспорт редьюсера
export default cartSlice.reducer;

// экспорт селекторов
export const getCart = (state: TCartState) => state.cart;
