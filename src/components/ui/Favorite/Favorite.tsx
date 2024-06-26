import { useId, useState } from 'react';
import './Favorite.scss';
import { StarIcon } from '../Icons';

interface IFavoriteProps {
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  isFramed?: boolean;
  bgColor?: 'light-gray' | 'white';
  adaptiveSize?: 'window' | 'container';
}
function Favorite({
  checked,
  className = '',
  onChange,
  defaultChecked = false,
  isFramed = false,
  bgColor = 'white',
  adaptiveSize = 'window',
}: IFavoriteProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(defaultChecked);
  const isChecked = checked ?? isFavorite;
  const id = `${useId()}-favorite`;

  function handleChange(value: boolean): void {
    if (checked === undefined) {
      setIsFavorite(value);
    }
    onChange?.(value);
  }

  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="favorite sr-only"
        checked={isChecked}
        onChange={() => handleChange(!isChecked)}
      />
      <label
        htmlFor={id}
        className={[
          'favorite__label',
          `favorite__label_${bgColor}`,
          `favorite__label_${adaptiveSize}`,
          isFramed && 'favorite__label_border',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="sr-only">Добавить в избранное</span>
        <StarIcon />
      </label>
    </>
  );
}

export default Favorite;
