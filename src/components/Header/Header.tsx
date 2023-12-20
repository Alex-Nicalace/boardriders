import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AvatarIcon,
  CartIcon,
  LocationIcon,
  PayLocation,
  RefundIcon,
  StarIcon,
  TrackIcon,
} from '../ui/Icons';
import logo from '../../assets/icons/logo.png';
import Select from '../ui/Select';
import Option from '../ui/Option';
import './Header.scss';
import MediaQuery from '../ui/MediaQuery';
import IconButton from '../ui/IconButton';
import Menu from '../ui/Menu';
import BurgerButton from '../ui/BurgerButton';
import Search from './Search';
import Submenu from '../ui/Menu/Submenu';

// const WIDTH_BREAKPOINT = 414;
// interface IHeaderProps {}
function Header(): JSX.Element {
  const [city, setCity] = useState('Москва');

  function handleChangeCity(value: string) {
    setCity(value);
  }

  return (
    <header className="header">
      <MediaQuery minWidth="tablet">
        <div className="header__topbar topbar-header">
          <div className="topbar-header__container">
            <div className="topbar-header__delivery-region delivery-region">
              <label
                htmlFor="delivery-region"
                className="delivery-region__label"
              >
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
                <RefundIcon className="advantages-topbar-header__icon" />
                <span className="advantages-topbar-header__text">
                  Возврат в течение 14 дней
                </span>
              </li>
            </ul>
          </div>
        </div>
      </MediaQuery>
      <div className="header__midbar midbar-header">
        <div className="midbar-header__container">
          <nav className="midbar-header__nav">
            <Menu
              classNameList="midbar-header__categories switchable-menu"
              classNameItem="switchable-menu__item"
              classNameLink="switchable-menu__link"
              // typeLink="NavLink"
              items={[
                { to: '#', title: 'Мужчинам', classNameLink: 'active' },
                { to: '#', title: 'Женщинам' },
                { to: '#', title: 'Детям' },
              ]}
            />

            <MediaQuery maxWidth="tablet">
              <ul className="toolbar-header">
                <li className="toolbar-header__item">
                  <BurgerButton />
                </li>
                <li className="toolbar-header__item">
                  <Search className="midbar-header__search" />
                </li>
              </ul>
            </MediaQuery>

            <Link to="/" className="midbar-header__logo">
              <img
                src={logo}
                alt="Логотип бренда Boardriders"
                className="midbar-header__logo-img"
                width={242}
                height={50}
              />
            </Link>
            <ul className="midbar-header__right-toolbar toolbar-header">
              <MediaQuery minWidth="tablet">
                <li className="toolbar-header__item">
                  <IconButton IconComponent={AvatarIcon} to="/">
                    Войти
                  </IconButton>
                </li>
              </MediaQuery>
              <li className="toolbar-header__item">
                <IconButton
                  className="midbar-header__link"
                  IconComponent={StarIcon}
                  to="/"
                >
                  Избранное
                </IconButton>
              </li>
              <li className="toolbar-header__item">
                <IconButton
                  className="midbar-header__link"
                  IconComponent={CartIcon}
                  to="/"
                >
                  Корзина
                </IconButton>
              </li>
              <MediaQuery minWidth="tablet">
                <li className="toolbar-header__item">
                  <Search />
                </li>
              </MediaQuery>
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
                {
                  to: '#',
                  title: 'Колекции',
                  submenuElement: (
                    <Submenu
                      sections={[
                        {
                          title: 'Категории',
                          isWideSection: true,
                          links: [
                            {
                              to: '#',
                              title: 'Новая коллекция',
                              classNameItem: 'submenu__item_disk',
                            },
                            { to: '#', title: 'Online Exclusive' },
                            { to: '#', title: 'Billabong Adventure Division' },
                            {
                              to: '#',
                              title: 'Quiksilver Outdoor',
                              classNameItem: 'submenu__item_disk',
                            },
                            { to: '#', title: 'Quiksilver Surf the Mountain' },
                            { to: '#', title: 'Take a chance' },
                            { to: '#', title: 'DC STAR WARS' },
                            { to: '#', title: 'Element Wolfeboro' },
                            {
                              to: '#',
                              title: 'DC Shoes x FTP',
                              classNameItem: 'submenu__item_disk',
                            },
                            { to: '#', title: 'RVCA x Mister Cartoon' },
                            { to: '#', title: 'DC Shoes Deadpool' },
                            { to: '#', title: 'Element x Public Enemy' },
                            { to: '#', title: 'Quiksilver Surfers of Fortune' },
                            { to: '#', title: 'Quiksilver x Saturday NYC' },
                            {
                              to: '#',
                              title: 'Все категории',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                        {
                          title: 'Бренды',
                          links: [
                            { to: '#', title: 'Roxy' },
                            { to: '#', title: 'VONZIPPER' },
                            { to: '#', title: 'RVCA' },
                            { to: '#', title: 'Element' },
                            { to: '#', title: 'Billabong' },
                            { to: '#', title: 'DC Shoes' },
                            { to: '#', title: 'QUIKSILVER' },
                            {
                              to: '#',
                              title: 'Все бренды',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                      ]}
                      imgLinkData={{
                        src: '/img/menu/01.jpg',
                        to: '#',
                        title: 'Название акции',
                      }}
                    />
                  ),
                },
                {
                  to: '#',
                  title: 'Обувь',
                  submenuElement: (
                    <Submenu
                      sections={[
                        {
                          title: 'Категории',
                          isWideSection: true,
                          links: [
                            {
                              to: '#',
                              title: 'Новая коллекция',
                            },
                            {
                              to: '#',
                              title: 'Зимняя обувь',
                            },
                            {
                              to: '#',
                              title: 'Кеды',
                            },
                            {
                              to: '#',
                              title: 'Сланцы и сандалии',
                            },
                            {
                              to: '#',
                              title: 'Слипоны и эспадрильи',
                            },
                            {
                              to: '#',
                              title: 'Все категории',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                        {
                          title: 'Бренды',
                          links: [
                            { to: '#', title: 'Billabong' },
                            { to: '#', title: 'Element' },
                            { to: '#', title: 'QUIKSILVER' },
                            { to: '#', title: 'DC Shoes' },
                            {
                              to: '#',
                              title: 'Все бренды',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                      ]}
                      imgLinkData={{
                        src: '/img/menu/02.jpg',
                        to: '#',
                        title: 'Название акции',
                      }}
                    />
                  ),
                },
                {
                  to: '#',
                  title: 'Одежда',
                  submenuElement: (
                    <Submenu
                      sections={[
                        {
                          title: 'Категории',
                          isWideSection: true,
                          links: [
                            {
                              to: '#',
                              title: 'Новая коллекция',
                            },
                            {
                              to: '#',
                              title: 'Верхняя одежда',
                            },
                            {
                              to: '#',
                              title: 'Толстовки и флис',
                            },
                            {
                              to: '#',
                              title: 'Джинсы',
                            },
                            {
                              to: '#',
                              title: 'Футболки поло и лонгсливы',
                            },
                            {
                              to: '#',
                              title: 'Брюки и джоггеры',
                            },
                            {
                              to: '#',
                              title: 'Рубашки',
                            },
                            {
                              to: '#',
                              title: 'Шорты',
                            },
                            {
                              to: '#',
                              title: 'Нижнее белье',
                            },
                            {
                              to: '#',
                              title: 'Кардиганы свитеры и джемперы',
                            },
                            {
                              to: '#',
                              title: 'Плавки и шорты для плавания',
                            },
                            {
                              to: '#',
                              title: 'Майки',
                            },
                            {
                              to: '#',
                              title: 'Все категории',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                        {
                          title: 'Бренды',
                          links: [
                            { to: '#', title: 'Billabong' },
                            { to: '#', title: 'RVCA' },
                            { to: '#', title: 'Element' },
                            { to: '#', title: 'DC Shoes' },
                            { to: '#', title: 'QUIKSILVER' },
                            {
                              to: '#',
                              title: 'Все бренды',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                      ]}
                      imgLinkData={{
                        src: '/img/menu/03.jpg',
                        to: '#',
                        title: 'Название акции',
                      }}
                    />
                  ),
                },
                {
                  to: '#',
                  title: 'Аксессуары',
                  submenuElement: (
                    <Submenu
                      sections={[
                        {
                          title: 'Категории',
                          isWideSection: true,
                          links: [
                            {
                              to: '#',
                              title: 'Новая коллекция',
                            },
                            {
                              to: '#',
                              title: 'Головные уборы',
                            },
                            {
                              to: '#',
                              title: 'Рюкзаки',
                            },
                            {
                              to: '#',
                              title: 'Солнцезащитные очки"',
                            },
                            {
                              to: '#',
                              title: 'Носки',
                            },
                            {
                              to: '#',
                              title: 'Сумки и чемоданы',
                            },
                            {
                              to: '#',
                              title: 'Кошельки',
                            },
                            {
                              to: '#',
                              title: 'Платки и шарфы',
                            },
                            {
                              to: '#',
                              title: 'Ремни',
                            },
                            {
                              to: '#',
                              title: 'Перчатки и варежки',
                            },
                            {
                              to: '#',
                              title: 'Прочие Аксессуары',
                            },
                            {
                              to: '#',
                              title: 'Все категории',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                        {
                          title: 'Бренды',
                          links: [
                            { to: '#', title: 'Buff' },
                            { to: '#', title: 'Billabong' },
                            { to: '#', title: 'VONZIPPER' },
                            { to: '#', title: 'RVCA' },
                            { to: '#', title: 'Element' },
                            { to: '#', title: 'DC Shoes' },
                            { to: '#', title: 'QUIKSILVER' },
                            {
                              to: '#',
                              title: 'Все бренды',
                              classNameLink: 'submenu__link_red',
                            },
                          ],
                        },
                      ]}
                      imgLinkData={{
                        src: '/img/menu/04.jpg',
                        to: '#',
                        title: 'Название акции',
                      }}
                    />
                  ),
                },
                { to: '#', title: 'Сноуборд' },
                { to: '#', title: 'Фитнес и бег' },
                { to: '#', title: 'Бордшорты' },
                { to: '#', title: 'Серф и вейк' },
                { to: '#', title: 'Скейтборд' },
                {
                  to: '#',
                  title: 'Распродажа',
                  classNameLink: 'botbar-header__link_red',
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
