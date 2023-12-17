import { Link, NavLink } from 'react-router-dom';

interface IMenuItemData {
  title: string;
  to: string;
  className?: string;
}

interface IMenuProps {
  items: IMenuItemData[];
  classNameList?: string;
  classNameItem?: string;
  classNameLink?: string;
  typeLink?: 'a' | 'Link' | 'NavLink';
}

function Menu({
  items,
  classNameList = '',
  classNameItem = '',
  classNameLink = '',
  typeLink = 'Link',
}: IMenuProps): JSX.Element {
  const LinkComponent =
    typeLink === 'a' ? A : typeLink === 'Link' ? Link : NavLink;
  return (
    <ul className={classNameList}>
      {items.map((item) => (
        <li className={classNameItem} key={item.title}>
          <LinkComponent
            to={item.to}
            className={`${classNameLink} ${item.className}`}
          >
            {item.title}
          </LinkComponent>
        </li>
      ))}
    </ul>
  );
}

export default Menu;

function A({
  children,
  to,
  className,
}: {
  children: React.ReactNode;
  to: string;
  className: string;
}): JSX.Element {
  return (
    <a className={className} href={to}>
      {children}
    </a>
  );
}
