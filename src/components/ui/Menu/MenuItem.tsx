import { useState } from 'react';
import { IMenuItemData } from './Menu';
import Submenu from './Submenu';

interface IMenuItemProps {
  classNameItem?: string;
  submenuData?: IMenuItemData['submenu'];
  children?: React.ReactNode;
}
export function MenuItem({
  classNameItem,
  submenuData,
  children,
}: IMenuItemProps): JSX.Element {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <li
      className={classNameItem}
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      {children}
      {showSubmenu && submenuData && (
        <Submenu
          sections={submenuData.sections}
          imgLinkData={submenuData.imgLinkData}
        />
      )}
    </li>
  );
}
