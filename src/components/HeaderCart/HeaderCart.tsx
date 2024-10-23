import { Link } from 'react-router-dom';
import './HeaderCart.scss';
import { ArrowLeftClassic, AvatarIcon } from '../ui/Icons';
import DeliveryRegionContainer from '../../features/delivery/DeliveryRegionContainer';
import Logo from '../Logo';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

type THeaderCartProps = {
  className?: string;
  nameAuthUser?: string;
  onLogout?: () => void;
};
function HeaderCart({
  className,
  nameAuthUser,
  onLogout,
}: THeaderCartProps): JSX.Element {
  const { isLessMobile, isLessTablet } = useScreenWidth();

  return (
    <header className={['header-cart', className].filter(Boolean).join(' ')}>
      <div className="header-cart__container">
        <div className="header-cart__block header-cart__block_left">
          <Link className="header-cart__btn-back header-cart__link" to="/">
            <ArrowLeftClassic className="header-cart__icon-left" />
            {!isLessMobile && (
              <span className="header-cart__text-back">
                Вернуться к покупкам
              </span>
            )}
          </Link>
          {!isLessMobile && (
            <DeliveryRegionContainer
              className="header-cart__delivery"
              label={isLessTablet ? '' : 'Ваш регион:'}
            />
          )}
        </div>

        <Logo className="header-cart__logo" />

        <div className="header-cart__block header-cart__block_right">
          {!nameAuthUser && (
            <>
              <Link
                className="header-cart__login header-cart__link"
                to="#login"
              >
                Войти
              </Link>
              {!isLessMobile && (
                <Link
                  className="header-cart__register header-cart__link"
                  to="#register"
                >
                  Регистрация
                </Link>
              )}
            </>
          )}
          {nameAuthUser && (
            <>
              <Link
                className="header-cart__account header-cart__link"
                to="/account"
              >
                <AvatarIcon className="header-cart__icon-avatar" />
                {!isLessMobile && (
                  <span className="header-cart__name">{nameAuthUser}</span>
                )}
              </Link>
              {!isLessMobile && (
                <button className="header-cart__btn-exit" onClick={onLogout}>
                  Выход
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderCart;
