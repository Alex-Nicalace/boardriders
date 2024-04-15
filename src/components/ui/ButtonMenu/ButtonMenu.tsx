import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../Icons';
import './ButtonMenu.scss';

type ButtonMenuProps = {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  to?: string;
  withArrow?: boolean;
  className?: string;
};
function ButtonMenu({
  children,
  active,
  onClick,
  to,
  withArrow,
  className = '',
}: ButtonMenuProps) {
  const classes = `button-menu ${
    active ? 'button-menu_active' : ''
  } ${className}`;

  const content = (
    <>
      <span className="button-menu__body">{children}</span>
      {withArrow && <ArrowRightIcon className="button-menu__arrow" />}
    </>
  );

  if (to)
    return (
      <Link className={classes} to={to} onClick={onClick}>
        {content}
      </Link>
    );

  return (
    <button className={classes} onClick={onClick}>
      {content}
    </button>
  );
}

export default ButtonMenu;
