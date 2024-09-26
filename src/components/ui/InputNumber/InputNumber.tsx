import { useState } from 'react';
import './InputNumber.scss';
import InputStyled from '../InputStyled';

type TInputNumberProps = {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
} & (
  | { value: number; defaultValue?: never }
  | { value?: never; defaultValue: number }
);
function InputNumber({
  className,
  min,
  max,
  step = 1,
  value: valueProp,
  defaultValue,
  onChange,
}: TInputNumberProps): JSX.Element {
  const [value, setValue] = useState<number | '' | '-'>(defaultValue ?? '');
  const currentValue = valueProp || value;

  function setCurrentValue(newValue: number | '' | '-') {
    const valueChecked =
      newValue !== '' && newValue !== '-'
        ? Math.min(Math.max(min ?? -Infinity, newValue), max ?? Infinity)
        : newValue;

    if (!valueProp) {
      setValue(valueChecked);
    }

    if (typeof valueChecked === 'number') {
      onChange?.(valueChecked);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!/^-?\d*$/.test(value)) return; // в этом проекте это избыточно условие, рефлексия а что если бы нужны были отрицательные числа
    setCurrentValue(value === '' || value === '-' ? value : Number(value)); // чтобы можно было стереть 1-ю цифру
  }

  function handleClickBtn(step: number) {
    setCurrentValue(
      (currentValue === '' || currentValue === '-' ? 0 : currentValue) + step
    );
  }

  return (
    <div className={['input-number', className].filter(Boolean).join(' ')}>
      <button
        className="input-number__btn input-number__btn_dec"
        onClick={() => handleClickBtn(-step)}
      ></button>
      <InputStyled
        className="input-number__input"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        // defaultValue={defaultValue}
        onChange={handleOnChange}
      />
      <button
        className="input-number__btn input-number__btn_inc"
        onClick={() => handleClickBtn(step)}
      ></button>
    </div>
  );
}

export default InputNumber;
