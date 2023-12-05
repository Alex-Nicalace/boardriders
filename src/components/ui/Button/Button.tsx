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
} & ExclusiveProps;

function Button({
  children,
  to,
  disabled,
  variant = 'contained',
  type = 'primary',
}: ButtonProps): JSX.Element {
  const isLink = !!to;

  if (isLink) {
    return (
      <Link className="button" to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`button-${type} button-${type}_${variant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
