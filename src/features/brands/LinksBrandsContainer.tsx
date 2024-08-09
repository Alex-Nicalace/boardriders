import { useParams } from 'react-router-dom';
import LinksBrands from '../../components/LinksBrands';
import Spinner from '../../components/Spinner';
import { useBrands } from './useBrands';

type TLinksBrandsContainerProps = {
  className?: string;
};
function LinksBrandsContainer({
  className,
}: TLinksBrandsContainerProps): JSX.Element {
  const params = useParams();
  const { categoryGender } = params;
  const { brands, isLoading } = useBrands();

  if (isLoading) {
    return <Spinner />;
  }

  const data = (brands || []).map((item) => ({
    iconUrl: item.iconUrl || '',
    to: `/${categoryGender}/brand/${item.name}/catalog`,
  }));

  return <LinksBrands className={className} data={data} />;
}

export default LinksBrandsContainer;
