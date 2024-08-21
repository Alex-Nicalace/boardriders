export type TRangeSliderProps<T> = (
  | {
      value: T;
      defaultValue?: never;
    }
  | {
      value?: never;
      defaultValue: T;
    }
) & {
  className?: string;
  min: number;
  max: number;
  step?: number;
  name?: string;

  onChange?: (
    value: T,
    activeThumb?: number,
    e?: PointerEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onThumbDragEnd?: (
    value: T,
    activeThumb?: number,
    e?: PointerEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

export type TValue = number | number[];
