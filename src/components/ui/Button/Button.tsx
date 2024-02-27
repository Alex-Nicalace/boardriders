import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './Button.scss';

type TCustomProps = {
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: never;
}
type TButtonOrLink = IButton | LinkProps;

type TButtonProps = TButtonOrLink & TCustomProps;
function isLinkProps(obj: any): obj is LinkProps {
  return 'to' in obj;
}

function Button(props: TButtonProps): JSX.Element {
  const {
    variant = 'contained',
    color = 'primary',
    fullWidth = false,
    ...rest // пропсы характерные для button или Link
  } = props;

  const defaultProps = rest as TButtonOrLink;

  const classNameValue = `${
    defaultProps.className || ''
  } button-${color} button-${color}_${variant} ${
    fullWidth ? `button-${color}_fullwidth` : ''
  }`;

  if (isLinkProps(defaultProps)) {
    return (
      <Link {...defaultProps} className={classNameValue} type="">
        {defaultProps.children}
      </Link>
    );
  }

  return (
    <button className={classNameValue} {...defaultProps}>
      {defaultProps.children}
    </button>
  );
}

export default Button;
