import './OrderPlaced.scss';
import iconImg from '../../assets/img/order-placed/icon.png';
import Title from '../ui/Title';

type TOrderPlacedProps = {
  className?: string;
  numOrder: number;
  email: string;
  phone: string;
  info?: string;
};
function OrderPlaced({
  className,
  numOrder,
  email,
  phone,
  info,
}: TOrderPlacedProps): JSX.Element {
  return (
    <div className={['order-placed', className].filter(Boolean).join(' ')}>
      <Title className="order-placed__title" as="h1" kind="h1-32-16">
        Заказ успешно оформлен!
      </Title>
      <div className="order-placed__icon">
        <img src={iconImg} alt="icon" />
      </div>
      <p className="order-placed__order">
        Ваш заказ{' '}
        <span className="order-placed__order-num">{`№ ${numOrder}`}</span>
      </p>
      <p className="order-placed__info">
        Благодарим вас! <br /> После обработки заявки, мы пришлем вам письмо на{' '}
        <strong>{email}</strong> и СМС на номер{' '}
        <strong className="no-break">{phone}</strong>
      </p>
      {info && <p className="order-placed__comment">{info}</p>}
    </div>
  );
}

export default OrderPlaced;
