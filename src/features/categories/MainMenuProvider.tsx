import Spinner from '../../components/Spinner';
import { IMenuData } from '../../data/menuData';
import { useMainMenu } from './useMainMenu';

type TMainMenuProviderProps = { children: (data: IMenuData[]) => JSX.Element };
function MainMenuProvider({ children }: TMainMenuProviderProps): JSX.Element {
  const { mainMenu, isLoading, categoryGender } = useMainMenu();

  if (isLoading) {
    return <Spinner />;
  }

  const data: IMenuData[] = (mainMenu || []).map((item) => ({
    title: item.displayName,
    to: `${categoryGender}/catalog/${item.name}`,
    submenu: {
      sections: [
        {
          title: item.displayName,
          isWideSection: true,
          links: [
            ...(item.subMenu || []).map((subItem) => ({
              title: subItem.displayName,
              to: `${categoryGender}/catalog/${subItem.name}`,
            })),
            {
              title: 'Все категории',
              to: `${categoryGender}/catalog/${item.name}`,
              isAccented: true,
            },
          ],
        },
        {
          title: 'Бренды',
          links: (item.brands || []).map((brand) => ({
            title: brand.name,
            to: `${categoryGender}/brand/${brand.name}/catalog/${item.name}`,
          })),
        },
      ],
    },
  }));

  return <>{children(data)}</>;
}

export default MainMenuProvider;
