import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './Button.scss';

type TCustomProps = {
  variant?: 'contained' | 'outlined';
  type?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

type TCuctomButtonProps = TCustomProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
type TCuctomLinkProps = TCustomProps & LinkProps;

type TButtonProps = TCuctomButtonProps | TCuctomLinkProps;

function isCuctomLinkProps(obj: any): obj is TCuctomLinkProps {
  return 'to' in obj;
}

function Button(props: TButtonProps): JSX.Element {
  const {
    children,
    variant = 'contained',
    type = 'primary',
    className = '',
    fullWidth = false,
  } = props;
  const classNameValue = `${className} button-${type} button-${type}_${variant} ${
    fullWidth ? `button-${type}_fullwidth` : ''
  }`;

  if (isCuctomLinkProps(props)) {
    return (
      <Link className={classNameValue} to={props.to} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNameValue}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}

export default Button;
