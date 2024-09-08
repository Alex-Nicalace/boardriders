import GenderCategoryNav from '../../components/Header/MidbarHeader/GenderCategoryNav';
import Spinner from '../../components/Spinner';
import { useGenderCategories } from './useCategories';
import { useGenderCategoryProduct } from '../products/useGenderCategoryProduct';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getGender, updateGender } from '../gender/genderSlice';

type TGenderCategoryNavContainerProps = { className?: string };
function GenderCategoryNavContainer({
  className,
}: TGenderCategoryNavContainerProps): JSX.Element {
  const { genderCategories, isLoading } = useGenderCategories();
  const genderFromProduct = useGenderCategoryProduct(); // если находимся на странице товара то получить categoryGenders из данных о товаре, т.к. URL этого сегмента не содержит
  const genderRestored = useAppSelector(getGender); // данные из LocalStorage
  const activeCategoryGender = genderFromProduct || genderRestored;
  const dispatch = useAppDispatch();

  if (isLoading) return <Spinner />;

  const genderCategoryData = (genderCategories || []).map((item) => ({
    to: item.name,
    title: item.displayName,
  }));

  function handleClick(to: string) {
    dispatch(updateGender(to));
  }

  return (
    <GenderCategoryNav
      className={className}
      data={genderCategoryData}
      activeCategoryGender={activeCategoryGender}
      onClick={handleClick}
    />
  );
}

export default GenderCategoryNavContainer;
