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
  selected: string;
  close(): void;
  setSelected: (value: ISelectContext['selected']) => void;
  isLockScroll: boolean;
  triggerEl: Element | null;
  isClosing: boolean;
  closing(): void;
}

export const SelectContext = createContext<ISelectContext>({
  selected: '',
  close() {},
  setSelected() {},
  isLockScroll: true,
  triggerEl: null,
  isClosing: false,
  closing() {},
});

type SelectProps = {
  children: ReactElement<OptionProps>[] | ReactElement<OptionProps>;
  value?: string;
  initValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  className?: string;
  listOptions?: {
    className?: string;
  };
  iconElement: JSX.Element;
  isLockScroll?: boolean;
};
function Select({
  children,
  value,
  initValue,
  onChange = () => {},
  name,
  id,
  className,
  iconElement,
  isLockScroll = true,
  listOptions = {},
}: SelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [valueInner, setValueInner] = useState(initValue ?? '');
  const [triggerEl, setTriggerEl] = useState<Element | null>(null);

  const selected = value ?? valueInner;
  const setSelected = value === undefined ? setValueInner : onChange;

  const close = () => {
    setIsOpen(false);
    setIsClosing(false);
  };
  const closing = () => setIsClosing(true);

  const toggle = () => {
    if (isOpen) {
      closing();
    } else {
      setIsOpen(true);
    }
  };

  const optionSelectedTemp = Children.toArray(children).find(
    (child) =>
      isValidElement<OptionProps>(child) && child.props.value === selected
  );
  const optionSelected =
    isValidElement<OptionProps>(optionSelectedTemp) &&
    optionSelectedTemp?.props.children;

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!(e.target instanceof Element)) return;

    toggle();
    const selectEl = e.target.closest('.select');
    if (!selectEl) return;

    setTriggerEl(selectEl);
  }

  return (
    <SelectContext.Provider
      value={{
        selected,
        close,
        setSelected,
        isLockScroll,
        triggerEl,
        isClosing,
        closing,
      }}
    >
      <div className={`${className} select ${isOpen ? 'select_opened' : ''}`}>
        <div className="select__wrapper" onClick={handleClick}>
          <div className="select__value">{optionSelected}</div>
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
