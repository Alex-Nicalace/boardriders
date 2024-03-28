import {
  Children,
  ReactElement,
  isValidElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import './Select.scss';
import ListOptions from './ListOptions';
import Option, { OptionProps } from './Option';
import { SelectContext } from './SelectContext';
import Transition, { TTransition } from '../Transition';

type TSingleSelectProps = {
  isMulti?: false;
  initValue?: never;
  value: string;
  onChange: (value: string) => void;
  iconItemRemove?: never;
  isCloseDropdownWhenClicked?: never;
};
type TSingleSelectUncontrolledProps = {
  isMulti?: false;
  initValue?: string;
  value?: never;
  onChange?: never;
  iconItemRemove?: never;
  isCloseDropdownWhenClicked?: never;
};

type TMultiSelectProps = {
  isMulti: true;
  initValue?: never;
  value: string[];
  onChange: (value: string[]) => void;
  iconItemRemove?: React.ReactNode;
  isCloseDropdownWhenClicked?: boolean;
};
type TMultiSelectUncontrolledProps = {
  isMulti: true;
  initValue?: string[];
  value?: never;
  onChange?: never;
  iconItemRemove?: React.ReactNode;
  isCloseDropdownWhenClicked?: boolean;
};

type TCommonSelectProps = {
  children: ReactElement<OptionProps>[] | ReactElement<OptionProps>;
  name?: string;
  id?: string;
  className?: string;
  listOptions?: {
    className?: string;
  };
  iconElement: JSX.Element;
  isLockScroll?: boolean;
  placreholder?: React.ReactNode;
  isSearchable?: boolean;
  tabIndex?: number;
  animationOptions?: {
    duration?: number;
  };
};

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: 'options_opened',
  entered: 'options_opened',
  exiting: '',
  exited: '',
};

type TSelectProps = (
  | TSingleSelectProps
  | TMultiSelectProps
  | TSingleSelectUncontrolledProps
  | TMultiSelectUncontrolledProps
) &
  TCommonSelectProps;
function Select(props: TSelectProps): JSX.Element {
  const {
    children,
    name,
    id,
    className = '',
    iconElement,
    isLockScroll = true,
    listOptions = {},
    placreholder = 'Выберите...',
    iconItemRemove = '✕',
    isCloseDropdownWhenClicked = false,
    isSearchable = false,
    tabIndex = 0,
    animationOptions = {},
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
      if (props.value) {
        const selectedValues = props.value;
        const newValue = selectedValues.includes(value)
          ? removeSelectedValue(value)
          : [...selectedValues, value];
        props.onChange(newValue);
      } else if (Array.isArray(valueInner)) {
        const selectedValues = valueInner;
        const newValue = selectedValues.includes(value)
          ? removeSelectedValue(value)
          : [...selectedValues, value];
        setValueInner(newValue);
      }
    } else {
      if (props.value) {
        props.onChange(value);
      } else {
        setValueInner(value);
      }
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

  return (
    <SelectContext.Provider
      value={{
        selected,
        clickItem: handleClickItem,
        getMapItems,
      }}
    >
      <div
        ref={selectRef}
        className={`select ${isOpen ? 'select_opened' : ''} ${
          isEmpty ? 'select_empty' : ''
        } ${className}`}
      >
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
          <div className="select__icon">{iconElement}</div>
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
                className={`${TRANSITION_STYLES[state]} ${
                  listOptions.className ?? ''
                }`}
                close={close}
                shouldFocus={state === 'entered' && isOpen}
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
