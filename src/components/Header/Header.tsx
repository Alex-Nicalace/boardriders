import './Header.scss';
import MediaQuery from '../ui/MediaQuery';
import BurgerMenu from './BurgerMenu';
import MainMenu from './MainMenu';
import TopbarHeader from './TopBarHeader';
import MidbarHeader from './MidbarHeader';

// interface IHeaderProps {}
function Header(): JSX.Element {
  return (
    <header className="header">
      <MediaQuery minWidth="tablet">
        <TopbarHeader />
      </MediaQuery>
      <MidbarHeader />
      <MediaQuery minWidth="tablet">
        <MainMenu />
      </MediaQuery>
      <MediaQuery maxWidth="tablet">
        <BurgerMenu />
      </MediaQuery>
    </header>
  );
}

export default Header;
