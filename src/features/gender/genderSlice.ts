import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../../types';
import { loadFromLocalStorage } from '../../utils/loadFromLocalStorage';

const initialState = {
  gender: '',
};

const genderSlice = createSlice({
  name: 'gender',
  initialState,
  reducers: {
    updateGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
  },
});

// экспорт action creator
export const { updateGender } = genderSlice.actions;

// экспорт редьюсера
export default genderSlice.reducer;

// экспорт селекторов
export const getGender = (state: TRootState) => state.gender.gender;

export function restoreGenderFromLocalStorage() {
  const gender = loadFromLocalStorage<string>('categoryGender') ?? '';
  return { gender };
}
