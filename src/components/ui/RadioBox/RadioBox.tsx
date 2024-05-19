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
  title: string;
  price?: string;
  hint?: string;
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
  title,
  price,
  hint,
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
      <span className="radio-box__body">
        <span className="radio-box__icon"></span>
        <span className="radio-box__title">{title}</span>
        {price && <span className="radio-box__price">{price}</span>}
        {hint && <span className="radio-box__hint">{hint}</span>}
      </span>
    </label>
  );
}

export default RadioBox;
