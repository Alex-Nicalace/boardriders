import './PayCard.scss';
import maestro from '../../assets/icons/pay-cards/maestro.png';
import mastercard from '../../assets/icons/pay-cards/mastercard.png';
import visa from '../../assets/icons/pay-cards/visa.png';
import mir from '../../assets/icons/pay-cards/mir.png';

const PAY_CARDS = {
  maestro,
  mastercard,
  visa,
  mir,
};

type TPayCardProps = {
  type: 'mastercard' | 'visa' | 'maestro' | 'mir';
};
function PayCard({ type }: TPayCardProps): JSX.Element {
  return (
    <span className="pay-card">
      <img className="pay-card__img" src={PAY_CARDS[type]} alt={type} />
    </span>
  );
}

export default PayCard;
