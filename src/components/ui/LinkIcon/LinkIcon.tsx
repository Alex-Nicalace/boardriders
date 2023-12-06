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
    <a href={to} className={`${className} link-icon`}>
      <IconComponent className="link-icon__icon" />
      <span className="link-icon__text">{children}</span>
    </a>
  );
}

export default LinkIcon;
