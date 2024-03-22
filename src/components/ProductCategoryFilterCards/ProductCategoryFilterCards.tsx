import Container from '../Container';
import Steps from '../ui/Steps';
import Title from '../ui/Title';

type TProductCategoryFilterCardsProps = { className?: string };
function ProductCategoryFilterCards({
  className = '',
}: TProductCategoryFilterCardsProps): JSX.Element {
  return (
    <div className={`product-category-filter-cards ${className}`}>
      <Container>
        <Title as="h2" kind="h1-32-h2-21" supNode="358">
          Сноуборд
        </Title>
        <Steps />
      </Container>
    </div>
  );
}

export default ProductCategoryFilterCards;
