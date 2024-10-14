import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { TSelectLabelControlProps } from './SelectLabel.types';
import SelectLabel from './SelectLabel';

function SelectLabelControl<T extends FieldValues, N extends FieldPath<T>>({
  name,
  children,
  control,
  rules,
  asNumber,
  asDate,
  ...props
}: TSelectLabelControlProps<T, N>): JSX.Element {
  function handleChange(value: string) {
    if (asNumber) {
      return +value;
    } else if (asDate) {
      return new Date(value);
    }
    return value;
  }

  function hundleValue(value: string | undefined) {
    if (value === undefined) return;

    if (asDate) {
      return new Date(value).toISOString();
    }

    return String(value);
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <SelectLabel
          onChange={(value) => field.onChange(handleChange(value))}
          onBlur={field.onBlur}
          error={error?.message}
          isMulti={false}
          value={hundleValue(field.value)}
          {...props}
        >
          {children}
        </SelectLabel>
      )}
    />
  );
}

export default SelectLabelControl;
