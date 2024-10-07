import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDeliveryRegion, TRootState } from '../../types';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';

const initialState: TDeliveryRegion = {
  id: loadFromLocalStorage('deliveryRegion') ?? 1,
};

const deliveryRegionSlice = createSlice({
  name: 'deliveryRegion',
  initialState,
  reducers: {
    setDeliveryRegion(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
  },
});

// экспорт action creator
export const { setDeliveryRegion } = deliveryRegionSlice.actions;

// экспорт редьюсера
export default deliveryRegionSlice.reducer;

// экспорт селекторов
export const getDeliveryRegionId = (state: TRootState) =>
  state.deliveryRegion.id;
