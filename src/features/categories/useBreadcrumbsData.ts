import { useMatch } from 'react-router-dom';
import { useGenderCategories } from './useGenderCategories';
import { useMainMenu } from './useMainMenu';
import { TBreadcrumbsData } from '../../components/ui/Breadcrumbs';
import { useBrand } from '../brands/useBrand';
import { useProduct } from '../products/useProduct';

export function useBreadcrumbsData() {
  const breadcrumbsData: { to: string; title: string }[] = [];
  const { genderCategories, isLoading: isLoadingGender } =
    useGenderCategories();
  const { mainMenuFlattened, isLoading: isLoadingMainMenu } = useMainMenu();
  const { brands, isLoading: isLoadingBrand } = useBrand();
  const { product, isLoading: isLoadingProduct } = useProduct({
    isGetFromCache: true,
  });
  const isLoading =
    isLoadingBrand || isLoadingMainMenu || isLoadingGender || isLoadingProduct;
  const matchCatalogCategory = useMatch(':categoryGender/catalog/:category');
  const matchCatalog = useMatch(':categoryGender/catalog');
  const matchCatalogBrand = useMatch(
    ':categoryGender/brand/:brand/catalog/:category?'
  );
  const matchProduct = useMatch('/product/:productId');

  if (isLoading) {
    return [{ title: 'Главная' }] as TBreadcrumbsData;
  }

  if (matchCatalogBrand) {
    const { categoryGender, category } = matchCatalogBrand.params;
    const { name: brandName } = brands ?? {};
    const categoryGenderDisplay =
      categoryGender && getCategoryGenderDisplay(categoryGender);

    let categoryLoop = category;
    while (categoryLoop) {
      const categoryCurrent = categoryLoop;
      const menuItem = mainMenuFlattened?.find(
        (item) => item.name === categoryCurrent
      );
      breadcrumbsData.unshift({
        to: `/${categoryGender}/brand/${brandName}/catalog/${categoryCurrent}`,
        title: menuItem?.displayName || 'Неизвестный маршрут',
      });
      categoryLoop = menuItem
        ? mainMenuFlattened?.find((item) => item.id === menuItem.parentId)?.name
        : '';
    }

    if (categoryGenderDisplay && breadcrumbsData.length > 0) {
      breadcrumbsData[0].title += ` ${categoryGenderDisplay.toLocaleLowerCase()}`;
    }

    breadcrumbsData.unshift({
      to: `/${categoryGender}/brand/${brandName}/catalog/`,
      title: brandName || 'Неизвестный маршрут',
    });
  }

  if (matchCatalogCategory) {
    const { categoryGender, category } = matchCatalogCategory.params;
    const categoryGenderDisplay =
      categoryGender && getCategoryGenderDisplay(categoryGender);

    let categoryLoop = category;
    do {
      const categoryCurrent = categoryLoop;
      const menuItem = mainMenuFlattened?.find(
        (item) => item.name === categoryCurrent
      );
      breadcrumbsData.unshift({
        to: `/${categoryGender}/catalog/${categoryCurrent}`,
        title: menuItem?.displayName || 'Неизвестный маршрут',
      });
      categoryLoop = menuItem
        ? mainMenuFlattened?.find((item) => item.id === menuItem.parentId)?.name
        : '';
    } while (categoryLoop);

    if (categoryGenderDisplay && breadcrumbsData.length > 0) {
      breadcrumbsData[0].title += ` ${categoryGenderDisplay.toLocaleLowerCase()}`;
    }
  }

  if (matchProduct) {
    const { categoryHierar = [], categoryGenders } = product ?? {};
    const categoryGender = categoryGenders && categoryGenders[0].name;
    const categoryGenderDisplay =
      categoryGender && getCategoryGenderDisplay(categoryGender);
    categoryHierar.forEach((category) => {
      breadcrumbsData.push({
        to: `/${categoryGender}/catalog/${category.name}`,
        title: category.displayName || 'Неизвестный маршрут',
      });
    });

    if (categoryGenderDisplay && breadcrumbsData.length > 0) {
      breadcrumbsData[0].title += ` ${categoryGenderDisplay.toLocaleLowerCase()}`;
    }
  }

  if (matchCatalog) {
    const { categoryGender } = matchCatalog.params;
    const categoryGenderDisplay =
      categoryGender && getCategoryGenderDisplay(categoryGender);
    breadcrumbsData.push({
      title: `Каталог${
        categoryGenderDisplay ? ' ' + categoryGenderDisplay?.toLowerCase() : ''
      }`,
      to: '',
    });
  }

  breadcrumbsData.unshift({ to: '/', title: 'Главная' });

  const breadcrumbsDataResult = breadcrumbsData as TBreadcrumbsData;

  // удаляем у последнего элемента ссылку
  delete breadcrumbsDataResult.at(-1)?.to;

  return breadcrumbsDataResult;

  function getCategoryGenderDisplay(categoryGender: string) {
    return genderCategories?.find((item) => item.name === categoryGender)
      ?.displayName;
  }
}
