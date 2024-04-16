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
      {!isLessTablet && <TopbarHeader />}
      <MidbarHeader />
      {!isLessTablet && <MainMenu />}
      {isLessTablet && <BurgerMenuPopup />}
    </header>
  );
}

export default Header;
