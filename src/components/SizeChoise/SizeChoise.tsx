import './SizeChoise.scss';
import Checkbox from '../ui/Checkbox';
import { Link } from 'react-router-dom';

type TSizeChoiseProps = {
  name: string;
  items: { size: number; isEnded?: boolean }[];
  className?: string;
  type?: 'checkbox' | 'radio';
};
function SizeChoise({
  name,
  items,
  className = '',
  type = 'radio',
}: TSizeChoiseProps): JSX.Element {
  const formater = new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 0, // не показывать друбную часть, если ее нет
  });

  return (
    <div className={`size-choise ${className}`}>
      <div className="size-choise__link">
        <Link to="/catalog/man/sizes">Таблица размеров</Link>
      </div>
      <ul className="size-choise__list">
        {items.map((item) => (
          <li className="size-choise__item" key={item.size}>
            <Checkbox
              className="size-choise__checkbox"
              variant="btn-toggle"
              label={formater.format(item.size)}
              name={name}
              type={type}
              disabled={item.isEnded}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SizeChoise;
