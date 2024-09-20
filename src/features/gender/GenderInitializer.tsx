import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useGenderCategories } from '../categories/useGenderCategories';
import { getGender, updateGender } from './genderSlice';

/**
 * Инициализация пола пользователя при первом открытии приложения, если пол не указан в LocalStorage
 */
function GenderInitializer() {
  const genderCategoryStored = useAppSelector(getGender);
  const dispatch = useAppDispatch();
  const { genderCategories, isLoading } = useGenderCategories();
  const gender = genderCategories && genderCategories[0]?.name;

  useEffect(
    function setGenderDefaultToStore() {
      if (genderCategoryStored !== '' || isLoading || !gender) return;
      dispatch(updateGender(gender));
    },
    [genderCategoryStored, isLoading, gender, dispatch]
  );

  return null;
}

export default GenderInitializer;
