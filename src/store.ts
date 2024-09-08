import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './features/wishList/wishListSlise'; // импорт редьюсера
import genderReducer from './features/gender/genderSlice';

const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    gender: genderReducer,
  },
});

const { wishList, gender } = store.getState();
const prevWishList = wishList.wishList;
const prevGender = gender.gender;

// Подписываемся на изменения в store
store.subscribe(function syncWithLocalStorage() {
  const state = store.getState();
  const { wishList, gender } = state;
  const currentWishList = wishList.wishList;
  const currentGender = gender.gender;

  // Сохраняем обновленные данные в localStorage
  if (prevWishList !== currentWishList) {
    if (currentWishList.length > 0) {
      localStorage.setItem('wishList', JSON.stringify(currentWishList));
    } else {
      localStorage.removeItem('wishList');
    }
  }

  if (prevGender !== currentGender) {
    localStorage.setItem('categoryGender', JSON.stringify(currentGender));
  }
});

export default store;
