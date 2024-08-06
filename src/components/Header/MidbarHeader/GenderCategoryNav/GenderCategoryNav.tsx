import { NavLink } from 'react-router-dom';
import ListLinks from '../../../../component-library/ListLinks';
import './GenderCategoryNav.scss';
import { TGenderCategoryNavProps } from './GenderCategoryNav.types';

function GenderCategoryNav({
  className,
  data,
  activeCategoryGender,
}: TGenderCategoryNavProps): JSX.Element {
  function handleClick(to: string) {
    localStorage.setItem('categoryGender', JSON.stringify(to));
  }

  return (
    <ListLinks
      listProps={{
        className: ['gender-category-nav', className].filter(Boolean).join(' '),
      }}
      itemProps={{ className: 'gender-category-nav__item' }}
      linksData={data}
      renderToItem={({ to, title }) => (
        <NavLink
          className={[
            'gender-category-nav__link',
            to === activeCategoryGender && 'active',
          ]
            .filter(Boolean)
            .join(' ')}
          to={to}
          onClick={() => handleClick(to)}
        >
          {title}
        </NavLink>
      )}
    />
  );
}

export default GenderCategoryNav;
