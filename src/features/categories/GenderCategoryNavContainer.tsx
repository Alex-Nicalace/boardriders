import GenderCategoryNav from '../../components/Header/MidbarHeader/GenderCategoryNav';
import Spinner from '../../components/Spinner';
import { useGenderCategories } from './useCategories';
import { useGenderCategoryProduct } from '../products/useGenderCategoryProduct';

type TGenderCategoryNavContainerProps = { className?: string };
function GenderCategoryNavContainer({
  className,
}: TGenderCategoryNavContainerProps): JSX.Element {
  const { genderCategories, isLoading } = useGenderCategories();
  // если находимся на странице товара то получить categoryGenders из данных о товаре, т.к. URL этого сегмента не содержит
  const activeCategoryGender = useGenderCategoryProduct();

  if (isLoading) return <Spinner />;

  const genderCategoryData = (genderCategories || []).map((item) => ({
    to: item.name,
    title: item.displayName,
  }));

  return (
    <GenderCategoryNav
      className={className}
      data={genderCategoryData}
      activeCategoryGender={activeCategoryGender}
    />
  );
}

export default GenderCategoryNavContainer;
