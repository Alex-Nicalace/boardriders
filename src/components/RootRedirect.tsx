import { Navigate } from 'react-router-dom';
import { useGenderCategories } from '../features/categories/useCategories';
import { useAppSelector } from '../hooks/reduxHooks';
import { getGender } from '../features/gender/genderSlice';

function RootRedirect() {
  const genderfromLocalStorage = useAppSelector(getGender);
  const { genderCategories } = useGenderCategories();
  const genderDefault = genderCategories && genderCategories[0].name;
  const redirectPath = genderfromLocalStorage || genderDefault || '';

  if (redirectPath) {
    return <Navigate to={`/${redirectPath}`} replace />;
  }

  return null;
}

export default RootRedirect;
