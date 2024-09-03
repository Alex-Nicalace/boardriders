import Breadcrumbs, {
  TBreadcrumbsProps,
} from '../../components/ui/Breadcrumbs';
import { useBreadcrumbsData } from './useBreadcrumbsData';

type TBreadcrumbsContainerProps = Omit<TBreadcrumbsProps, 'data'> & {};
function BreadcrumbsContainer({
  className,
  modificator,
  color,
}: TBreadcrumbsContainerProps): JSX.Element {
  const breadcrumbsData = useBreadcrumbsData();

  return (
    <Breadcrumbs
      color={color}
      className={className}
      modificator={modificator}
      data={breadcrumbsData}
    />
  );
}

export default BreadcrumbsContainer;
