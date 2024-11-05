import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import InputDate from './InputDate';
import { TInputDateControlProps } from './InputDate.types';

function InputDateControl<T extends FieldValues, N extends FieldPath<T>>({
  name,
  control,
  rules,
  ...props
}: TInputDateControlProps<T, N>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <InputDate
          onChange={(value) => field.onChange(value)}
          onBlur={field.onBlur}
          error={error?.message}
          defaultValue={field.value}
          {...props}
        />
      )}
    />
  );
}

export default InputDateControl;
