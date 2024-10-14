import { forwardRef } from 'react';
import './RadioBox.scss';
import { IRadioBoxComponent, TRadioBoxProps } from './RadioBox.types';

const RadioBox = forwardRef<HTMLInputElement, TRadioBoxProps>(
  (
    {
      className,
      name,
      id,
      checked,
      defaultChecked,
      onChange,
      value,
      disabled,
      children,
      view = 'normal',
    },
    ref
  ) => {
    return (
      <label className={['radio-box', className].filter(Boolean).join(' ')}>
        <input
          ref={ref}
          className="radio-box__input sr-only"
          type="radio"
          name={name}
          id={id}
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        <span
          className={[
            'radio-box__body',
            view === 'grid' && 'radio-box__body_grid',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="radio-box__icon"></span>
          {view === 'grid' && children}
          {view === 'normal' && (
            <span className="radio-box__title">{children}</span>
          )}
        </span>
      </label>
    );
  }
) as IRadioBoxComponent;

export function Title({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <span className="radio-box__title">{children}</span>;
}

export function Price({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <span className="radio-box__price">{children}</span>;
}

export function Hint({ children }: { children: React.ReactNode }): JSX.Element {
  return <span className="radio-box__hint">{children}</span>;
}

RadioBox.Title = Title;
RadioBox.Price = Price;
RadioBox.Hint = Hint;

export default RadioBox;
