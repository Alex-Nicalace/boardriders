import { useId } from 'react';
import './SelectLabel.scss';
import Select from '../../../component-library/Select';
import { SelectIcon } from '../Icons';
import { TSelectLabelProps } from './SelectLabel.types';

function SelectLabel({
  children,
  label,
  className,
  isGrayLabel,
  labelPosition = 'top',
  ...props
}: TSelectLabelProps): JSX.Element {
  const initId = 'select-' + useId();
  const id = props.id || initId;

  return (
    <div
      className={[
        'select-label',
        props.fullWidth && 'select-label_full-width',
        isGrayLabel && 'select-label_label_gray',
        `select-label_position-label_${labelPosition}`,
        (props.isError || props.error) && 'select-label_error',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
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
      {props.error && <p className="select-label__error">{props.error}</p>}
    </div>
  );
}

SelectLabel.Option = Select.Option;

export default SelectLabel;
