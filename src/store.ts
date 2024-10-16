import { Action, configureStore, Middleware } from '@reduxjs/toolkit';
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

function isTAppAction(action: any): action is Action {
  return 'type' in action; // Пример простой проверки
}

export const localStorageMiddleware: Middleware /* <{}, TRootState> */ =
  (store) => (next) => (action) => {
    const result = next(action); // Пропускаем действие

    if (!isTAppAction(action)) return result;

    const typeValue = action.type;
    const nameSlice = typeValue.slice(0, typeValue.indexOf('/'));
    const state = store.getState(); // Типизированный state

    switch (nameSlice) {
      case 'wishList':
        if (state.wishList.wishList.length > 0) {
          localStorage.setItem(
            'wishList',
            JSON.stringify(state.wishList.wishList)
          );
        } else {
          localStorage.removeItem('wishList');
        }
        break;

      case 'gender':
        localStorage.setItem(
          'categoryGender',
          JSON.stringify(state.gender.gender)
        );
        break;

      case 'cart':
        if (state.cart.cart.length > 0) {
          localStorage.setItem('cart', JSON.stringify(state.cart.cart));
        } else {
          localStorage.removeItem('cart');
        }
        break;

      case 'deliveryRegion':
        localStorage.setItem(
          'deliveryRegion',
          JSON.stringify(state.deliveryRegion.id)
        );
        break;

      case 'makeOrder':
        localStorage.setItem('makingOrder', JSON.stringify(state.makeOrder));
        break;

      default:
        break;
    }

    return result;
  };

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
