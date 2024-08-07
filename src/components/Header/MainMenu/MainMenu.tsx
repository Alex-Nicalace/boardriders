import { useState } from 'react';
import { TMainMenuProps } from './MainMenu.types';
import ListLinks from '../../../component-library/ListLinks';
import Submenu from './Submenu';
import './MainMenu.scss';

function MainMenu({ className, data }: TMainMenuProps): JSX.Element {
  const [itemMenuHover, setItemMenuHover] = useState('');

  return (
    <div className={['main-menu', className].filter(Boolean).join(' ')}>
      <div className="main-menu__container">
        <nav className="main-menu__nav">
          <ListLinks
            linkAs="Link"
            listProps={{ className: 'main-menu__menu' }}
            itemProps={{ className: 'main-menu__item' }}
            linkProps={{
              className: 'main-menu__link',
            }}
            linksData={data}
            onMouseEnterItem={(data) => {
              setItemMenuHover(data.title);
            }}
            onMouseLeaveItem={() => setItemMenuHover('')}
            renderToItem={(value) => {
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
              return value.isAccented ? 'submenu__link_red' : '';
            }}
          />
        </nav>
      </div>
    </div>
  );
}

export default MainMenu;
