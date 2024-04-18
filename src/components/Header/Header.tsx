import './Header.scss';
import MainMenu from './MainMenu';
import TopbarHeader from './TopBarHeader';
import MidbarHeader from './MidbarHeader';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import BurgerMenuPopup from '../BurgerMenuPopup';

// interface IHeaderProps {}
function Header(): JSX.Element {
  const { isLessTablet } = useScreenWidth();

  return (
    <header className="header">
      {!isLessTablet && <TopbarHeader className="header__topbar" />}
      <MidbarHeader className="header__midbar" />
      {!isLessTablet && <MainMenu className="header__main-menu" />}
      {isLessTablet && <BurgerMenuPopup />}
    </header>
  );
}

export default Header;
