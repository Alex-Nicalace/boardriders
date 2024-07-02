import Button from '../ui/Button';
import { BagIcon } from '../ui/Icons';
import Title from '../ui/Title';
import './OrdersEmpty.scss';

type TOrderEmptyProps = {
  className?: string;
};
function OrderEmpty({ className }: TOrderEmptyProps): JSX.Element {
  return (
    <div className={['order-empty', className].filter(Boolean).join(' ')}>
      <Title className="order-empty__title" as="h1" kind="h2-21-16">
        У вас пока нет покупок
      </Title>
      <BagIcon className="order-empty__icon" />
      <Button className="order-empty__btn" color="secondary" to="#" fullWidth>
        Перейти к покупкам
      </Button>
    </div>
  );
}

export default OrderEmpty;
