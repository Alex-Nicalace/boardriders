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
};
function Breadcrumbs({ data }: TBreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ListLinks
        linksData={data}
        renderToItem={({ to, title }) =>
          to ? <Link to={to}>{title}</Link> : <span>{title}</span>
        }
        listProps={{ className: 'breadcrumbs__list' }}
        itemProps={{ className: 'breadcrumbs__item' }}
      />
    </nav>
  );
}

export default Breadcrumbs;
