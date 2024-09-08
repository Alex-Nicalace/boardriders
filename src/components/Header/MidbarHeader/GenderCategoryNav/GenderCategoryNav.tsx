import { NavLink } from 'react-router-dom';
import ListLinks from '../../../../component-library/ListLinks';
import './GenderCategoryNav.scss';
import { TGenderCategoryNavProps } from './GenderCategoryNav.types';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { updateGender } from '../../../../features/gender/genderSlice';

function GenderCategoryNav({
  className,
  data,
  activeCategoryGender,
}: TGenderCategoryNavProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleClick(to: string) {
    dispatch(updateGender(to));
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
