import { TRangeSliderProps } from '../../component-library/RangeSlider';

export type TRangeSelectorProps = Pick<
  TRangeSliderProps<number[]>,
  'min' | 'max' | 'step' | 'className' | 'onThumbDragEnd' | 'name'
> & {
  initValue?: number[];
};

export type TRangeSelectorContainerProps = Omit<
  TRangeSelectorProps,
  'onThumbDragEnd'
> & {};
