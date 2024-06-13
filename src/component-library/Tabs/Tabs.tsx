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
  variant?: 'fullWidth' | 'scrollable' | 'standard';
  visibleScrollbar?: 'auto' | 'thin' | 'none';
  scrollButtons?: 'auto' | false | true;
  labelButtonPrev?: ReactNode;
  labelButtonNext?: ReactNode;
};
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
 * @return {JSX.Element} Отображаемый компонент Tabs.
 */
function Tabs({
  children,
  value,
  onChange,
  defaultValue,
  className,
  variant = 'standard',
  visibleScrollbar = 'none',
  scrollButtons = 'auto',
  labelButtonPrev = <span style={{ padding: '10px' }}>{`<`}</span>,
  labelButtonNext = <span style={{ padding: '10px' }}>{`>`}</span>,
}: TTabsProps): JSX.Element {
  console.log('Tabs render');

  // Проверка типа детей. Если не Tab - выбрасываем ошибку. Не факт, что это нужно, но решил так сделать.
  Children.forEach(children, (child) => {
    if (child.type !== Tab) {
      throw new Error('Tabs component only accepts Tab as children.');
    }
  });
  const [selected, setSelected] = useState(defaultValue);
  const [scrollLeft, setScrollLeft] = useState(0);
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
        behavior: 'smooth',
      });
    },
    [scrollLeft]
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
    // const scrollElement = scrollableRef.current;
    // if (!scrollElement) return;

    // console.log(scrollElement.scrollLeft);

    const directionToScroll = direction === 'left' ? -1 : 1;
    const preLeftScroll =
      scrollLeft + directionToScroll * scrollableElementWidth;
    // const maxLeftScroll = scrollElement.scrollWidth - scrollElement.offsetWidth;
    const newLeftScroll = Math.min(
      Math.max(0, preLeftScroll),
      maxLeftScrollscrollableElement
    );

    setScrollLeft(newLeftScroll);
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
      className={['tabs', className].filter(Boolean).join(' ')}
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
        // onScroll={(e) => console.log(e)}
      >
        <div className="tabs__list" role="tablist">
          {Children.map(children, (child, index) => {
            const tabValue =
              child.props.value === undefined ? index : child.props.value;
            const isSelected = tabValue === currentValue;

            return cloneElement(child, {
              className: `${isSelected ? 'tabs__item_active' : ''}`,
              onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                child.props.onClick?.(e); // соббытие, которое явно было установлено в JSX
                // setCurrentValue(tabValue, e);
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
