import './AccountEnter.scss';
import Button from '../ui/Button';
import { TAccountEnterProps } from './AccountEnter.types';

function AccountEnter({
  className,
  name,
  onExit,
}: TAccountEnterProps): JSX.Element {
  return (
    <div className={['account-enter', className].filter(Boolean).join(' ')}>
      {!name && (
        <>
          <div className="account-enter__title">Личный кабинет</div>
          <Button className="account-enter__btn" fullWidth to="#login">
            Войти
          </Button>

          <Button
            className="account-enter__btn"
            variant="outlined"
            fullWidth
            to="#login"
          >
            Зарегистрироваться
          </Button>
        </>
      )}
      {name && (
        <div className="account-enter__info">
          <div className="account-enter__greeting">Здравствуйте, {name}</div>
          <button className="account-enter__btn-exit" onClick={onExit}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountEnter;
