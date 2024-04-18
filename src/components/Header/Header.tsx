import './Header.scss';
import MainMenu from './MainMenu';
import TopbarHeader from './TopBarHeader';
import MidbarHeader from './MidbarHeader';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Popup from '../../component-library/Popup';
import BurgerMenu from './BurgerMenu';

// interface IHeaderProps {}
function Header(): JSX.Element {
  const { isLessTablet } = useScreenWidth();

  return (
    <header className="header">
      {!isLessTablet && <TopbarHeader className="header__topbar" />}
      <MidbarHeader className="header__midbar" />
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
        />
      )}
    </header>
  );
}

export default Header;
