import './TopbarHeader.scss';
import { PayLocation, RefundIcon, TrackIcon } from '../../ui/Icons';
import SecondaryLinks from '../SecondaryLinks';
import DeliveryRegionContainer from '../../../features/delivery/DeliveryRegionContainer';

type ITopBarHeaderProps = {
  className?: string;
};

function TopbarHeader({ className = '' }: ITopBarHeaderProps): JSX.Element {
  return (
    <div className={`topbar-header ${className}`}>
      <div className="topbar-header__container">
        <DeliveryRegionContainer className="topbar-header__delivery-region" />
        <SecondaryLinks />
        <ul className="topbar-header__advantages advantages-topbar-header">
          <li className="advantages-topbar-header__item">
            <TrackIcon className="advantages-topbar-header__icon" height={20} />
            <span className="advantages-topbar-header__text">
              Бесплатная доставка *
            </span>
          </li>
          <li className="advantages-topbar-header__item">
            <PayLocation className="advantages-topbar-header__icon" />
            <span className="advantages-topbar-header__text">
              Оплата при получении
            </span>
          </li>
          <li className="advantages-topbar-header__item">
            <RefundIcon className="advantages-topbar-header__icon" />
            <span className="advantages-topbar-header__text">
              Возврат в течение 14 дней
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopbarHeader;
