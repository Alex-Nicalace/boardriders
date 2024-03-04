import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';

export interface ILink {
  to: string;
  title: string;
}
type TListLinksProps<T> = (
  | {
      linkAs: 'a';
      linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
    }
  | {
      linkAs: 'Link';
      linkProps?: Partial<LinkProps>;
    }
  | {
      linkAs: 'NavLink';
      linkProps?: Partial<NavLinkProps>;
    }
  | {
      linkAs?: undefined;
      linkProps?: never;
    }
) & {
  listProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >;
  itemProps?: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>;
  getClassNameItem?: (value: unknown) => string;
  getClassNameLink?: (value: unknown) => string;
  linksData: T extends ILink ? T[] : never;
  bemBlockName?: string;
  renderToItem?: (value: T) => React.ReactNode;
  onMouseEnterItem?: (
    data: unknown,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  onMouseLeaveItem?: (
    data: unknown,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  onMouseEnterItemInner?: (
    data: unknown,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  onMouseLeaveItemInner?: (
    data: unknown,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
};

function ListLinks<T>(props: TListLinksProps<T>): JSX.Element {
  const {
    linksData,
    listProps,
    itemProps,
    getClassNameItem = () => '',
    getClassNameLink = () => '',
    bemBlockName,
    renderToItem = () => '',
    onMouseEnterItem = () => {},
    onMouseLeaveItem = () => {},
    onMouseEnterItemInner = () => {},
    onMouseLeaveItemInner = () => {},
  } = props;
  return (
    <ul
      {...listProps}
      className={`${listProps?.className || ''} ${bemBlockName || ''}`}
    >
      {linksData.map((linkData) => (
        <li
          key={linkData.title}
          {...itemProps}
          onMouseEnter={(e) => onMouseEnterItem(linkData, e)}
          onMouseLeave={(e) => onMouseLeaveItem(linkData, e)}
          className={`${itemProps?.className || ''} ${
            bemBlockName ? bemBlockName + '__item' : ''
          } ${getClassNameItem(linkData)}`}
        >
          {props.linkAs === 'a' && (
            <a
              {...props.linkProps}
              onMouseEnter={(e) => onMouseEnterItemInner(linkData, e)}
              onMouseLeave={(e) => onMouseLeaveItemInner(linkData, e)}
              href={linkData.to}
              className={`${props.linkProps?.className || ''} ${
                bemBlockName ? bemBlockName + '__link' : ''
              } ${getClassNameLink(linkData)}`}
            >
              {linkData.title}
            </a>
          )}
          {props.linkAs === 'Link' && (
            <Link
              {...props.linkProps}
              onMouseEnter={(e) => onMouseEnterItemInner(linkData, e)}
              onMouseLeave={(e) => onMouseLeaveItemInner(linkData, e)}
              to={linkData.to}
              className={`${props.linkProps?.className || ''} ${
                bemBlockName ? bemBlockName + '__link' : ''
              } ${getClassNameLink(linkData)}`}
            >
              {linkData.title}
            </Link>
          )}
          {props.linkAs === 'NavLink' && (
            <NavLink
              {...props.linkProps}
              onMouseEnter={(e) => onMouseEnterItemInner(linkData, e)}
              onMouseLeave={(e) => onMouseLeaveItemInner(linkData, e)}
              to={linkData.to}
              className={`${props.linkProps?.className || ''} ${
                bemBlockName ? bemBlockName + '__link' : ''
              } ${getClassNameLink(linkData)}`}
            >
              {linkData.title}
            </NavLink>
          )}
          {renderToItem(linkData)}
        </li>
      ))}
    </ul>
  );
}

export default ListLinks;
