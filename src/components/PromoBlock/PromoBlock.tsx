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
  const style: React.CSSProperties = {
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
    }),
  };

  return (
    <div
      className={['promo-block', className].filter(Boolean).join(' ')}
      style={style}
    >
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
