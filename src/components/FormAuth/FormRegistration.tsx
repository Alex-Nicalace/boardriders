import { SubmitHandler, useForm } from 'react-hook-form';
import './FormAuth.scss';
import Checkbox from '../ui/Checkbox';
import InputPasword from '../ui/InputPasword';
import InputStyled from '../ui/InputStyled';
import Button from '../ui/Button';
import { MSG_REQUIRED, PASSWORD_MIN_LENGTH } from './constants';

// Задаем типы входных данных для формы
type TInputsRegistartion = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  rulesAgreement: boolean;
};

type TFormRegistrationProps = {
  className?: string;
  withTitle?: boolean;
};
function FormRegistration({
  className,
  withTitle,
}: TFormRegistrationProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputsRegistartion>();

  // Обработчик события отправки формы
  const onSubmit: SubmitHandler<TInputsRegistartion> = (data) =>
    console.log(data);

  return (
    <form
      className={['form-auth', className].filter(Boolean).join(' ')}
      name="registration"
      onSubmit={handleSubmit(onSubmit)}
    >
      {withTitle && <h1 className="form-auth__title">Регистрация</h1>}
      <InputStyled
        className="form-auth__input"
        label="Имя*"
        isGrayLabel
        fullWidth
        error={errors.name?.message}
        {...register('name', {
          required: MSG_REQUIRED,
          minLength: {
            value: 3,
            message: 'Минимальная длина 3 символа',
          },
        })}
      />
      <InputStyled
        className="form-auth__input"
        label="Email*"
        isGrayLabel
        fullWidth
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: MSG_REQUIRED,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Поле заполнено некорректно',
          },
        })}
      />
      {/* <InputStyled
        className="form-auth__input"
        name="phone"
        label="Номер телефона*"
        isGrayLabel
        fullWidth
        required
      /> */}
      <InputPasword
        className="form-auth__input"
        label={`Пароль (мин. ${PASSWORD_MIN_LENGTH} символов)`}
        isGrayLabel
        fullWidth
        error={errors.password?.message}
        {...register('password', {
          required: MSG_REQUIRED,
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: `Мин. длина ${PASSWORD_MIN_LENGTH} символов`,
          },
        })}
      />
      <InputPasword
        className="form-auth__input"
        label="Подтвердите пароль"
        isGrayLabel
        fullWidth
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm', {
          required: MSG_REQUIRED,
          validate: (value, formValues) =>
            value === formValues.password || 'Пароли не совпадают',
        })}
      />
      <div className="form-auth__checkbox">
        <Checkbox
          variantIcon="square"
          label="Вы соглашаетесь с правилами"
          hint={errors.rulesAgreement?.message}
          isError={!!errors.rulesAgreement}
          {...register('rulesAgreement', { required: MSG_REQUIRED })}
        />
      </div>

      <div className="form-auth__btn">
        <Button variant="outlined" fullWidth>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
}

export default FormRegistration;
