import AboutBrand from '../../components/AboutBrand';
import Spinner from '../../components/Spinner';
import { useBrand } from './useBrand';

type TAboutBrandContainerProps = {
  className?: string;
};
function AboutBrandContainer({ className }: TAboutBrandContainerProps) {
  const { brands, isLoading } = useBrand();

  if (isLoading) return <Spinner />;

  if (!brands) return null;

  const data = {
    backgroundImage: brands.bgImgForDescrUrl,
    brandIcon: brands.iconUrl,
    brandName: brands.name,
    text: brands.shortDescription,
  };

  return <AboutBrand className={className} data={data} />;
}

export default AboutBrandContainer;
