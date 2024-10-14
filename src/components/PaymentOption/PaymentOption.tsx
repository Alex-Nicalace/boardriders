import { useForm } from 'react-hook-form';
import PayCard from '../PayCard';
import Button from '../ui/Button';
import RadioBox from '../ui/RadioBox';
import './PaymentOption.scss';
import { TPaymentInput, TPaymentOptionProps } from './PaymentOption.types';

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
    value: 'cash',
  },
  {
    name: 'Картой на сайте',
    hint: <PaymentCards />,
    value: 'card',
  },
];

function PaymentOption({ className }: TPaymentOptionProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPaymentInput>();

  function onSubmit(data: TPaymentInput) {
    console.log(data);
  }

  return (
    <form
      className={['payment-option', className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ul className="payment-option__list">
        {PAYMENT_METHOD.map(({ name, hint, value }) => (
          <li key={name} className="payment-option__item">
            <RadioBox
              className="payment-option__radio"
              view="grid"
              value={value}
              {...register('payment', { required: 'Укажите способ оплаты' })}
            >
              <RadioBox.Title>{name}</RadioBox.Title>
              <RadioBox.Hint>{hint}</RadioBox.Hint>
            </RadioBox>
          </li>
        ))}
      </ul>
      {errors.payment && (
        <div className="payment-option__error">{errors.payment.message}</div>
      )}
      <div className="payment-option__btn">
        <Button fullWidth>Продолжить</Button>
      </div>
    </form>
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
