import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './features/wishList/wishListSlise'; // импорт редьюсера

const store = configureStore({
  reducer: {
    wishList: wishListReducer,
  },
});

// Подписываемся на изменения в store
store.subscribe(function syncWishListWithLocalStorage() {
  const state = store.getState();
  const wishList = state.wishList.wishList;

  // Сохраняем обновленные данные в localStorage
  if (wishList.length > 0) {
    localStorage.setItem('wishList', JSON.stringify(wishList));
  } else {
    localStorage.removeItem('wishList');
  }
});

export default store;
