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
import makeOrderReducer, {
  restoreMakingOrderFromLocalStorage,
} from './features/makeOrder/makeOrderSlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

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
    makeOrder: restoreMakingOrderFromLocalStorage(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), // Добавляем наше middleware
});

export default store;
