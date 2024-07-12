import { Link } from 'react-router-dom';

import './MidbarHeader.scss';
import logo from '../../../assets/icons/logo.png';
import ListLinks from '../../../component-library/ListLinks';
import { useScreenWidth } from '../../../Context/useScreenWidthContext';
import ToolbarHeader from './ToolbarHeader';

const SWITCHABLE_MENU_DATA = [
  { to: 'man', title: 'Мужчинам' },
  { to: 'woman', title: 'Женщинам' },
  { to: 'children', title: 'Детям' },
];

type TMidbarHeaderProps = {
  className?: string;
};
function MidbarHeader({ className = '' }: TMidbarHeaderProps): JSX.Element {
  const { isLessTablet } = useScreenWidth();
  return (
    <div className={['midbar-header', className].filter(Boolean).join(' ')}>
      <div className="midbar-header__container">
        <nav className="midbar-header__nav">
          <ListLinks
            linkAs="NavLink"
            listProps={{
              className: 'midbar-header__categories switchable-menu',
            }}
            itemProps={{ className: 'switchable-menu__item' }}
            linkProps={{ className: 'switchable-menu__link' }}
            linksData={SWITCHABLE_MENU_DATA}
          />

          {isLessTablet && <ToolbarHeader buttons={['burger', 'search']} />}

          <Link to="/" className="midbar-header__logo">
            <img
              src={logo}
              alt="Логотип бренда Boardriders"
              className="midbar-header__logo-img"
              width={242}
              height={50}
            />
          </Link>

          {!isLessTablet ? (
            <ToolbarHeader
              className="midbar-header__right-toolbar"
              buttons={['login', 'favorites', 'cart', 'search']}
            />
          ) : (
            <ToolbarHeader
              className="midbar-header__right-toolbar"
              buttons={['favorites', 'cart']}
            />
          )}
        </nav>
      </div>
    </div>
  );
}

export default MidbarHeader;
