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
  withContainer?: boolean;
};
function Breadcrumbs({
  data,
  color,
  className = '',
  withContainer = false,
}: TBreadcrumbsProps): JSX.Element {
  const modificator = color === 'white' ? 'breadcrumbs_white' : '';
  return (
    <nav
      className={`breadcrumbs ${modificator} ${
        withContainer ? 'breadcrumbs__container' : ''
      } ${className}`}
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
    </nav>
  );
}

export default Breadcrumbs;
