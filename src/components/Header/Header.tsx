import './Header.scss';
import MainMenu from './MainMenu';
import TopbarHeader from './TopBarHeader';
import MidbarHeader from './MidbarHeader';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Popup from '../../component-library/Popup';
import BurgerMenu from './BurgerMenu';
import { TGenderCategoryData } from './MidbarHeader/GenderCategoryNav';

type THeaderProps = {
  data: {
    genderCategoryData: TGenderCategoryData;
  };
};
function Header({ data }: THeaderProps): JSX.Element {
  const { isLessTablet } = useScreenWidth();
  const { genderCategoryData } = data;

  return (
    <header className="header">
      {!isLessTablet && <TopbarHeader className="header__topbar" />}
      <MidbarHeader className="header__midbar" data={{ genderCategoryData }} />
      {!isLessTablet && <MainMenu className="header__main-menu" />}
      {isLessTablet && (
        <Popup.Window
          windowName="burger"
          render={() => <BurgerMenu />}
          onClickOutside={(close, e) => {
            const el = e.target;
            if (!(el instanceof HTMLElement)) return;
            if (el.closest('.burger') || el.closest('.options_opened')) return;
            close();
          }}
          fullHeight
          transitionEffect={['left']}
        />
      )}
    </header>
  );
}

export default Header;
