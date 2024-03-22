import Steps from '../ui/Steps';
import Title from '../ui/Title';
import './ProductCategoryFilterCards.scss';

type TProductCategoryFilterCardsProps = { className?: string };
function ProductCategoryFilterCards({
  className = '',
}: TProductCategoryFilterCardsProps): JSX.Element {
  return (
    <div className={`product-category-filter-cards ${className}`}>
      <div className="product-category-filter-cards__container">
        <Title
          className="product-category-filter-cards__title"
          as="h2"
          kind="h1-32-h2-21"
          supNode="358"
        >
          Сноуборд
        </Title>
        <Steps className="product-category-filter-cards__steps" />
      </div>
    </div>
  );
}

export default ProductCategoryFilterCards;
