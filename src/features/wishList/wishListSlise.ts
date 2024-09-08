import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState, TWishListState } from '../../types';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';

const initialState: TWishListState = {
  wishList: loadFromLocalStorage('wishList') ?? ([] as number[]),
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    /**
     * Установка списка избранных
     * @param state - state редьюсера
     * @param action - экшн с массивом id
     */
    setWishList(state, action: PayloadAction<number[]>) {
      state.wishList = action.payload;
    },
    /**
     * Добавление id товара в список избранных
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    addWishList(state, action: PayloadAction<number>) {
      state.wishList.push(action.payload);
    },
    /**
     * Удаление id товара из списка избранных
     * @param state - state редьюсера
     * @param action - экшн с id товара
     */
    removeWishList(state, action: PayloadAction<number>) {
      state.wishList = state.wishList.filter((item) => item !== action.payload);
    },
    /**
     * Очистка списка избранных
     * @param state - state редьюсера
     */
    clearWishList(state) {
      state.wishList = [];
    },
  },
});

// экспорт action creator
export const { setWishList, addWishList, removeWishList, clearWishList } =
  wishListSlice.actions;

// экспорт редьюсера
export default wishListSlice.reducer;

// экспорт селекторов
export const getWishList = (state: TRootState) => state.wishList.wishList;
