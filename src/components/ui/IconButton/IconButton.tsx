import { Link } from 'react-router-dom';
import './IconButton.scss';
import MediaQuery from '../../../component-library/MediaQuery';

interface ILinkIconProps {
  children?: React.ReactNode;
  className?: string;
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  to?: string;
}

function IconButton({
  children,
  className,
  IconComponent,
  to,
}: ILinkIconProps): JSX.Element {
  const inner = (
    <>
      <IconComponent className="icon-button__icon" />
      <MediaQuery minWidth="tablet">
        <span className="icon-button__text">{children}</span>
      </MediaQuery>
    </>
  );
  if (!to) {
    return <button className={`${className} icon-button`}>{inner}</button>;
  }

  return (
    <Link to={to} className={`${className} icon-button`}>
      {inner}
    </Link>
  );
}

export default IconButton;
