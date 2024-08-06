import { useProduct } from './useProduct';

export function useGenderCategoryProduct() {
  const { product } = useProduct({ isGetFromCache: true });
  const activeCategoryGender =
    product?.categoryGenders && product?.categoryGenders[0].name;

  return activeCategoryGender;
}
