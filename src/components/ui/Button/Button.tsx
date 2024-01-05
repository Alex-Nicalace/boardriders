import { Link } from 'react-router-dom';

import './Button.scss';

type ExclusiveProps =
  | {
      to?: string;
      disabled?: never;
    }
  | {
      to?: never;
      disabled?: boolean;
    };

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined';
  type?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
} & ExclusiveProps;

function Button({
  children,
  to,
  disabled,
  variant = 'contained',
  type = 'primary',
  className = '',
  fullWidth = false,
}: ButtonProps): JSX.Element {
  const isLink = !!to;
  const classNameValue = `${className} button-${type} button-${type}_${variant} ${
    fullWidth ? `button-${type}_fullwidth` : ''
  }`;

  if (isLink) {
    return (
      <Link className={classNameValue} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNameValue} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
