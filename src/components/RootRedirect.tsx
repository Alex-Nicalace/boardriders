import { Navigate } from 'react-router-dom';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useGenderCategories } from '../features/categories/useCategories';

function RootRedirect() {
  const { genderCategories } = useGenderCategories();
  const categoryGender = genderCategories && genderCategories[0].name;
  const [redirectPath] = useLocalStorageState(categoryGender, 'categoryGender');

  if (redirectPath) {
    return <Navigate to={`/${redirectPath}`} replace />;
  }

  return null;
}

export default RootRedirect;
