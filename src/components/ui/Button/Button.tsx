import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './Button.scss';

type TCustomProps = {
  variant?: 'contained' | 'outlined' | 'reverse';
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: never;
}
type TButtonOrLink = IButton | LinkProps;

type TButtonProps = TButtonOrLink & TCustomProps;

function Button(props: TButtonProps): JSX.Element {
  const {
    variant = 'contained',
    color = 'primary',
    fullWidth = false,
    ...rest // пропсы характерные для button или Link
  } = props;

  const classNameValue = `${
    rest.className || ''
  } button-${color} button-${color}_${variant} ${
    fullWidth ? `button-${color}_fullwidth` : ''
  }`;

  if (rest.to !== undefined) {
    return (
      <Link {...rest} className={classNameValue} type="">
        {rest.children}
      </Link>
    );
  }

  return (
    <button {...rest} className={classNameValue}>
      {rest.children}
    </button>
  );
}

export default Button;
