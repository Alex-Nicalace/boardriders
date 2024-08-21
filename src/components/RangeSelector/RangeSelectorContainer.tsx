import { useSearchParams } from 'react-router-dom';
import RangeSelector from './RangeSelector';
import { TRangeSelectorContainerProps } from './RangeSelector.types';

function RangeSelectorContainer({
  min,
  max,
  className,
  step,
}: TRangeSelectorContainerProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const initValue =
    minPrice && maxPrice ? [Number(minPrice), Number(maxPrice)] : [min, max];

  function handleThumbDragEnd(value: number[]) {
    const [newMinPrice, newMaxPrice] = value;
    searchParams.set('minPrice', newMinPrice.toString());
    searchParams.set('maxPrice', newMaxPrice.toString());
    setSearchParams(searchParams);
  }

  return (
    <RangeSelector
      min={min}
      max={max}
      step={step}
      className={className}
      initValue={initValue}
      onThumbDragEnd={(value) => handleThumbDragEnd(value)}
    />
  );
}

export default RangeSelectorContainer;
