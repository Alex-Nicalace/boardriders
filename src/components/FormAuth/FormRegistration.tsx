import './FormAuth.scss';
import Checkbox from '../ui/Checkbox';
import InputPasword from '../ui/InputPasword';
import InputStyled from '../ui/InputStyled';
import Button from '../ui/Button';

type TFormRegistrationProps = {
  className?: string;
  withTitle?: boolean;
};
function FormRegistration({
  className,
  withTitle,
}: TFormRegistrationProps): JSX.Element {
  return (
    <form
      className={['form-auth', className].filter(Boolean).join(' ')}
      name="registration"
    >
      {withTitle && <h1 className="form-auth__title">Регистрация</h1>}

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
        name="password"
        label="Пароль"
        isGrayLabel
        fullWidth
      />
      <InputPasword
        className="form-auth__input"
        name="confirm-password"
        label="Подтвердите пароль"
        isGrayLabel
        fullWidth
      />
      <div className="form-auth__checkbox">
        <Checkbox variantIcon="square" label="Вы соглашаетесь с правилами" />
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
