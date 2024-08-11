import PromoBlock from '../PromoBlock';
import Title from '../ui/Title';
import './AboutBrand.scss';

type TAboutBrandProps = {
  className?: string;
  data: {
    backgroundImage: string | null;
    brandIcon: string | null;
    brandName: string | null;
    text: string | null;
  };
};
function AboutBrand({ className, data }: TAboutBrandProps) {
  const { backgroundImage, brandIcon, brandName, text } = data;

  if (!brandIcon && !brandName && !text) return null;

  return (
    <PromoBlock className={className} backgroundImage={backgroundImage || ''}>
      <div className="about-brand">
        {(!!brandIcon || !!brandName) && (
          <Title className="about-brand__title" as="h1" kind="h1-32-h2-21">
            {!!brandIcon && <img src={brandIcon} alt="иконка бренда" />}
            {!!brandName && <span>{brandName}</span>}
          </Title>
        )}
        {!!text && <p className="about-brand__text">{text}</p>}
      </div>
    </PromoBlock>
  );
}

export default AboutBrand;
