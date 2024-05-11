import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './Button.scss';

type TCustomProps = (
  | {
      color?: 'primary';

      nameColor?: never;
    }
  | {
      color: 'secondary';
      nameColor?: 'green';
    }
) & {
  variant?: 'contained' | 'outlined' | 'reverse';
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
    nameColor,
    ...rest // пропсы характерные для button или Link
  } = props;

  const classes = [
    rest.className,
    `button-${color}`,
    `button-${color}_${variant}`,
    fullWidth && `button-${color}_fullwidth`,
    nameColor && `button-${color}_${nameColor}`,
  ]
    .filter(Boolean)
    .join(' ');

  if (rest.to !== undefined) {
    return (
      <Link {...rest} className={classes}>
        {rest.children}
      </Link>
    );
  }

  return (
    <button {...rest} className={classes}>
      {rest.children}
    </button>
  );
}

export default Button;
