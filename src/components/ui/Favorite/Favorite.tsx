import { useState } from 'react';
import './Favorite.scss';
import randomString from '../../../utils/randomString';
import { StarIcon } from '../Icons';

interface IFavoriteProps {
  className?: string;
  checked?: boolean;
}
function Favorite({ checked = false, className }: IFavoriteProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(checked);
  const id = `favorite-${randomString()}`;

  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="favorite sr-only"
        checked={isFavorite}
        onChange={() => setIsFavorite(!isFavorite)}
      />
      <label htmlFor={id} className={`favorite__label ${className || ''}`}>
        <span className="sr-only">Добавить в избранное</span>
        <StarIcon />
      </label>
    </>
  );
}

export default Favorite;
