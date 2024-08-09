import PromoBlock from '../PromoBlock';
import Title from '../ui/Title';
import './AboutBrand.scss';

type TAboutBrandProps = {
  className?: string;
  backgroundImage: string;
  brandIcon: string;
  brandName: string;
  text: string;
};
function AboutBrand({
  className,
  backgroundImage,
  brandIcon,
  brandName,
  text,
}: TAboutBrandProps): JSX.Element {
  return (
    <PromoBlock className={className} backgroundImage={backgroundImage}>
      <div className="about-brand">
        <Title className="about-brand__title" as="h1" kind="h1-32-h2-21">
          <img src={brandIcon} alt="иконка бренда" />
          <span>{brandName}</span>
        </Title>
        <p className="about-brand__text">{text}</p>
      </div>
    </PromoBlock>
  );
}

export default AboutBrand;
