import { useState } from 'react';

import './MainMenu.scss';
import { MENU_DATA, isIMenuData } from '../../../data/menuData';
import ListLinks from '../../../component-library/ListLinks';
import Submenu from './Submenu';

// interface IMainMenuProps {}

function MainMenu(): JSX.Element {
  const [itemMenuHover, setItemMenuHover] = useState('');

  return (
    <div className="header__botbar botbar-header">
      <div className="botbar-header__container">
        <nav className="botbar-header__nav">
          <ListLinks
            linkAs="Link"
            listProps={{ className: 'botbar-header__menu' }}
            itemProps={{ className: 'botbar-header__item' }}
            linkProps={{
              className: 'botbar-header__link',
            }}
            linksData={MENU_DATA}
            onMouseEnterItem={(data) => {
              if (!isIMenuData(data)) return;
              setItemMenuHover(data.title);
            }}
            onMouseLeaveItem={() => setItemMenuHover('')}
            renderToItem={(value) => {
              if (!isIMenuData(value)) return;
              if (itemMenuHover !== value.title) return;
              return (
                <>
                  {value.submenu && (
                    <Submenu
                      sections={value.submenu.sections}
                      imgLinkData={value.submenu.imgLinkData}
                    />
                  )}
                </>
              );
            }}
            getClassNameLink={(value) => {
              if (!isIMenuData(value)) return '';
              return value.isAccented ? 'submenu__link_red' : '';
            }}
          />
        </nav>
      </div>
    </div>
  );
}

export default MainMenu;
