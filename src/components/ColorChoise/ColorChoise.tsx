import './ColorChoise.scss';
import Checkbox, { TColor } from '../ui/Checkbox';

type TColorChoiseProps = {
  name: string;
  items: (TColor & { value: string })[];
  className?: string;
  type?: 'checkbox' | 'radio';
};
function ColorChoise({
  name,
  items,
  className = '',
  type = 'radio',
}: TColorChoiseProps): JSX.Element {
  return (
    <div className={`color-choise ${className}`}>
      <div className="color-choise__color">
        <span className="color-choise__title">Цвет:</span>
        <span className="color-choise__text">зеленый</span>
      </div>
      <ul className="color-choise__list">
        {items.map((item) => (
          <li className="color-choise__item" key={item.value}>
            {((item.pathImg && !item.color) ||
              (!item.pathImg && item.color)) && (
              <Checkbox
                className="color-choise__checkbox"
                variant="btn-color"
                {...item}
                name={name}
                type={type}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColorChoise;
