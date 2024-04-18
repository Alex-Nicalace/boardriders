import { Link, LinkProps } from 'react-router-dom';
import './IconButton.scss';
import MediaQuery from '../../../component-library/MediaQuery';
import { ButtonHTMLAttributes } from 'react';

type TLinkIconProps = (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { to?: never })
  | LinkProps
) & {
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

function IconButton({
  children,
  className = '',
  IconComponent,
  ...props
}: TLinkIconProps): JSX.Element {
  const inner = (
    <>
      <IconComponent className="icon-button__icon" />
      <MediaQuery minWidth="tablet">
        <span className="icon-button__text">{children}</span>
      </MediaQuery>
    </>
  );
  const classes = `icon-button ${className}`;

  if (props.to === undefined) {
    return (
      <button {...props} className={`${classes}`} type="button">
        {inner}
      </button>
    );
  }

  return (
    <Link {...props} className={`${classes} icon-button`}>
      {inner}
    </Link>
  );
}

export default IconButton;
