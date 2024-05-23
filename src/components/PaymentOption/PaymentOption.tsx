import PayCard from '../PayCard';
import Button from '../ui/Button';
import RadioBox from '../ui/RadioBox';
import './PaymentOption.scss';

const PAYCARDS: ['visa', 'mastercard', 'maestro', 'mir'] = [
  'visa',
  'mastercard',
  'maestro',
  'mir',
];

const PAYMENT_METHOD = [
  {
    name: 'При получении',
    hint: 'Наличными или картой при получении',
  },
  {
    name: 'Картой на сайте',
    hint: <PaymentCards />,
  },
];

type TPaymentOptionProps = {
  className?: string;
};
function PaymentOption({ className }: TPaymentOptionProps): JSX.Element {
  return (
    <div className={['payment-option', className].filter(Boolean).join(' ')}>
      <ul className="payment-option__list">
        {PAYMENT_METHOD.map(({ name, hint }) => (
          <li key={name} className="payment-option__item">
            <RadioBox
              className="payment-option__radio"
              name="payment"
              view="grid"
            >
              <RadioBox.Title>{name}</RadioBox.Title>
              <RadioBox.Hint>{hint}</RadioBox.Hint>
            </RadioBox>
          </li>
        ))}
      </ul>
      <div className="payment-option__btn">
        <Button fullWidth>Продолжить</Button>
      </div>
    </div>
  );
}

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

export default PaymentOption;
