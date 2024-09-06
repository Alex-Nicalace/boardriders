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
  const [isDirty, setIsDirty] = useState(false);
  const [rangeValue, setRangeValue] = useState(initValue);
  const [from, to] = rangeValue;

  function handleChangeRangeValue(
    e: React.ChangeEvent<HTMLInputElement>,
    i: 0 | 1
  ) {
    const value = Number(e.target.value.replace(/\D|^0+(?=\d+)/g, ''));
    const newRangeValue = [...rangeValue];
    newRangeValue[i] = value;
    setRangeValue(newRangeValue);
    setIsDirty(true);
  }

  function handleClickOk() {
    if (min > Math.min(from, to) || max < Math.max(from, to)) return;

    if (to < from) {
      setRangeValue([to, from]);
      onThumbDragEnd?.([to, from]);
    } else {
      onThumbDragEnd?.([from, to]);
    }

    setIsDirty(false);
  }

  function handleChangeValue(value: number[]) {
    setRangeValue(value);
    setIsDirty(false);
  }

  return (
    <div className={['range-selector', className].filter(Boolean).join(' ')}>
      <div className="range-selector__inputs">
        <InputStyled
          className="range-selector__from"
          value={from}
          inputMode="numeric"
          error={(from < min || from > max) && `min: ${min}, max: ${max}`}
          onChange={(e) => handleChangeRangeValue(e, 0)}
        />
        <InputStyled
          className="range-selector__to"
          value={to}
          inputMode="numeric"
          error={(to < min || to > max) && `min: ${min}, max: ${max}`}
          onChange={(e) => handleChangeRangeValue(e, 1)}
        />
        <Button
          className="range-selector__ok"
          disabled={!isDirty}
          onClick={handleClickOk}
        >
          OK
        </Button>
      </div>
      <RangeSlider
        className="range-selector__slider"
        min={min}
        max={max}
        name={name}
        step={step}
        value={rangeValue}
        onChange={handleChangeValue}
        onThumbDragEnd={onThumbDragEnd}
      />
    </div>
  );
}

export default RangeSelector;
