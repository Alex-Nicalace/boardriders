import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ArrowRightIcon } from '../Icons';
import './ButtonMenu.scss';

type ButtonMenuProps = (LinkProps | ButtonHTMLAttributes<HTMLButtonElement>) & {
  active?: boolean;
  withArrow?: boolean;
};
function ButtonMenu({
  active,
  withArrow,
  className,
  children,
  ...props
}: ButtonMenuProps) {
  const classes = ['button-menu', active && 'button-menu_active', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="button-menu__body">{children}</span>
      {withArrow && <ArrowRightIcon className="button-menu__arrow" />}
    </>
  );

  if ('to' in props)
    return (
      <Link className={classes} {...props}>
        {content}
      </Link>
    );

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

export default ButtonMenu;
