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
};
function Checkbox({
  name,
  id,
  label,
  className = '',
  checked,
  onChange,
  value,
}: TCheckboxProps): JSX.Element {
  const isReactElement = typeof label === 'object';

  return (
    <label className={`checkbox ${className}`}>
      <input
        className="checkbox__input sr-only"
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <span className="checkbox__icon">
        <CheckIcon className="checkbox__icon-check" />
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
