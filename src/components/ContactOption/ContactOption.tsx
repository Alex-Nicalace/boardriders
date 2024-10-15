import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './ContactOption.scss';
import InputStyled from '../ui/InputStyled';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import { TContactsData } from '../../types';
import { MSG_REQUIRED } from '../FormAuth/constants';
import { registerMask } from '../../utils/registerMask';

type TContactOptionProps = {
  defaultValues?: TContactsData;
  onSubmit?: (data: TContactsData) => void;
};
function ContactOption({
  defaultValues,
  onSubmit = () => {},
}: TContactOptionProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TContactsData>({ defaultValues });

  const telMask = '+7 (___) ___-__-__';

  const { onChange, onBlur, onFocus } = registerMask(telMask, {
    setValue: (value) => setValue('phone', value, { shouldValidate: true }),
  });

  return (
    <form className="contact-option" onSubmit={handleSubmit(onSubmit)}>
      <p className="contact-option__invitation">
        Укажите свои данные, чтобы быть в курсе изменений статуса заказа.
        Персональные данные обрабатываются в соответствии с{' '}
        <Link className="contact-option__politicy-link" to="#">
          Политикой обработки персональных данных.
        </Link>
      </p>

      <InputStyled
        className="contact-option__name"
        label="Имя"
        isGrayLabel
        {...register('name', { required: MSG_REQUIRED })}
        error={errors.name?.message}
      />

      <InputStyled
        className="contact-option__phone"
        label="Телефон для SMS уведомлений"
        placeholder={telMask}
        isGrayLabel
        type="tel"
        {...register('phone', {
          required: MSG_REQUIRED,
          onChange,
          onBlur,
          pattern: {
            value: /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
            message: 'Некорректный телефон',
          },
        })}
        onFocus={onFocus as any}
        value={watch('phone') || ''}
        error={errors.phone?.message}
      />

      <InputStyled
        className="contact-option__email"
        label="Email"
        placeholder="Введите ваш Email"
        isGrayLabel
        type="email"
        {...register('email', {
          required: MSG_REQUIRED,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Некорректный email',
          },
        })}
        error={errors.email?.message}
      />
      <div className="contact-option__mailing">
        <Checkbox
          label="Подписаться на рассылку"
          variantIcon="square"
          {...register('isSubscribed')}
        />
      </div>

      <InputStyled
        className="contact-option__comment"
        label="Комментарий к заказу"
        placeholder="Нипишите что - нибудь"
        isGrayLabel
        isTextarea
        {...register('comment')}
      />

      <div className="contact-option__btn-confirm">
        <Button fullWidth>Подтвердить</Button>
      </div>
    </form>
  );
}

export default ContactOption;
