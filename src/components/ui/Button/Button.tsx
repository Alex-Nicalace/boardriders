import { Link, useNavigate } from 'react-router-dom';
import './Button.scss';
import { TButtonProps } from './Button.types';

function Button(props: TButtonProps): JSX.Element {
  const navigate = useNavigate();
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
    <button
      {...rest}
      className={classes}
      onClick={(e) => {
        if (rest.navigateDelta) navigate(rest.navigateDelta);
        rest.onClick?.(e);
      }}
    >
      {rest.children}
    </button>
  );
}

export default Button;
