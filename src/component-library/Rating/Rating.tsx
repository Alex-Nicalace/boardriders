import { useState } from 'react';
import styled from './Rating.module.scss';

interface ICustomCSSProperties extends React.CSSProperties {
  '--rating-star-size'?: string;
  '--rating-star-gap'?: string;
}

interface IRatingProps {
  maxRating?: number;
  defaultRating?: number;
  rating?: number;
  size?: string;
  gap?: string;
  color?: string;
  iconUnactiveElement?: JSX.Element;
  iconActiveElement?: JSX.Element;
  className?: string;
  messages?: string[];
  onChangeRating?: (value: number) => void;
  isShowValue?: boolean;
  disabled?: boolean;
}
function Rating({
  maxRating = 5,
  defaultRating = 0,
  rating: ratingProp,
  size,
  gap,
  color,
  className = '',
  messages = [],
  iconUnactiveElement = (
    <IconStar fill="transparent" stroke={color || '#000'} />
  ),
  iconActiveElement = (
    <IconStar fill={color || '#000'} stroke={color || '#000'} />
  ),
  onChangeRating,
  isShowValue = true,
  disabled = false,
}: IRatingProps): JSX.Element {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const currentRating = ratingProp ?? rating;
  const showRating = tempRating || currentRating;
  const filled = (showRating / maxRating) * 100;
  const styleRating: ICustomCSSProperties = {
    ...(size && { '--rating-star-size': size }),
    ...(gap && { '--rating-star-gap': gap }),
  };

  function handleChangeRating(value: number): void {
    if (ratingProp === undefined) {
      setRating(value);
    }
    onChangeRating?.(value);
  }

  return (
    <div
      className={`rating ${
        disabled ? 'rating_disabled ' + styled.rating_disabled : ''
      } ${styled.rating} ${className}`}
      style={styleRating}
    >
      <div className={`rating__body ${styled.rating__body}`}>
        <div
          className={`rating__items rating__items_free ${styled.rating__items}`}
        >
          {Array.from({ length: maxRating }, (_, i) => (
            <span className={`rating__item ${styled.rating__item}`} key={i}>
              {iconUnactiveElement}
            </span>
          ))}
        </div>
        <div
          style={{ width: `${filled}%` }}
          className={`rating__items rating__items_fill ${styled.rating__items} ${styled.rating__items_fill}`}
        >
          {Array.from({ length: maxRating }, (_, i) => (
            <span className={`rating__item ${styled.rating__item}`} key={i}>
              {iconActiveElement}
            </span>
          ))}
        </div>
        <div
          className={`rating__items rating__items_opacity ${styled.rating__items} ${styled.rating__items_opacity}`}
        >
          {Array.from({ length: maxRating }, (_, i) => (
            <Input
              key={i}
              value={i + 1}
              checked={currentRating === i + 1}
              onChangeRating={
                disabled ? undefined : () => handleChangeRating(i + 1)
              }
              onHoverIn={disabled ? undefined : () => setTempRating(i + 1)}
              onHoverOut={disabled ? undefined : () => setTempRating(0)}
            />
          ))}
        </div>
      </div>
      {isShowValue && (
        <div className={`rating__value ${styled.rating__value} `}>
          {messages.length === maxRating
            ? messages[showRating - 1]
            : showRating || ''}
        </div>
      )}
    </div>
  );
}

interface IIconStar {
  fill?: string;
  stroke?: string;
}
function IconStar({ fill = '#000', stroke = '#000' }: IIconStar) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={fill}
      stroke={stroke}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

interface IInputProps {
  value: number;
  checked?: boolean;
  onChangeRating?: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
}
export function Input({
  value,
  checked = false,
  onChangeRating,
  onHoverIn,
  onHoverOut,
}: IInputProps): JSX.Element {
  return (
    <input
      type="radio"
      name="rating"
      className={`rating__item ${styled.rating__item}`}
      value={value}
      defaultChecked={checked}
      onChange={onChangeRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    />
  );
}

export default Rating;
