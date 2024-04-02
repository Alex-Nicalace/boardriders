import './Checkbox.scss';
import { CheckIcon } from '../Icons';

type TCheckboxProps = {
  name?: string;
  id?: string;
  label?: React.ReactNode;
  className?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: 'checkbox' | 'radio';
};
function Checkbox({
  name,
  id,
  label,
  className = '',
  checked,
  onChange,
  value,
  type = 'checkbox',
}: TCheckboxProps): JSX.Element {
  const isReactElement = typeof label === 'object';

  return (
    <label
      className={`${className} checkbox ${
        type === 'radio' ? 'checkbox_radio' : ''
      }`}
    >
      <input
        className="checkbox__input sr-only"
        type={type}
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <span className="checkbox__icon">
        {type === 'checkbox' && <CheckIcon className="checkbox__icon-check" />}
      </span>
      {!isReactElement && <span className="checkbox__label">{label}</span>}
      {isReactElement && label}
    </label>
  );
}

type TLabelProps = {
  label: React.ReactNode;
  count: number;
};
function Label({ label, count }: TLabelProps): JSX.Element {
  return (
    <span className="checkbox__label checkbox__label_counter">
      <span className="checkbox__label-item">{label}</span>
      <span className="checkbox__label-count">{count}</span>
    </span>
  );
}

Checkbox.Label = Label;

export default Checkbox;
