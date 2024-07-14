import {
  ButtonHTMLAttributes,
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './Tabs.scss';
import { omit } from '../../utils/omit';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { throttle } from '../../utils/throttle';

interface ICustomCSSProperties extends React.CSSProperties {
  '--tabs-grow-item'?: string;
  '--tabs-basis-item'?: string;
  '--tabs-overflow-x'?: string;
  '--tabs-scrollbar-width'?: 'auto' | 'thin' | 'none';
}

type TTabsProps = {
  children: ReactElement<TTabProps> | ReactElement<TTabProps>[];
  onChange?: (value: any, event?: React.SyntheticEvent) => void;
  value?: any;
  defaultValue?: any;
  className?: string;
  visibleScrollbar?: 'auto' | 'thin' | 'none';
} & (
  | {
      variant?: 'fullWidth' | 'standard';
      scrollButtons?: never;
      labelButtonPrev?: never;
      labelButtonNext?: never;
      isDragScrollableTabs?: never;
    }
  | {
      variant: 'scrollable';
      scrollButtons?: 'auto' | false | true;
      labelButtonPrev?: ReactNode;
      labelButtonNext?: ReactNode;
      isDragScrollableTabs?: boolean;
    }
);
/**
 * Рендерит компонент Tabs с настраиваемыми возможностями и внешним видом.
 *
 * @param {Object} props - Объект props, содержащий следующие свойства:
 *   - children: Дочерние компоненты компонента Tabs.
 *   - value: Текущее выбранное значение.
 *   - onChange: Функция обратного вызова, вызываемая при изменении выбранного значения.
 *   - defaultValue: Стандартное выбранное значение.
 *   - className: Дополнительные имена классов CSS для компонента Tabs.
 *   - variant: Вариант компонента Tabs ('standard', 'fullWidth' или 'scrollable').
 *   - visibleScrollbar: Видимость полосы прокрутки ('авто', 'thin' или 'none').
 *   - scrollButtons: Видимость кнопок прокрутки ('авто', true или false).
 *   - labelButtonPrev: Метка для предыдущей кнопки прокрутки.
 *   - labelButtonNext: Метка для следующей кнопки прокрутки.
 *   - isDragScrollableTabs: Флаг, показывающий, нужно ли реализовывать прокрутку с помощью захвата мыши.
 * @return {JSX.Element} Отображаемый компонент Tabs.
 */
function Tabs({
  children,
  value,
  onChange,
  defaultValue,
  className,
  variant = 'standard',
  isDragScrollableTabs = false,
  visibleScrollbar = 'none',
  scrollButtons = 'auto',
  labelButtonPrev = <span style={{ padding: '10px' }}>{`<`}</span>,
  labelButtonNext = <span style={{ padding: '10px' }}>{`>`}</span>,
}: TTabsProps): JSX.Element {
  // Проверка типа детей. Если не Tab - выбрасываем ошибку. Не факт, что это нужно, но решил так сделать.
  Children.forEach(children, (child) => {
    if (child.type !== Tab) {
      throw new Error('Tabs component only accepts Tab as children.');
    }
  });
  const [selected, setSelected] = useState(defaultValue);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const isUseInnerState = value === undefined;
  const currentValue = isUseInnerState ? selected : value;
  const style: ICustomCSSProperties = {
    ...(variant === 'fullWidth' && { '--tabs-grow-item': '1' }),
    ...(variant === 'scrollable' && { '--tabs-overflow-x': 'auto' }),
    ...(visibleScrollbar !== 'none' && {
      '--tabs-scrollbar-width': visibleScrollbar,
    }),
  };
  const isScrollButtons = variant === 'scrollable' && scrollButtons !== false;
  const refObjectArray = useMemo(() => [scrollableRef], [scrollableRef]);
  const [scrollableElementSize] = useResizeObserver(refObjectArray);
  const {
    width: scrollableElementWidth = 0,
    scrollWidth: scrollableElementScrollWidth = 0,
  } = scrollableElementSize || {};
  const maxLeftScrollscrollableElement =
    scrollableElementScrollWidth - scrollableElementWidth;

  useEffect(
    function changeScrollPosition() {
      const scrollElement = scrollableRef.current;
      if (!scrollElement) return;

      scrollElement.scrollTo({
        left: scrollLeft,
        behavior: isScrolling ? 'auto' : 'smooth',
      });
    },
    [scrollLeft, isScrolling]
  );

  useEffect(
    /**
     * Сбросить позицию прокрутки, когда экран позволяет разместить табы без прокрутки
     */
    function resetScrollPosition() {
      if (scrollableElementWidth === scrollableElementScrollWidth) {
        setScrollLeft(0);
      }
    },
    [scrollableElementWidth, scrollableElementScrollWidth]
  );

  function setCurrentValue(value: any, event: React.SyntheticEvent) {
    if (isUseInnerState) {
      setSelected(value);
    }
    if (onChange) {
      onChange(value, event);
    }
  }

  function handleScrollButtonClick(direction: 'left' | 'right') {
    const directionToScroll = direction === 'left' ? -1 : 1;
    const preLeftScroll =
      scrollLeft + directionToScroll * scrollableElementWidth;
    const newLeftScroll = Math.min(
      Math.max(0, preLeftScroll),
      maxLeftScrollscrollableElement
    );

    setScrollLeft(newLeftScroll);
  }

  function handleScrollableElementPointerDown(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    e.preventDefault(); // предотвратить запуск выделения (действие браузера)
    const scrollableElement = e.currentTarget;
    setIsScrolling(true);
    const scrollableElementRect = scrollableElement.getBoundingClientRect();
    const shiftX = e.clientX - scrollableElementRect.left;

    const mouseMoveHandler = throttle((e: PointerEvent) => {
      // scrollableElement.setPointerCapture(e.pointerId);
      const x = e.clientX - scrollableElementRect.left;
      const walk = x - shiftX;
      const newScrollLeft = Math.min(
        Math.max(scrollLeft - walk, 0),
        maxLeftScrollscrollableElement
      );

      setScrollLeft(newScrollLeft);
    }, 15);

    const dragEnd = () => {
      setIsScrolling(false);
      // * для обработки событий указателя нужно в CSS touch-action: none, чтобы предотвратить действия браузера по умолчанию;
      scrollableElement.removeEventListener('pointermove', mouseMoveHandler);
      scrollableElement.removeEventListener('pointerup', mouseMoveHandler);
      scrollableElement.removeEventListener('pointerleave', mouseLeaveHandler);
    };

    const mouseUpHandler = () => {
      dragEnd();
    };

    const mouseLeaveHandler = () => {
      dragEnd();
    };

    scrollableElement.addEventListener('pointermove', mouseMoveHandler);
    scrollableElement.addEventListener('pointerup', mouseUpHandler);
    scrollableElement.addEventListener('pointerleave', mouseLeaveHandler);
  }

  function handleTabClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: any
  ) {
    setCurrentValue(value, e);
    scrollTabIntoView(e.currentTarget);
  }

  function scrollTabIntoView(tabElement: HTMLElement) {
    const scrollableElement = scrollableRef.current;
    if (!scrollableElement) return;
    const fieldView = {
      from: scrollableElement.scrollLeft,
      to: scrollableElement.scrollLeft + scrollableElement.offsetWidth,
    };
    const targetView = {
      from: tabElement.offsetLeft,
      to: tabElement.offsetLeft + tabElement.offsetWidth,
    };
    if (targetView.from < fieldView.from && targetView.to > fieldView.from) {
      const newScrollLeft = targetView.from;
      setScrollLeft(newScrollLeft);
    }
    if (targetView.from < fieldView.to && targetView.to > fieldView.to) {
      const newScrollLeft = fieldView.from + targetView.to - fieldView.to;
      setScrollLeft(newScrollLeft);
    }
  }

  return (
    <div
      className={['tabs', isScrolling && 'tabs_scrolling', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {isScrollButtons && (
        <button
          className={[
            'tabs__btn-scroll',
            scrollLeft <= 0 &&
              scrollButtons !== true &&
              'tabs__btn-scroll_disabled',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => handleScrollButtonClick('left')}
          disabled={scrollLeft <= 0}
        >
          {labelButtonPrev}
        </button>
      )}
      <div
        className="tabs__wrapper"
        ref={scrollableRef}
        onPointerDown={
          isDragScrollableTabs ? handleScrollableElementPointerDown : undefined
        }
      >
        <div className="tabs__list" role="tablist">
          {Children.map(children, (child, index) => {
            const tabValue =
              child.props.value === undefined ? index : child.props.value;
            const isSelected = tabValue === currentValue;

            return cloneElement(child, {
              className: [
                isSelected && 'tabs__item_active',
                child.props.className, // классы, которые были установлены в JSX
              ]
                .filter(Boolean)
                .join(' '),
              onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                child.props.onClick?.(e); // соббытие, которое явно было установлено в JSX
                handleTabClick(e, tabValue);
              },
              tabIndex: isSelected ? 0 : -1,
              'aria-selected': isSelected,
            });
          })}
        </div>
      </div>
      {isScrollButtons && (
        <button
          className={[
            'tabs__btn-scroll',
            scrollLeft >= maxLeftScrollscrollableElement &&
              scrollButtons !== true &&
              'tabs__btn-scroll_disabled',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => handleScrollButtonClick('right')}
          disabled={scrollLeft >= maxLeftScrollscrollableElement}
        >
          {labelButtonNext}
        </button>
      )}
    </div>
  );
}

type TTabProps = {
  label: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
function Tab({ label, ...props }: TTabProps): JSX.Element {
  return (
    <button
      {...omit(props, 'value')}
      className={['tabs__item', props.className].filter(Boolean).join(' ')}
      role="tab"
    >
      {label}
    </button>
  );
}

Tabs.Tab = Tab;

export default Tabs;
