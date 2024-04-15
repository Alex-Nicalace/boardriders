import { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';

export interface ILink {
  to: string;
  title: string;
}
type TListLinksProps<T> = (
  | ((
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
    ) & {
      linksData: T extends ILink ? T[] : never;
    })
  | {
      linkAs?: undefined;
      linkProps?: never;
      linksData: T extends Pick<ILink, 'title'> ? T[] : never;
    }
) & {
  listProps?: HTMLAttributes<HTMLUListElement>;
  itemProps?: HTMLAttributes<HTMLLIElement>;
  getClassNameItem?: (value: T) => string;
  getClassNameLink?: (value: T) => string;
  bemBlockName?: string;
  renderToItem?: (value: T) => React.ReactNode;
  onMouseEnterItem?: (
    data: T,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  onMouseLeaveItem?: (
    data: T,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  onMouseEnterItemInner?: (
    data: T,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  onMouseLeaveItemInner?: (
    data: T,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
};

function ListLinks<T>(props: TListLinksProps<T>): JSX.Element {
  const {
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
  const LinkElement =
    props.linkAs === 'NavLink'
      ? NavLink
      : props.linkAs === 'Link'
      ? Link
      : LinkNative;

  return (
    <ul
      {...listProps}
      className={`${listProps?.className || ''} ${bemBlockName || ''}`}
    >
      {props.linkAs &&
        props.linksData.map((linkData) => (
          <li
            key={linkData.title}
            {...itemProps}
            onMouseEnter={(e) => onMouseEnterItem(linkData, e)}
            onMouseLeave={(e) => onMouseLeaveItem(linkData, e)}
            className={`${itemProps?.className || ''} ${
              bemBlockName ? bemBlockName + '__item' : ''
            } ${getClassNameItem(linkData)}`}
          >
            <LinkElement
              {...props.linkProps}
              onMouseEnter={(e) => onMouseEnterItemInner(linkData, e)}
              onMouseLeave={(e) => onMouseLeaveItemInner(linkData, e)}
              to={linkData.to}
              className={`${props.linkProps?.className || ''} ${
                bemBlockName ? bemBlockName + '__link' : ''
              } ${getClassNameLink(linkData)}`}
            >
              {linkData.title}
            </LinkElement>
            {renderToItem(linkData)}
          </li>
        ))}
      {!props.linkAs &&
        props.linksData.map((linkData) => (
          <li
            key={linkData.title}
            {...itemProps}
            onMouseEnter={(e) => onMouseEnterItem(linkData, e)}
            onMouseLeave={(e) => onMouseLeaveItem(linkData, e)}
            className={`${itemProps?.className || ''} ${
              bemBlockName ? bemBlockName + '__item' : ''
            } ${getClassNameItem(linkData)}`}
          >
            {renderToItem(linkData)}
          </li>
        ))}
    </ul>
  );
}

function LinkNative({
  children,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to?: string }) {
  return (
    <a {...props} href={props.to}>
      {children}
    </a>
  );
}

export default ListLinks;
