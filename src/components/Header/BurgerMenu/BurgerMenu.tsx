import { useEffect, useState } from 'react';
import './BurgerMenu.scss';
import ListLinks from '../../../component-library/ListLinks';
import Submenu from '../MainMenu/Submenu';
import { ArrowLeftIcon } from '../../ui/Icons';
import DeliveryRegion from '../DeliveryRegion';
import SecondaryLinks from '../SecondaryLinks';
import ButtonMenu from '../../ui/ButtonMenu';
import { IMenuData } from '../MainMenu';
import AccountEnterContainer from '../../../features/authentication/AccountEnterContainer';

type TBurgerMenuProps = {
  data: IMenuData[];
  close?: () => void;
};
function BurgerMenu({ data, close }: TBurgerMenuProps) {
  const [expandedMenu, setExpandedMenu] = useState('');
  const expandedMenuData = data.find((item) => item.title === expandedMenu);

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
          linksData={data}
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
              close={close}
            />
          </div>
        )}
      </nav>
      <footer className="burger-menu__footer">
        <AccountEnterContainer className="burger-menu__account" />
        <DeliveryRegion className="burger-menu__delivery-region" />
        <SecondaryLinks className="burger-menu__secondary-links" />
      </footer>
    </div>
  );
}

export default BurgerMenu;
