import './Header.scss';
import BurgerMenu from './BurgerMenu';
import MainMenu from './MainMenu';
import TopbarHeader from './TopBarHeader';
import MidbarHeader from './MidbarHeader';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

// interface IHeaderProps {}
function Header(): JSX.Element {
  const { isLessTablet } = useScreenWidth();

  return (
    <header className="header">
      {!isLessTablet && <TopbarHeader />}
      <MidbarHeader />
      {!isLessTablet && <MainMenu />}
      {isLessTablet && <BurgerMenu />}
    </header>
  );
}

export default Header;
