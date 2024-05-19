import { useId } from 'react';
import './SelectLabel.scss';
import Select, { TSelectProps } from '../../../component-library/Select';
import { SelectIcon } from '../Icons';

type TSelectLabelProps = TSelectProps & {
  label?: React.ReactNode;
};
function SelectLabel({
  children,
  label,
  className,
  ...props
}: TSelectLabelProps): JSX.Element {
  const id = 'select-' + useId();

  return (
    <div className={['select-label', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="select-label__label" htmlFor={id}>
          {label}
        </label>
      )}
      <Select
        {...props}
        className="select-label__select"
        id={id}
        iconSelect={<SelectIcon />}
      >
        {children}
      </Select>
    </div>
  );
}

SelectLabel.Option = Select.Option;

export default SelectLabel;
