import { Link } from 'react-router-dom';

import './MidbarHeader.scss';
import logo from '../../../assets/icons/logo.png';
import { useScreenWidth } from '../../../Context/useScreenWidthContext';
import ToolbarHeader from './ToolbarHeader';
import GenderCategoryNav, { TGenderCategoryData } from './GenderCategoryNav';

type TMidbarHeaderProps = {
  className?: string;
  data: {
    genderCategoryData: TGenderCategoryData;
  };
};
function MidbarHeader({ className, data }: TMidbarHeaderProps): JSX.Element {
  const { isLessTablet } = useScreenWidth();
  const { genderCategoryData } = data;

  return (
    <div className={['midbar-header', className].filter(Boolean).join(' ')}>
      <div className="midbar-header__container">
        <nav className="midbar-header__nav">
          <GenderCategoryNav
            className="midbar-header__categories"
            data={genderCategoryData}
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
