import { useSearchParams } from 'react-router-dom';
import RangeSelector from './RangeSelector';
import { TRangeSelectorContainerProps } from './RangeSelector.types';
import { useEffect } from 'react';

function RangeSelectorContainer({
  min,
  max,
  className,
  step,
}: TRangeSelectorContainerProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPriceSelected = searchParams.get('minPrice');
  const maxPriceSelected = searchParams.get('maxPrice');
  const initValue =
    minPriceSelected &&
    maxPriceSelected &&
    +minPriceSelected >= min &&
    +maxPriceSelected <= max
      ? [Number(minPriceSelected), Number(maxPriceSelected)]
      : [min, max];

  function handleThumbDragEnd(value: number[]) {
    const [newMinPrice, newMaxPrice] = value;
    searchParams.set('minPrice', newMinPrice.toString());
    searchParams.set('maxPrice', newMaxPrice.toString());
    searchParams.delete('page');
    setSearchParams(searchParams);
  }

  useEffect(
    function updateSearchParams() {
      if (!minPriceSelected) return;
      if (!maxPriceSelected) return;

      if (Number(minPriceSelected) < min || Number(maxPriceSelected) > max) {
        searchParams.delete('minPrice');
        searchParams.delete('maxPrice');
        setSearchParams(searchParams);
      }
    },
    [
      minPriceSelected,
      maxPriceSelected,
      min,
      max,
      searchParams,
      setSearchParams,
    ]
  );

  return (
    <RangeSelector
      key={`${min}-${max}`}
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
