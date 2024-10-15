import PayCard from '../PayCard';
import { TPaymentOptionProps } from './PaymentOption.types';
import { PAYCARDS } from './paymentOptionConfig';

function PaymentCards({ className }: TPaymentOptionProps): JSX.Element {
  return (
    <ul
      className={['payment-option__pay-cards', className]
        .filter(Boolean)
        .join(' ')}
    >
      {PAYCARDS.map((type) => (
        <li key={type} className="payment-option__pay-card">
          <PayCard type={type} />
        </li>
      ))}
    </ul>
  );
}

export default PaymentCards;
