import { configureStore } from '@reduxjs/toolkit';
import wishListReducer, {
  restoreWishListLocalStorage,
} from './features/wishList/wishListSlise'; // импорт редьюсера
import genderReducer, {
  restoreGenderFromLocalStorage,
} from './features/gender/genderSlice';
import cartReducer, {
  restoreCartFromLocalStorage,
} from './features/cart/cartSlice';
import deliveryRegionReducer, {
  restoreDeliveryRegionFromLocalStorage,
} from './features/delivery/deliveryRegionSlice';
import makeOrderReducer from './features/makeOrder/makeOrderSlice';

const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    gender: genderReducer,
    cart: cartReducer,
    deliveryRegion: deliveryRegionReducer,
    makeOrder: makeOrderReducer,
  },
  preloadedState: {
    cart: restoreCartFromLocalStorage(),
    deliveryRegion: restoreDeliveryRegionFromLocalStorage(),
    gender: restoreGenderFromLocalStorage(),
    wishList: restoreWishListLocalStorage(),
  },
});

// Подписываемся на изменения в store
store.subscribe(function syncWithLocalStorage() {
  const state = store.getState();
  const { wishList, gender, cart, deliveryRegion } = state;

  if (wishList.wishList.length > 0) {
    localStorage.setItem('wishList', JSON.stringify(wishList.wishList));
  } else {
    localStorage.removeItem('wishList');
  }

  localStorage.setItem('categoryGender', JSON.stringify(gender.gender));

  if (cart.cart.length > 0) {
    localStorage.setItem('cart', JSON.stringify(cart.cart));
  } else {
    localStorage.removeItem('cart');
  }

  localStorage.setItem('deliveryRegion', JSON.stringify(deliveryRegion.id));
});

export default store;
