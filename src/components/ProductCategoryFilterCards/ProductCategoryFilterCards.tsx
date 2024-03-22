import Container from '../Container';
import Steps from '../ui/Steps';
import Title from '../ui/Title';

// type TProductCategoryFilterCardsProps = {}
function ProductCategoryFilterCards(/*{ }: TProductCategoryFilterCardsProps*/): JSX.Element {
  return (
    <Container>
      <Title as="h2" kind="h1-32-h2-21" supNode="358">
        Сноуборд
      </Title>
      <Steps />
    </Container>
  );
}

export default ProductCategoryFilterCards;
