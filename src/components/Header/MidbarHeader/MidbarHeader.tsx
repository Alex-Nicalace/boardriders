import './MidbarHeader.scss';
import { useScreenWidth } from '../../../Context/useScreenWidthContext';
import ToolbarHeader from './ToolbarHeader';
import GenderCategoryNavContainer from '../../../features/categories/GenderCategoryNavContainer';
import Logo from '../../Logo';

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

          <Logo className="midbar-header__logo" />

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
