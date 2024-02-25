import {
  Children,
  ReactElement,
  createContext,
  isValidElement,
  useState,
} from 'react';
import './Select.scss';
import { ListOptions } from './ListOptions';
import { OptionProps, Option } from './Option';

interface ISelectContext {
  selected: string | string[] | undefined;
  close(): void;
  onClickOfListItem: (value: string) => void;
  isLockScroll: boolean;
  triggerEl: Element | null;
  isClosing: boolean;
  closing(): void;
}

export const SelectContext = createContext<ISelectContext>({
  selected: '',
  close() {},
  onClickOfListItem() {},
  isLockScroll: true,
  triggerEl: null,
  isClosing: false,
  closing() {},
});

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
  placreholder?: string;
};

// type TSelectProps = {
//   children: ReactElement<OptionProps>[] | ReactElement<OptionProps>;
//   value?: string;
//   initValue?: string;
//   onChange?: (value: string) => void;
//   name?: string;
//   id?: string;
//   className?: string;
//   listOptions?: {
//     className?: string;
//   };
//   iconElement: JSX.Element;
//   isLockScroll?: boolean;
// };
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
    className,
    iconElement,
    isLockScroll = true,
    listOptions = {},
    placreholder = 'Выберите...',
    iconItemRemove = '✕',
    isCloseDropdownWhenClicked = false,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [valueInner, setValueInner] = useState<string | string[] | undefined>(
    props.isMulti ? props.initValue ?? [] : props.initValue ?? ''
  );
  const [triggerEl, setTriggerEl] = useState<Element | null>(null);

  const selected = props.value ?? valueInner;

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
    if (!selected || selected.length === 0) {
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
    setIsClosing(false);
  }
  function closing() {
    setIsClosing(true);
  }

  function toggle() {
    if (isOpen) {
      closing();
    } else {
      setIsOpen(true);
    }
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

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!(e.target instanceof Element)) return;
    // в ражиме мультиселекта игнорируем клик на кнопку удаления одного из ранее выбранных элементов
    if (e.target.closest('.select__item-remove')) return;

    toggle();
    const selectEl = e.target.closest('.select');
    if (!selectEl) return;

    setTriggerEl(selectEl);
  }

  function handleClickOfListItem(value: string) {
    setSelected(value);
    if (isCloseDropdownWhenClicked) {
      closing();
    }
  }

  return (
    <SelectContext.Provider
      value={{
        selected,
        close,
        onClickOfListItem: handleClickOfListItem,
        isLockScroll,
        triggerEl,
        isClosing,
        closing,
      }}
    >
      <div className={`${className} select ${isOpen ? 'select_opened' : ''}`}>
        <div className="select__wrapper" onClick={handleClick}>
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
          />
        </div>
        {isOpen && (
          <ListOptions className={listOptions.className}>
            {children}
          </ListOptions>
        )}
      </div>
    </SelectContext.Provider>
  );
}

Select.Option = Option;

export default Select;
