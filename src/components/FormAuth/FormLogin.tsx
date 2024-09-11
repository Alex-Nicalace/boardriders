import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './FormAuth.scss';
import Checkbox from '../ui/Checkbox';
import InputPasword from '../ui/InputPasword';
import InputStyled from '../ui/InputStyled';
import Button from '../ui/Button';
import { MSG_REQUIRED } from './constants';

// Задаем типы входных данных для формы
type TInputsLogin = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type TFormLoginProps = {
  className?: string;
  withTitle?: boolean;
};
function FormLogin({ className, withTitle }: TFormLoginProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputsLogin>();

  // Обработчик события отправки формы
  const onSubmit: SubmitHandler<TInputsLogin> = (data) => console.log(data);

  return (
    <form
      className={['form-auth', className].filter(Boolean).join(' ')}
      name="login"
      onSubmit={handleSubmit(onSubmit)}
    >
      {withTitle && <h1 className="form-auth__title">Вход</h1>}

      <InputStyled
        className="form-auth__input"
        label="Номер телефона или email"
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
      <InputPasword
        className="form-auth__input"
        label="Пароль"
        isGrayLabel
        fullWidth
        error={errors.password?.message}
        {...register('password', {
          required: MSG_REQUIRED,
        })}
      />
      <div className="form-auth__checkbox">
        <Checkbox
          variantIcon="square"
          label="Запомнить меня"
          hint={errors.rememberMe?.message}
          isError={!!errors.rememberMe}
          {...register('rememberMe', { required: MSG_REQUIRED })}
        />
        <Link className="form-auth__link" to="#">
          Забыли пароль?
        </Link>
      </div>

      <div className="form-auth__btn">
        <Button variant="contained" fullWidth>
          Войти
        </Button>
      </div>
    </form>
  );
}

export default FormLogin;
