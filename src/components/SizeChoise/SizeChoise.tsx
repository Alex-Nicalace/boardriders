import './SizeChoise.scss';
import Checkbox from '../ui/Checkbox';
import { Link } from 'react-router-dom';

type TSizeChoiseProps = {
  name: string;
  items: {
    size: string;
    isEmpty?: boolean;
    value: string;
    disabled?: boolean;
  }[];
  className?: string;
  disabled?: boolean;
  value?: string | null;
  onChange?: (value: string) => void;
};
function SizeChoise({
  name,
  items,
  className,
  disabled,
  value,
  onChange = () => {},
}: TSizeChoiseProps): JSX.Element {
  return (
    <div className={['size-choise', className].filter(Boolean).join(' ')}>
      <div className="size-choise__link">
        <Link to="/catalog/man/sizes">Таблица размеров</Link>
      </div>
      <ul className="size-choise__list">
        {items.map((item) => (
          <li className="size-choise__item" key={item.size}>
            <Checkbox
              className="size-choise__checkbox"
              variant="btn-toggle"
              label={item.size}
              name={name}
              type="radio"
              disabled={disabled === true || item.disabled}
              styleDisabled={item.isEmpty}
              title={item.isEmpty ? 'Нет в наличии' : undefined}
              value={item.value}
              checked={value !== undefined ? item.value === value : undefined}
              onChange={() => onChange(item.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SizeChoise;
