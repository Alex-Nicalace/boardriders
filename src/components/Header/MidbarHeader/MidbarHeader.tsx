import { Link } from 'react-router-dom';

import './MidbarHeader.scss';
import logo from '../../../assets/icons/logo.png';
import ListLinks from '../../../component-library/ListLinks';
import BurgerButton from '../../ui/BurgerButton';
import MediaQuery from '../../../component-library/MediaQuery';
import Search from '../Search';
import IconButton from '../../ui/IconButton';
import { AvatarIcon, CartIcon, StarIcon } from '../../ui/Icons';

const SWITCHABLE_MENU_DATA = [
  { to: 'man', title: 'Мужчинам' },
  { to: 'woman', title: 'Женщинам' },
  { to: 'children', title: 'Детям' },
];

type TMidbarHeaderProps = {
  className?: string;
};
function MidbarHeader({ className = '' }: TMidbarHeaderProps): JSX.Element {
  return (
    <div className={`midbar-header ${className}`}>
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

          <MediaQuery maxWidth="tablet">
            <ul className="toolbar-header">
              <li className="toolbar-header__item">
                <BurgerButton />
              </li>
              <li className="toolbar-header__item">
                <Search className="midbar-header__search" />
              </li>
            </ul>
          </MediaQuery>

          <Link to="/" className="midbar-header__logo">
            <img
              src={logo}
              alt="Логотип бренда Boardriders"
              className="midbar-header__logo-img"
              width={242}
              height={50}
            />
          </Link>
          <ul className="midbar-header__right-toolbar toolbar-header">
            <MediaQuery minWidth="tablet">
              <li className="toolbar-header__item">
                <IconButton IconComponent={AvatarIcon} to="/">
                  Войти
                </IconButton>
              </li>
            </MediaQuery>
            <li className="toolbar-header__item">
              <IconButton
                className="midbar-header__link"
                IconComponent={StarIcon}
                to="/"
              >
                Избранное
              </IconButton>
            </li>
            <li className="toolbar-header__item">
              <IconButton
                className="midbar-header__link"
                IconComponent={CartIcon}
                to="/"
              >
                Корзина
              </IconButton>
            </li>
            <MediaQuery minWidth="tablet">
              <li className="toolbar-header__item">
                <Search />
              </li>
            </MediaQuery>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MidbarHeader;
