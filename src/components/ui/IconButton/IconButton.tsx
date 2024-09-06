import { Link, LinkProps } from 'react-router-dom';
import './IconButton.scss';
import MediaQuery from '../../../component-library/MediaQuery';
import { ButtonHTMLAttributes } from 'react';

type TIconButtonProps = (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { to?: never })
  | LinkProps
) & {
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  badgeCounter?: number;
};

function IconButton({
  children,
  className = '',
  IconComponent,
  badgeCounter,
  ...props
}: TIconButtonProps): JSX.Element {
  const inner = (
    <>
      <IconComponent className="icon-button__icon" />
      <MediaQuery minWidth="tablet">
        <span className="icon-button__text">{children}</span>
      </MediaQuery>
    </>
  );
  const classes = ['icon-button', className].filter(Boolean).join(' ');

  if (props.to === undefined) {
    return (
      <button
        {...props}
        className={classes}
        type="button"
        data-counter={badgeCounter}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link {...props} className={classes} data-counter={badgeCounter}>
      {inner}
    </Link>
  );
}

export default IconButton;
