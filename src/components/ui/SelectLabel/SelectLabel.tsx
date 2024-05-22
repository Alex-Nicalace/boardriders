import { useId } from 'react';
import './SelectLabel.scss';
import Select, { TSelectProps } from '../../../component-library/Select';
import { SelectIcon } from '../Icons';

type TSelectLabelProps = TSelectProps & {
  label?: React.ReactNode;
  isGrayLabel?: boolean;
};
function SelectLabel({
  children,
  label,
  className,
  isGrayLabel,
  ...props
}: TSelectLabelProps): JSX.Element {
  const id = 'select-' + useId();

  return (
    <div
      className={[
        'select-label',
        props.fullWidth && 'select-label_full-width',
        isGrayLabel && 'select-label_label_gray',
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
    </div>
  );
}

SelectLabel.Option = Select.Option;

export default SelectLabel;
