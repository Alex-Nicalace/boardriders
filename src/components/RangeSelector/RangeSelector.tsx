import { useState } from 'react';
import './RangeSelector.scss';
import RangeSlider from '../../component-library/RangeSlider';
import Button from '../ui/Button';
import InputStyled from '../ui/InputStyled';
import { TRangeSelectorProps } from './RangeSelector.types';

function RangeSelector({
  name,
  min,
  max,
  step = 1,
  className,
  initValue = [min, max],
  onThumbDragEnd,
}: TRangeSelectorProps): JSX.Element {
  const [rangeValue, setRangeValue] = useState(initValue);
  const [from, to] = rangeValue;

  function handleChangeRangeValue(
    e: React.ChangeEvent<HTMLInputElement>,
    i: 0 | 1
  ) {
    const value = Number(e.target.value.replace(/\D/g, ''));
    const newRangeValue = [...rangeValue];
    newRangeValue[i] = value;
    setRangeValue(newRangeValue);
  }

  return (
    <div className={['range-selector', className].filter(Boolean).join(' ')}>
      <div className="range-selector__inputs">
        <InputStyled
          className="range-selector__from"
          value={from}
          onChange={(e) => handleChangeRangeValue(e, 0)}
          type="number"
        />
        <InputStyled
          className="range-selector__to"
          value={to}
          onChange={(e) => handleChangeRangeValue(e, 1)}
          type="number"
        />
        <Button className="range-selector__ok">OK</Button>
      </div>
      <RangeSlider
        className="range-selector__slider"
        min={min}
        max={max}
        name={name}
        step={step}
        value={rangeValue}
        onChange={setRangeValue}
        onThumbDragEnd={onThumbDragEnd}
      />
    </div>
  );
}

export default RangeSelector;
