import './IconInfoItem.scss';

type TIconInfoItemProps = {
  className?: string;
  iconElement?: JSX.Element;
  topNode?: React.ReactNode;
  bottomNode?: React.ReactNode;
};
function IconInfoItem({
  className = '',
  iconElement,
  topNode,
  bottomNode,
}: TIconInfoItemProps): JSX.Element {
  return (
    <div className={`icon-info-item ${className}`}>
      <div className="icon-info-item__wrap-icon">{iconElement}</div>
      <div className="icon-info-item__content">
        {topNode && <div className="icon-info-item__top">{topNode}</div>}
        {bottomNode && (
          <div className="icon-info-item__bottom">{bottomNode}</div>
        )}
      </div>
    </div>
  );
}

export default IconInfoItem;
