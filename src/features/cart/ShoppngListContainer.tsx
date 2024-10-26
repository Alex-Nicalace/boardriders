import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import ShoppngList from '../../components/ShoppngList';
import Spinner from '../../components/Spinner';
import { getDeclension } from '../../utils/getDeclension';
import { useCartStat } from './useCartStat';

type TShoppngListContainerProps = {
  limitListCount?: number;
};
function ShoppngListContainer({
  limitListCount = 5,
}: TShoppngListContainerProps): JSX.Element {
  const { products, isLoading, error } = useCartStat();

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!products?.length)
    return <Empty description="Корзина не содержит товаров" />;

  return (
    <ShoppngList
      data={products}
      limitListCount={limitListCount}
      render={(item) => `${item.name} x ${item.quantity}`}
    />
  );
}

function Quantity() {
  const { quantityTotal } = useCartStat(false);

  if (!quantityTotal) return null;

  return (
    <span>{getDeclension(quantityTotal, 'товар', 'товара', 'товаров')}</span>
  );
}

ShoppngListContainer.Quantity = Quantity;

export default ShoppngListContainer;
