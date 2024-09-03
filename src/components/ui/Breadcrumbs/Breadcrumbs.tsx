import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import ListLinks from '../../../component-library/ListLinks';
import { TBreadcrumbsProps } from './Breadcrumbs.types';

function Breadcrumbs({
  data,
  color,
  className,
  modificator,
}: TBreadcrumbsProps): JSX.Element {
  return (
    <nav
      className={[
        'breadcrumbs',
        color === 'white' && 'breadcrumbs_white',
        modificator === 'independent' && 'breadcrumbs_independent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[modificator === 'independent' && 'breadcrumbs__container']
          .filter(Boolean)
          .join(' ')}
      >
        <ListLinks
          linksData={data}
          renderToItem={({ to, title }) =>
            to ? (
              <Link className="breadcrumbs__link" to={to}>
                {title}
              </Link>
            ) : (
              <span className="breadcrumbs__label">{title}</span>
            )
          }
          listProps={{ className: 'breadcrumbs__list' }}
          itemProps={{ className: 'breadcrumbs__item' }}
        />
      </div>
    </nav>
  );
}

export default Breadcrumbs;
