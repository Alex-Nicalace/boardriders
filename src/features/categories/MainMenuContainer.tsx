import Spinner from '../../components/Spinner';
import { IMenuData } from '../../data/menuData';
import { useMainMenu } from './useMainMenu';

type TMainMenuContainerProps = { children: (data: IMenuData[]) => JSX.Element };
function MainMenuContainer({ children }: TMainMenuContainerProps): JSX.Element {
  const { mainMenu, isLoading, categoryGender } = useMainMenu();

  if (isLoading) {
    return <Spinner />;
  }

  // ':categoryGender/catalog/:categoryMenu?/:categorySubmenu?'
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
            to: `${categoryGender}/catalog/${item.name}/brand/${brand.name}`,
          })),
        },
      ],
    },
  }));

  return <>{children(data)}</>;
}

export default MainMenuContainer;
