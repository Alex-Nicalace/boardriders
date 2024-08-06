import { Link } from 'react-router-dom';

import './MidbarHeader.scss';
import logo from '../../../assets/icons/logo.png';
import { useScreenWidth } from '../../../Context/useScreenWidthContext';
import ToolbarHeader from './ToolbarHeader';
import GenderCategoryNavContainer from '../../../features/categories/GenderCategoryNavContainer';

type TMidbarHeaderProps = {
  className?: string;
};
function MidbarHeader({ className }: TMidbarHeaderProps): JSX.Element {
  const { isLessTablet } = useScreenWidth();

  return (
    <div className={['midbar-header', className].filter(Boolean).join(' ')}>
      <div className="midbar-header__container">
        <nav className="midbar-header__nav">
          <GenderCategoryNavContainer className="midbar-header__categories" />

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
