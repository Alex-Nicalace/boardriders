import './ColorChoise.scss';
import Checkbox, { TColor } from '../ui/Checkbox';

type TColorChoiseProps = {
  name: string;
  items: (TColor & { value: string; isEmpty?: boolean; disabled?: boolean })[];
  className?: string;
  value?: string | null;
  disabled?: boolean;
  onChange?: (value: string) => void;
};
function ColorChoise({
  name,
  items,
  className,
  value,
  disabled,
  onChange = () => {},
}: TColorChoiseProps): JSX.Element {
  return (
    <div className={['color-choise', className].filter(Boolean).join(' ')}>
      <div className="color-choise__color">
        <span className="color-choise__title">Цвет: </span>
        <span className="color-choise__text">{value}</span>
      </div>
      <ul className="color-choise__list">
        {items.map(({ isEmpty, ...rest }) => (
          <li className="color-choise__item" key={rest.value}>
            {((rest.pathImg && !rest.color) ||
              (!rest.pathImg && rest.color)) && (
              <Checkbox
                className="color-choise__checkbox"
                variant="btn-color"
                {...rest}
                name={name}
                type="radio"
                onChange={() => onChange(rest.value)}
                checked={value !== undefined ? rest.value === value : undefined}
                styleDisabled={isEmpty}
                title={isEmpty ? 'Нет в наличии' : undefined}
                disabled={disabled === true || rest.disabled}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColorChoise;
