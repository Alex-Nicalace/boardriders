import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import RadioBox from '../ui/RadioBox';
import './PaymentOption.scss';
import { TPaymentInput, TPaymentOptionProps } from './PaymentOption.types';
import { PAYMENT_METHOD } from './paymentOptionConfig';

function PaymentOption({
  className,
  defaultValues,
  onSubmit = () => {},
}: TPaymentOptionProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPaymentInput>({ defaultValues });

  return (
    <form
      className={['payment-option', className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ul className="payment-option__list">
        {PAYMENT_METHOD.map(({ title, hint, value }) => (
          <li key={title} className="payment-option__item">
            <RadioBox
              className="payment-option__radio"
              view="grid"
              value={value}
              {...register('paymentMethod', {
                required: 'Укажите способ оплаты',
              })}
            >
              <RadioBox.Title>{title}</RadioBox.Title>
              <RadioBox.Hint>{hint}</RadioBox.Hint>
            </RadioBox>
          </li>
        ))}
      </ul>
      {errors.paymentMethod && (
        <div className="payment-option__error">
          {errors.paymentMethod.message}
        </div>
      )}
      <div className="payment-option__btn">
        <Button fullWidth>Продолжить</Button>
      </div>
    </form>
  );
}

export default PaymentOption;
