import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Cart,
  LocationIcon,
  PayLocation,
  Refund,
  Search,
  Star,
  TrackIcon,
} from '../ui/Icons';
import logo from '../../assets/icons/logo.png';
import Select from '../ui/Select';
import Option from '../ui/Option';

import './Header.scss';
import MediaQuery from '../ui/MediaQuery';
import LinkIcon from '../ui/LinkIcon/LinkIcon';
import Menu from '../ui/Menu/Menu';

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
          <div className="topbar-header__nav nav-topbar-header">
            <ul className="nav-topbar-header__list">
              <li className="nav-topbar-header__item">
                <Link to="#" className="nav-topbar-header__link">
                  Магазины
                </Link>
              </li>
              <li className="nav-topbar-header__item">
                <Link to="#" className="nav-topbar-header__link">
                  Помощь
                </Link>
              </li>
              <li className="nav-topbar-header__item">
                <Link to="#" className="nav-topbar-header__link">
                  Блоги
                </Link>
              </li>
            </ul>
          </div>
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
      <div className="header__midbar midbar-header">
        <div className="midbar-header__container">
          <nav className="midbar-header__nav">
            <Menu
              classNameList="midbar-header__categories switchable-menu"
              classNameItem="switchable-menu__item"
              classNameLink="switchable-menu__link"
              // typeLink="NavLink"
              items={[
                { to: '#', title: 'Мужчинам', className: 'active' },
                { to: '#', title: 'Женщинам' },
                { to: '#', title: 'Детям' },
              ]}
            />
            <Link to="/" className="midbar-header__logo">
              <img
                src={logo}
                alt="Логотип бренда Boardriders"
                className="midbar-header__logo-img"
              />
            </Link>
            <ul className="midbar-header__nav-account">
              <li className="midbar-header__item">
                <LinkIcon
                  className="midbar-header__link"
                  IconComponent={Avatar}
                  to="/"
                >
                  Войти
                </LinkIcon>
              </li>
              <li className="midbar-header__item">
                <LinkIcon
                  className="midbar-header__link"
                  IconComponent={Star}
                  to="/"
                >
                  Избранное
                </LinkIcon>
              </li>
              <li className="midbar-header__item">
                <LinkIcon
                  className="midbar-header__link"
                  IconComponent={Cart}
                  to="/"
                >
                  Корзина
                </LinkIcon>
              </li>
              <li className="midbar-header__item">
                <LinkIcon
                  className="midbar-header__link"
                  IconComponent={Search}
                  to="/"
                >
                  ПОИСК
                </LinkIcon>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="header__botbar botbar-header">
        <div className="botbar-header__container">
          <nav className="botbar-header__nav">
            <Menu
              classNameList="botbar-header__menu"
              classNameItem="botbar-header__item"
              classNameLink="botbar-header__link"
              items={[
                { to: '#', title: 'Новинки' },
                { to: '#', title: 'Сноуборд' },
                { to: '#', title: 'Лыжи' },
                { to: '#', title: 'Скейт' },
                { to: '#', title: 'Лонгборд' },
                { to: '#', title: 'Вейкборд' },
                { to: '#', title: 'Серф' },
                { to: '#', title: 'Sup' },
                { to: '#', title: 'Одежда' },
                { to: '#', title: 'Обувь' },
                { to: '#', title: 'Аксессуары' },
                { to: '#', title: 'Бренды' },
                {
                  to: '#',
                  title: 'Распродажа',
                  className: 'botbar-header__link_red',
                },
              ]}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;