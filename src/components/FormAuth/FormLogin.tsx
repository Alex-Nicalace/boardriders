import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './FormAuth.scss';
import Checkbox from '../ui/Checkbox';
import InputPasword from '../ui/InputPasword';
import InputStyled from '../ui/InputStyled';
import Button from '../ui/Button';
import { MSG_REQUIRED } from './constants';
import { TFormLoginProps, TInputsLogin } from './FormAuth.types';

function FormLogin({
  className,
  withTitle,
  disabled,
  onSubmit = () => {},
}: TFormLoginProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputsLogin>();

  return (
    <form
      className={['form-auth', className].filter(Boolean).join(' ')}
      name="login"
      onSubmit={handleSubmit(onSubmit)}
    >
      {withTitle && <h1 className="form-auth__title">Вход</h1>}

      <InputStyled
        className="form-auth__input"
        label="Email"
        isGrayLabel
        fullWidth
        type="email"
        error={errors.email?.message}
        disabled={disabled}
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
        disabled={disabled}
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
          disabled={disabled}
          {...register('rememberMe', { required: MSG_REQUIRED })}
        />
        <Link className="form-auth__link" to="#">
          Забыли пароль?
        </Link>
      </div>

      <div className="form-auth__btn">
        <Button variant="contained" fullWidth disabled={disabled}>
          Войти
        </Button>
      </div>
    </form>
  );
}

export default FormLogin;
