import './ListIconInfo.scss';
import IconInfoItem from '../IconInfoItem';

type TListIconInfoProps = {
  className?: string;
  title: React.ReactNode;
  items: {
    iconElement: JSX.Element;
    top: React.ReactNode;
    bottom: React.ReactNode;
  }[];
};
function ListIconInfo({
  className = '',
  title,
  items,
}: TListIconInfoProps): JSX.Element {
  return (
    <div className={`list-icon-info ${className}`}>
      <div className="list-icon-info__title">{title}</div>
      <ul className="list-icon-info__list">
        {items.map((item, i) => (
          <li className="list-icon-info__item" key={i}>
            <IconInfoItem
              iconElement={item.iconElement}
              topNode={item.top}
              bottomNode={item.bottom}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListIconInfo;
