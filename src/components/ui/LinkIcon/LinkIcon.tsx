import { Link } from 'react-router-dom';
import './LinkIcon.scss';

interface ILinkIconProps {
  children?: React.ReactNode;
  className?: string;
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  to: string;
}

function LinkIcon({
  children,
  className,
  IconComponent,
  to,
}: ILinkIconProps): JSX.Element {
  return (
    <Link to={to} className={`${className} link-icon`}>
      <IconComponent className="link-icon__icon" />
      <span className="link-icon__text">{children}</span>
    </Link>
  );
}

export default LinkIcon;
