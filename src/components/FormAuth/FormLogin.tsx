import { Link } from 'react-router-dom';
import './FormAuth.scss';
import Checkbox from '../ui/Checkbox';
import InputPasword from '../ui/InputPasword';
import InputStyled from '../ui/InputStyled';
import Button from '../ui/Button';

type TFormLoginProps = {
  className?: string;
  withTitle?: boolean;
};
function FormLogin({ className, withTitle }: TFormLoginProps): JSX.Element {
  return (
    <form
      className={['form-auth', className].filter(Boolean).join(' ')}
      name="login"
    >
      {withTitle && <h1 className="form-auth__title">Вход</h1>}

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

      <div className="form-auth__btn">
        <Button variant="contained" fullWidth>
          Войти
        </Button>
      </div>
    </form>
  );
}

export default FormLogin;
