import { Link } from 'react-router-dom';
import Checkbox from '../ui/Checkbox';
import InputPasword from '../ui/InputPasword';
import InputStyled from '../ui/InputStyled';
import './FormLogin.scss';
import Button from '../ui/Button';

type TFormLoginProps = {
  className?: string;
  mode?: 'login' | 'registration';
  withTitle?: boolean;
};
function FormLogin({
  className,
  mode = 'login',
  withTitle,
}: TFormLoginProps): JSX.Element {
  return (
    <form
      className={['form-login', className].filter(Boolean).join(' ')}
      name={mode}
    >
      {withTitle && (
        <h1 className="form-login__title">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h1>
      )}

      {mode === 'login' && (
        <>
          <InputStyled
            className="form-login__input"
            name="email"
            label="Номер телефона или email"
            isGrayLabel
            fullWidth
          />
          <InputPasword
            className="form-login__input"
            name="password"
            label="Пароль"
            isGrayLabel
            fullWidth
          />
          <div className="form-login__checkbox">
            <Checkbox variantIcon="square" label="Запомнить меня" />
            <Link className="form-login__link" to="#">
              Забыли пароль?
            </Link>
          </div>
        </>
      )}

      {mode === 'registration' && (
        <>
          <InputStyled
            className="form-login__input"
            name="name"
            label="Имя*"
            isGrayLabel
            fullWidth
            required
          />
          <InputStyled
            className="form-login__input"
            name="email"
            label="Email*"
            isGrayLabel
            fullWidth
            type="email"
            required
          />
          <InputStyled
            className="form-login__input"
            name="phone"
            label="Номер телефона*"
            isGrayLabel
            fullWidth
            required
          />
          <div className="form-login__checkbox">
            <Checkbox
              variantIcon="square"
              label="Вы соглашаетесь с правилами"
            />
          </div>
        </>
      )}

      <div className="form-login__btn">
        <Button variant={mode === 'login' ? 'contained' : 'outlined'} fullWidth>
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </div>
    </form>
  );
}

export default FormLogin;
