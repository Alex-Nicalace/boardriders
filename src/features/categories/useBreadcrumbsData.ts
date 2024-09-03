import { useMatch } from 'react-router-dom';
import { useGenderCategories } from './useCategories';
import { useMainMenu } from './useMainMenu';
import { TBreadcrumbsData } from '../../components/ui/Breadcrumbs';
import { useBrand } from '../brands/useBrand';

export function useBreadcrumbsData() {
  const breadcrumbsData: { to: string; title: string }[] = [];
  const { genderCategories, isLoading: isLoadingGender } =
    useGenderCategories();
  const { mainMenuFlattened, isLoading: isLoadingMainMenu } = useMainMenu();
  const { brands, isLoading: isLoadingBrand } = useBrand();
  const isLoading = isLoadingBrand || isLoadingMainMenu || isLoadingGender;
  const matchCatalog = useMatch(':categoryGender/catalog/:category');
  const matchCatalogBrand = useMatch(
    ':categoryGender/brand/:brand/catalog/:category?'
  );

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

  if (matchCatalog) {
    const { categoryGender, category } = matchCatalog.params;
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

  breadcrumbsData.unshift({ to: '/', title: 'Главная' });

  const breadcrumbsDataResult = breadcrumbsData as TBreadcrumbsData;

  delete breadcrumbsDataResult.at(-1)?.to;

  return breadcrumbsDataResult;

  function getCategoryGenderDisplay(categoryGender: string) {
    return genderCategories?.find((item) => item.name === categoryGender)
      ?.displayName;
  }
}
