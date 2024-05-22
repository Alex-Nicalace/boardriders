import './RadioBox.scss';

type TRadioBoxProps = {
  name?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  view?: 'grid' | 'normal';
};
function RadioBox({
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
}: TRadioBoxProps): JSX.Element {
  return (
    <label className={['radio-box', className].filter(Boolean).join(' ')}>
      <input
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

function Title({ children }: { children: React.ReactNode }): JSX.Element {
  return <span className="radio-box__title">{children}</span>;
}

function Price({ children }: { children: React.ReactNode }): JSX.Element {
  return <span className="radio-box__price">{children}</span>;
}

function Hint({ children }: { children: React.ReactNode }): JSX.Element {
  return <span className="radio-box__hint">{children}</span>;
}

RadioBox.Title = Title;
RadioBox.Price = Price;
RadioBox.Hint = Hint;

export default RadioBox;
