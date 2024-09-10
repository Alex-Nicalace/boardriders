import { Link } from 'react-router-dom';
import './FormAuth.scss';
import Checkbox from '../ui/Checkbox';
import InputPasword from '../ui/InputPasword';
import InputStyled from '../ui/InputStyled';
import Button from '../ui/Button';

type TFormAuthProps = {
  className?: string;
  mode?: 'login' | 'registration';
  withTitle?: boolean;
};
function FormAuth({
  className,
  mode = 'login',
  withTitle,
}: TFormAuthProps): JSX.Element {
  return (
    <form
      className={['form-auth', className].filter(Boolean).join(' ')}
      name={mode}
    >
      {withTitle && (
        <h1 className="form-auth__title">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h1>
      )}

      {mode === 'login' && (
        <>
          <InputStyled
            className="form-auth__input"
            name="email"
            label="Номер телефона или email"
            isGrayLabel
            fullWidth
          />
          <InputPasword
            className="form-auth__input"
            name="password"
            label="Пароль"
            isGrayLabel
            fullWidth
          />
          <div className="form-auth__checkbox">
            <Checkbox variantIcon="square" label="Запомнить меня" />
            <Link className="form-auth__link" to="#">
              Забыли пароль?
            </Link>
          </div>
        </>
      )}

      {mode === 'registration' && (
        <>
          <InputStyled
            className="form-auth__input"
            name="name"
            label="Имя*"
            isGrayLabel
            fullWidth
            required
          />
          <InputStyled
            className="form-auth__input"
            name="email"
            label="Email*"
            isGrayLabel
            fullWidth
            type="email"
            required
          />
          <InputStyled
            className="form-auth__input"
            name="phone"
            label="Номер телефона*"
            isGrayLabel
            fullWidth
            required
          />
          <div className="form-auth__checkbox">
            <Checkbox
              variantIcon="square"
              label="Вы соглашаетесь с правилами"
            />
          </div>
        </>
      )}

      <div className="form-auth__btn">
        <Button variant={mode === 'login' ? 'contained' : 'outlined'} fullWidth>
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </div>
    </form>
  );
}

export default FormAuth;
