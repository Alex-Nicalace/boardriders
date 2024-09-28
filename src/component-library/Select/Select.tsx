import { Children, isValidElement, useCallback, useRef, useState } from 'react';
import './Select.scss';
import ListOptions from './ListOptions';
import Option from './Option';
import { SelectContext } from './SelectContext';
import { Transition, TStateTransition } from '../Transition';
import {
  ISelectCustomCSSProperties,
  OptionProps,
  TSelectProps,
} from './Select.types';

const TRANSITION_STYLES: Record<TStateTransition, string> = {
  entering: 'options_opened',
  entered: 'options_opened',
  exiting: '',
  exited: '',
};

function Select(props: TSelectProps): JSX.Element {
  const {
    children,
    name,
    id,
    className,
    iconSelect = '▼',
    isLockScroll = true,
    listOptions = {},
    placreholder = 'Выберите...',
    iconItemRemove = '✕',
    isCloseDropdownWhenClicked = false,
    isSearchable = false,
    tabIndex = 0,
    animationOptions = {},
    fullWidth,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [valueInner, setValueInner] = useState<string | string[] | undefined>(
    props.isMulti ? props.initValue ?? [] : props.initValue ?? ''
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const selectWrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, HTMLLIElement>>();

  const selected = props.value ?? valueInner;
  const isEmpty = !selected || selected.length === 0;
  const { duration = 300 } = animationOptions;

  const getMapItems = useCallback(function getMapItems() {
    if (!itemsRef.current) {
      itemsRef.current = new Map(); // единожды инициализируем Map
    }
    return itemsRef.current;
  }, []);

  function setSelected(value: string) {
    if (props.isMulti) {
      let newValue: string[] = [];
      if (props.value) {
        const selectedValues = props.value;
        newValue = selectedValues.includes(value)
          ? removeSelectedValue(value)
          : [...selectedValues, value];
      } else if (Array.isArray(valueInner)) {
        const selectedValues = valueInner;
        newValue = selectedValues.includes(value)
          ? removeSelectedValue(value)
          : [...selectedValues, value];
        setValueInner(newValue);
      }
      props.onChange?.(newValue);
    } else {
      if (props.value === undefined) {
        setValueInner(value);
      }
      props.onChange?.(value);
    }
  }

  function removeSelectedValue(value: string) {
    if (!(props.isMulti && Array.isArray(valueInner))) return [];
    const selectedValues = props.value ?? valueInner;
    return selectedValues.filter((item) => item !== value);
  }

  function handlerRemoveItemSelected(value: string) {
    setSelected(value);
  }

  function getDisplay() {
    if (isEmpty) {
      return placreholder;
    }
    if (Array.isArray(selected)) {
      return (
        <div className="select__list-selected">
          {selected.map((val, index) => (
            <div key={`${val}-${index}`} className="select__item-selected">
              <div className="select__item-displaying">
                {getNodeSelected(val)}
              </div>
              <button
                className="select__item-remove"
                onClick={() => handlerRemoveItemSelected(val)}
              >
                {iconItemRemove}
              </button>
            </div>
          ))}
        </div>
      );
    }
    return getNodeSelected(selected);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function getNodeSelected(value: string) {
    const optionSelectedTemp = Children.toArray(children).find(
      (child) =>
        isValidElement<OptionProps>(child) && child.props.value === value
    );
    return (
      isValidElement<OptionProps>(optionSelectedTemp) &&
      optionSelectedTemp?.props.children
    );
  }

  function handleClickItem(value: string) {
    setSelected(value);
    if (isCloseDropdownWhenClicked || !props.isMulti) {
      // isCloseDropdownWhenClicked - для селекта с мультиселектом иначе не имеет значения
      close();
      selectWrapperRef.current?.focus(); // установить фокус на кнопку после выбора элемента
    }
  }

  function handleTriggerClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!(e.target instanceof Element)) return;
    // в ражиме мультиселекта игнорируем клик на кнопку удаления одного из ранее выбранных элементов
    if (e.target.closest('.select__item-remove')) return;

    toggle();
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (
      (e.key === 'Enter' || e.key === 'ArrowDown') &&
      selectWrapperRef.current
    ) {
      selectWrapperRef.current.click();
    }
  }

  const classes = [
    'select',
    isOpen && 'select_opened',
    isEmpty && 'select_empty',
    fullWidth && 'select_full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: ISelectCustomCSSProperties = {
    '--select-transition-duration': duration + 'ms',
  };

  return (
    <SelectContext.Provider
      value={{
        selected,
        clickItem: handleClickItem,
        getMapItems,
      }}
    >
      <div ref={selectRef} className={classes} style={style}>
        <div
          ref={selectWrapperRef}
          className="select__wrapper"
          onClick={handleTriggerClick}
          tabIndex={tabIndex}
          onKeyDown={handleTriggerKeyDown}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? 'list-options' : undefined}
          aria-label={name}
        >
          <div className="select__selected">{getDisplay()}</div>
          <div className="select__icon">{iconSelect}</div>
          <input
            className="select__input"
            aria-hidden={true}
            tabIndex={-1}
            aria-invalid={false}
            value={selected}
            name={name}
            id={id}
            readOnly
          />
        </div>
        <Transition enter={isOpen} timeout={duration}>
          {(state) =>
            (state !== 'exited' || isOpen) && (
              <ListOptions
                selectRef={selectRef}
                isLockScroll={isLockScroll}
                isSearchable={isSearchable}
                className={[TRANSITION_STYLES[state], listOptions.className]
                  .filter(Boolean)
                  .join(' ')}
                close={close}
                shouldFocus={state === 'entered' && isOpen}
                transitionDuration={duration}
              >
                {children}
              </ListOptions>
            )
          }
        </Transition>
      </div>
    </SelectContext.Provider>
  );
}

Select.Option = Option;

export default Select;
