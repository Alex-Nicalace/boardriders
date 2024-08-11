import Breadcrumbs, { TBreadcrumbsData } from '../ui/Breadcrumbs';
import './PromoBlock.scss';

const BREADCRUMBS: TBreadcrumbsData = [
  {
    to: '/',
    title: 'Главная',
  },
  {
    to: '/catalog/man',
    title: 'Мужчинам',
  },
  {
    // to: '/catalog/man/snowboard',
    title: 'Сноуборд',
  },
];

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
        <Breadcrumbs
          className="promo-block__breadcrumbs"
          data={BREADCRUMBS}
          color="white"
        />
        {children}
      </div>
    </div>
  );
}

export default PromoBlock;
