import './Header.scss';
import TopbarHeader from './TopBarHeader';
import MidbarHeader from './MidbarHeader';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Popup from '../../component-library/Popup';
import BurgerMenu from './BurgerMenu';
import MainMenuProvider from '../../features/categories/MainMenuProvider';
import MainMenu from './MainMenu';

function Header(): JSX.Element {
  const { isLessTablet } = useScreenWidth();

  return (
    <header className="header">
      {!isLessTablet && <TopbarHeader className="header__topbar" />}
      <MidbarHeader className="header__midbar" />
      {!isLessTablet && (
        <MainMenuProvider>
          {(data) => <MainMenu className="header__main-menu" data={data} />}
        </MainMenuProvider>
      )}
      {isLessTablet && (
        <Popup.Window
          windowName="burger"
          render={() => (
            <MainMenuProvider>
              {(data) => <BurgerMenu data={data} />}
            </MainMenuProvider>
          )}
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
