import { useState } from 'react';

interface IMenuItem {
  classNameItem?: string;
  submenuElement?: React.ReactNode;
  children?: React.ReactNode;
}
export function MenuItem({
  classNameItem,
  submenuElement,
  children,
}: IMenuItem): JSX.Element {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <li
      className={classNameItem}
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      {children}
      {showSubmenu && submenuElement}
    </li>
  );
}
