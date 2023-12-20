import { Link, NavLink } from 'react-router-dom';
import { MenuItem } from './MenuItem';
import { LinkNative } from './LinkNative';

export interface IMenuItemData {
  title: string;
  to: string;
  classNameItem?: string;
  classNameLink?: string;
  submenuElement?: React.ReactNode;
}

interface IMenuProps {
  items: IMenuItemData[];
  classNameList?: string;
  classNameItem?: string;
  classNameLink?: string;
  linkAs?: 'a' | 'Link' | 'NavLink';
}

function Menu({
  items,
  classNameList = '',
  classNameItem = '',
  classNameLink = '',
  linkAs = 'Link',
}: IMenuProps): JSX.Element {
  const LinkComponent =
    linkAs === 'a' ? LinkNative : linkAs === 'Link' ? Link : NavLink;
  return (
    <ul className={classNameList}>
      {items.map((item) => (
        <MenuItem
          classNameItem={`${classNameItem} ${item.classNameItem || ''}`}
          submenuElement={item.submenuElement}
          key={item.title}
        >
          <LinkComponent
            to={item.to}
            className={`${classNameLink} ${item.classNameLink || ''}`}
          >
            {item.title}
          </LinkComponent>
        </MenuItem>
      ))}
    </ul>
  );
}

export default Menu;
