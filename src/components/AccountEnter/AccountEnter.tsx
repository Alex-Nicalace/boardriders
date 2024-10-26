import { Link } from 'react-router-dom';
import './AccountEnter.scss';
import Button from '../ui/Button';
import { TAccountEnterProps } from './AccountEnter.types';

function AccountEnter({
  className,
  name,
  onExit,
  onClickGreeting,
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
            to="#register"
          >
            Зарегистрироваться
          </Button>
        </>
      )}
      {name && (
        <div className="account-enter__info">
          <Link
            className="account-enter__greeting"
            to="/account"
            onClick={onClickGreeting}
          >
            Здравствуйте, {name}
          </Link>
          <button className="account-enter__btn-exit" onClick={onExit}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountEnter;
