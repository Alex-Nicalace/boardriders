import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './features/wishList/wishListSlise'; // импорт редьюсера
import genderReducer from './features/gender/genderSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    gender: genderReducer,
    cart: cartReducer,
  },
});

const { wishList, gender, cart } = store.getState();
const prevWishList = wishList.wishList;
const prevGender = gender.gender;
const prevCart = cart.cart;

// Подписываемся на изменения в store
store.subscribe(function syncWithLocalStorage() {
  const state = store.getState();
  const { wishList, gender, cart } = state;
  const currentWishList = wishList.wishList;
  const currentGender = gender.gender;
  const currentCart = cart.cart;

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

  if (prevCart !== currentCart) {
    if (Object.keys(currentCart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(currentCart));
    } else {
      localStorage.removeItem('cart');
    }
  }
});

export default store;
