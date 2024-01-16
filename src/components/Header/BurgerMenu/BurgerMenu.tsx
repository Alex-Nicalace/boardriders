import { useState } from 'react';
import { Link } from 'react-router-dom';

import './BurgerMenu.scss';
import { MENU_DATA, isIMenuData } from '../../../data/menuData';
import { useBurgerContext } from '../../../hooks/useBurgerContext';
import ListLinks from '../../ListLinks';
import Submenu from '../MainMenu/Submenu';
import { ArrowLeftIcon, ArrowRightIcon } from '../../ui/Icons';
import Button from '../../ui/Button';
import DeliveryRegion from '../DeliveryRegion';
import SecondaryLinks from '../SecondaryLinks';

function BurgerMenu(): JSX.Element {
  const { isOpen } = useBurgerContext();
  const [expandedMenu, setExpandedMenu] = useState('');
  const expandedMenuData = MENU_DATA.find(
    (item) => item.title === expandedMenu
  );

  return (
    <dialog className="burger-menu" open={isOpen}>
      <div className="burger-menu__box">
        <div className="burger-menu__nav-wrap">
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
                if (!isIMenuData(value)) return;
                return (
                  <>
                    {value.submenu ? (
                      <button
                        className={`burger-menu__link ${
                          expandedMenu === value.title
                            ? 'burger-menu__link_active'
                            : ''
                        }`}
                        onClick={() => setExpandedMenu(value.title)}
                      >
                        <span className="burger-menu__title">
                          {value.title}
                        </span>
                        <ArrowRightIcon className="burger-menu__arrow" />
                      </button>
                    ) : (
                      <Link className="burger-menu__link" to={value.to}>
                        {value.title}
                      </Link>
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
                  bemBlockName="burger-submenu"
                  isUsingContainer={false}
                  isRenderImgLink={false}
                />
              </div>
            )}
          </nav>
        </div>
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
    </dialog>
  );
}

export default BurgerMenu;
