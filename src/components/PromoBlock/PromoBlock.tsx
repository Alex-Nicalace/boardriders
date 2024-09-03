import BreadcrumbsContainer from '../../features/categories/BreadcrumbsContainer';
import './PromoBlock.scss';

type TPromoBlockProps = {
  children: React.ReactNode;
  backgroundImage?: string;
  className?: string;
};
function PromoBlock({
  children,
  backgroundImage,
  className,
}: TPromoBlockProps): JSX.Element {
  return (
    <div className={['promo-block', className].filter(Boolean).join(' ')}>
      {!!backgroundImage && (
        <img
          className="promo-block__background"
          src={backgroundImage}
          alt="фоновое изображение"
        />
      )}
      <div className="promo-block__container">
        <BreadcrumbsContainer
          className="promo-block__breadcrumbs"
          color="white"
        />
        {children}
      </div>
    </div>
  );
}

export default PromoBlock;
