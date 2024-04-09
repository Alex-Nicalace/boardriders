import { useCallback, useEffect, useRef, useState } from 'react';
import './RangeSlider.scss';

type TRangeSliderProps<T> = (
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
};

type TValue = number | number[];

function RangeSlider<T extends TValue>({
  className = '',
  min,
  max,
  step = 1,
  name,
  defaultValue,
  value,
  onChange,
}: TRangeSliderProps<T>): JSX.Element {
  const [valueState, setValueState] = useState<number | number[]>(
    defaultValue ?? 0
  );
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<number, HTMLDivElement>>();
  const isInnerState = !value;
  const isNumberState = isInnerState
    ? typeof valueState === 'number'
    : typeof value === 'number';

  const getValue = useCallback(
    function getValue() {
      const result = (value as TValue) ?? valueState;
      // результат отсортировать и ограничить максимальным и минимальным значением
      return (Array.isArray(result) ? [...result] : [result])
        .sort((a, b) => a - b)
        .map((v) => Math.min(Math.max(v, min), max));
    },
    [value, valueState, min, max]
  );

  function setValue(
    valueArr: number[],
    activeThumb?: number,
    e?: PointerEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const newValue = (isNumberState ? valueArr[0] : valueArr) as T;
    if (onChange) {
      onChange(newValue, activeThumb, e);
    }
    if (isInnerState) {
      setValueState(newValue);
    }
  }

  const getMapThumbs = useCallback(function getMapItems() {
    if (!itemsRef.current) {
      itemsRef.current = new Map(); // единожды инициализируем Map
    }
    return itemsRef.current;
  }, []);

  const convertPageXToValue = useCallback(
    function convertPageXToValue(pageX: number, widthSlider: number) {
      const shiftValue = max - min;
      const stepValue = (step * widthSlider) / shiftValue;
      const leftPx = Math.round(pageX / stepValue) * stepValue;
      const value = Math.round((leftPx / stepValue) * step) + min;
      return value;
    },
    [max, min, step]
  );

  const convertValueToPx = useCallback(
    function convertValueToPx(value: number, widthSlider: number) {
      const shiftValue = max - min;
      const valueShift = value - min;
      return (valueShift * widthSlider) / shiftValue;
    },
    [max, min]
  );

  const convertValueToPercent = useCallback(
    function convertValueToPercent(value: number, widthSlider: number) {
      const px = convertValueToPx(value, widthSlider);
      return (px * 100) / widthSlider + '%';
    },
    [convertValueToPx]
  );

  useEffect(
    function positioningElements() {
      const widthSlider = sliderRef.current?.offsetWidth ?? 0;
      const firstValue = convertValueToPx(getValue()[0], widthSlider);
      const lastValue = convertValueToPx(
        getValue()[getValue().length - 1],
        widthSlider
      );
      const widthTrack = lastValue - firstValue;

      // изменяем CSS-свойства закрашенная полоса
      trackRef.current?.style.setProperty(
        '--left',
        `${(firstValue * 100) / widthSlider}%`
      );
      trackRef.current?.style.setProperty(
        '--width',
        `${(widthTrack * 100) / widthSlider}%`
      );

      getValue().forEach((value, index) => {
        getMapThumbs()
          .get(index)
          ?.style.setProperty(
            '--left',
            convertValueToPercent(value, widthSlider)
          );
      });
    },
    [getValue, getMapThumbs, convertValueToPx, convertValueToPercent]
  );

  function handleMouseDownThumb(
    e: React.PointerEvent<HTMLDivElement>,
    initIndex: number
  ) {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    e.preventDefault(); // предотвратить выделение
    const pointerId = e.pointerId;
    sliderEl.classList.add('range-slider_active');

    let shiftX: number;
    let maxValue: number;
    let minValue: number;
    let indexThumb: number;

    const setVariables = (index: number, values: number[]) => {
      shiftX = 0; // e.clientX - thumbCoord.left - (thumbCoord.width / 2);
      indexThumb = index;
      minValue = values[indexThumb - 1];
      maxValue = values[indexThumb + 1];
    };
    setVariables(initIndex, getValue());

    // перенацелить все события указателя (до pointerup) на slider
    sliderEl.setPointerCapture(pointerId);

    const sliderCoord = sliderEl.getBoundingClientRect();
    const widthSlider = sliderCoord.width;
    const minSliderValue = 0;

    const copyValue = getValue();
    const moveAt = (pageX: number, e?: PointerEvent) => {
      // передвинуть ползунок под координаты курсора
      // и сдвинуть на половину ширины/высоты для центрирования
      const valueX = Math.min(
        Math.max(pageX - shiftX - sliderCoord.left, minSliderValue),
        widthSlider
      );
      const value = convertPageXToValue(valueX, widthSlider);
      copyValue[indexThumb] = value;

      if (value >= maxValue || value <= minValue) {
        const increment = value <= minValue ? -1 : 1;
        setVariables(indexThumb + increment, copyValue);
      }

      setValue([...copyValue], indexThumb, e);
    };

    moveAt(e.pageX);
    // (3) перемещать по экрану
    sliderEl.addEventListener('pointermove', onMouseMove);
    // (4) положить объект, удалить более ненужные обработчики событий
    const onMouseUp = () => {
      sliderEl.removeEventListener('pointerup', onMouseUp);
      sliderEl.removeEventListener('pointermove', onMouseMove);

      sliderEl.classList.remove('range-slider_active');
    };
    sliderEl.addEventListener('pointerup', onMouseUp);

    function onMouseMove(e: PointerEvent) {
      moveAt(e.pageX, e);
    }
  }

  /**
   * передвинуть ползунок под координаты курсора при клике по шкале
   */
  function handleOnClickSlider(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    const sliderCoord = sliderEl.getBoundingClientRect();
    // получить X клика
    const valueX = Math.max(
      Math.min(e.pageX - sliderCoord.left, sliderCoord.width),
      0
    );
    const value = convertPageXToValue(valueX, sliderCoord.width);
    // найти индекс ближайшего бегунка к курсору
    const indexUpdate = getValue().reduce(
      (prevIndex, currentValue, index, arr) =>
        Math.abs(currentValue - value) < Math.abs(arr[prevIndex] - value)
          ? index
          : prevIndex,
      0
    );
    setValue(
      getValue().map((v, i) => (i === indexUpdate ? value : v)),
      indexUpdate,
      e
    );
  }

  return (
    <div
      className={`range-slider ${className}`}
      ref={sliderRef}
      onClick={handleOnClickSlider}
    >
      <div className="range-slider__rail"></div>
      <div className="range-slider__track" ref={trackRef}></div>
      {getValue().map((value, index) => (
        <div
          key={index}
          ref={(node) => {
            const map = getMapThumbs();
            if (node) {
              map.set(index, node);
            } else {
              map.delete(index);
            }
          }}
          className="range-slider__thumb"
          data-index={index}
          data-value={value}
          onPointerDown={(e) => handleMouseDownThumb(e, index)}
          // onMouseDownCapture={handleMouseDownThumb}
        >
          <input
            type="range"
            name={name}
            min={min}
            max={max}
            step={step}
            defaultValue={value}
          />
        </div>
      ))}
    </div>
  );
}

export default RangeSlider;
