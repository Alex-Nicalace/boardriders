import { useEffect, useState } from 'react';
import './BurgerMenu.scss';
import { MENU_DATA } from '../../../data/menuData';
import ListLinks from '../../../component-library/ListLinks';
import Submenu from '../MainMenu/Submenu';
import { ArrowLeftIcon } from '../../ui/Icons';
import Button from '../../ui/Button';
import DeliveryRegion from '../DeliveryRegion';
import SecondaryLinks from '../SecondaryLinks';
import ButtonMenu from '../../ui/ButtonMenu';

function BurgerMenu() {
  const [expandedMenu, setExpandedMenu] = useState('');
  const expandedMenuData = MENU_DATA.find(
    (item) => item.title === expandedMenu
  );

  useEffect(function addClassToDocument() {
    document.documentElement.classList.add('menu-open');

    return () => document.documentElement.classList.remove('menu-open');
  }, []);

  return (
    <div className="burger-menu">
      <nav
        className={`burger-menu__nav ${
          expandedMenu ? 'burger-menu__nav_shifted' : ''
        }`}
      >
        <ListLinks
          linksData={MENU_DATA}
          listProps={{ className: 'burger-menu__menu' }}
          itemProps={{ className: 'burger-menu__item' }}
          renderToItem={(value) => {
            return (
              <>
                {value.submenu ? (
                  <ButtonMenu
                    active={expandedMenu === value.title}
                    onClick={() => setExpandedMenu(value.title)}
                    withArrow
                  >
                    {value.title}
                  </ButtonMenu>
                ) : (
                  <ButtonMenu to={value.to}>{value.title}</ButtonMenu>
                )}
              </>
            );
          }}
        />
        {expandedMenuData && expandedMenuData.submenu && (
          <div className="burger-menu__submenu">
            <button
              className="burger-menu__btn-back"
              onClick={() => setExpandedMenu('')}
            >
              <span>
                <ArrowLeftIcon />
              </span>
              <span>{expandedMenuData.title}</span>
            </button>
            <Submenu
              sections={expandedMenuData.submenu.sections}
              imgLinkData={expandedMenuData.submenu.imgLinkData}
              mode="mobile"
              isUsingContainer={false}
              isRenderImgLink={false}
            />
          </div>
        )}
      </nav>
      <footer className="burger-menu__footer">
        <div className="burger-menu__account account">
          <div className="account__title">Личный кабинет</div>
          <Button className="account__btn" fullWidth>
            Войти
          </Button>
          <Button className="account__btn" variant="outlined" fullWidth>
            Зарегистрироваться
          </Button>
        </div>
        <DeliveryRegion className="burger-menu__delivery-region" />
        <SecondaryLinks className="burger-menu__secondary-links" />
      </footer>
    </div>
  );
}

export default BurgerMenu;
