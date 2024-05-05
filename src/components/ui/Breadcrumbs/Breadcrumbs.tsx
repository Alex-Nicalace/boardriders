import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import ListLinks from '../../../component-library/ListLinks';

interface ITst {
  to?: string;
  title: string;
}
export type TBreadcrumbsData = [...Required<ITst>[], ITst];

type TBreadcrumbsProps = {
  data: TBreadcrumbsData;
  color?: 'black' | 'white';
  className?: string;
  modificator?: 'independent';
};
function Breadcrumbs({
  data,
  color,
  className = '',
  modificator,
}: TBreadcrumbsProps): JSX.Element {
  const classes = [
    color === 'white' && 'breadcrumbs_white',
    modificator === 'independent' && 'breadcrumbs_independent',
  ]
    .filter((v) => v)
    .join(' ');

  return (
    <nav className={`breadcrumbs ${classes} ${className}`}>
      <div
        className={
          modificator === 'independent' ? 'breadcrumbs__container' : undefined
        }
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
