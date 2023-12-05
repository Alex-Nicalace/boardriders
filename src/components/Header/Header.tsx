import { useState } from 'react';

import { LocationIcon, PayLocation, Refund, TrackIcon } from '../ui/Icons';
import Select from '../ui/Select';
import Option from '../ui/Option';

import './header.scss';
import MediaQuery from '../ui/MediaQuery';

// interface IHeaderProps {}
function Header(): JSX.Element {
  const [city, setCity] = useState('Москва');

  function handleChangeCity(value: string) {
    setCity(value);
  }

  return (
    <header className="header">
      <div className="header__topbar topbar-header">
        <div className="topbar-header__container">
          <div className="topbar-header__delivery-region delivery-region">
            <label htmlFor="delivery-region" className="delivery-region__label">
              <LocationIcon className="delivery-region__icon" />
              <span className="delivery-region__text">
                Ваш регион доставки:
              </span>
            </label>
            <Select
              className="delivery-region__select"
              name="delivery-region"
              id="delivery-region"
              value={city}
              onChange={handleChangeCity}
            >
              <Option value="Москва">Москва</Option>
              <Option value="Санкт-Петербург">Санкт-Петербург</Option>
              <Option value="Пенза">Пенза</Option>
            </Select>
          </div>
          <nav className="topbar-header__nav nav-topbar-header">
            <ul className="nav-topbar-header__list">
              <li className="nav-topbar-header__item">
                <a href="/" className="nav-topbar-header__link">
                  Магазины
                </a>
              </li>
              <li className="nav-topbar-header__item">
                <a href="/" className="nav-topbar-header__link">
                  Помощь
                </a>
              </li>
              <li className="nav-topbar-header__item">
                <a href="/" className="nav-topbar-header__link">
                  Блоги
                </a>
              </li>
            </ul>
          </nav>
          <MediaQuery minWidth={1210}>
            <ul className="topbar-header__advantages advantages-topbar-header">
              <li className="advantages-topbar-header__item">
                <TrackIcon
                  className="advantages-topbar-header__icon"
                  height={20}
                />
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
                <Refund className="advantages-topbar-header__icon" />
                <span className="advantages-topbar-header__text">
                  Возврат в течение 14 дней
                </span>
              </li>
            </ul>
          </MediaQuery>
        </div>
      </div>
    </header>
  );
}

export default Header;
