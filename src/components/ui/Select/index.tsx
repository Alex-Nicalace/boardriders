import React, {
  Children,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IOptionProps } from '../Option';
import { visibilityScrollDocument } from '../../../utils/visibilityScrollDocument';
import styles from './select.module.scss';
import './select.scss';
import { SelectIcon } from '../Icons';

interface ISelectProps {
  children: ReactElement<IOptionProps> | ReactElement<IOptionProps>[];
  value?: string;
  IconElement?: JSX.Element;
  onChange?: (value: string) => void;
  optionsStyle?: React.CSSProperties;
  name?: string;
  id?: string;
  className?: string;
}
function Select({
  children,
  value,
  IconElement = <SelectIcon />,
  onChange = () => {},
  optionsStyle = {},
  name,
  id,
  className,
}: ISelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // поиск элемента из выпадающего списка который соотвестветвует выбранному значению
  const element = Children.toArray(children).find(
    (el) => React.isValidElement(el) && el.props.value === value
  );
  // достать внутренность из элемента
  const valueEl = React.isValidElement(element) ? element.props.children : null;

  function handleToggleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  useEffect(
    function () {
      if (isOpen) {
        return visibilityScrollDocument.hide();
      } else {
        visibilityScrollDocument.visible();
      }
    },
    [isOpen]
  );

  useEffect(
    function () {
      if (!isOpen) return;

      function handleClickOutside(e: MouseEvent) {
        if (
          selectRef.current &&
          !selectRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          document.removeEventListener('click', handleClickOutside);
        }
      }
      document.addEventListener('click', handleClickOutside);
    },
    [isOpen]
  );

  return (
    <div
      ref={selectRef}
      className={`${className ? className + ' ' : ''}select ${
        isOpen ? 'select_opened' : ''
      } ${styles.select}`}
      onClick={handleToggleOpen}
    >
      <div className="select__wrapper">
        <div className="select__value">{valueEl}</div>
        <div className="select__icon">{IconElement}</div>
        <input
          key={value}
          className="select__input"
          aria-hidden={true}
          tabIndex={-1}
          aria-invalid={false}
          defaultValue={value}
          name={name}
          id={id}
        />
      </div>

      {isOpen && (
        <div className="select__list" tabIndex={-1}>
          <ul
            className="select__options"
            role="listbox"
            tabIndex={-1}
            style={optionsStyle}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                const isSelected = child.props.value === value;
                return React.cloneElement(child, {
                  isSelected,
                  className: isSelected ? 'option_selected' : '',
                  onClick: () => onChange(child.props.value),
                });
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Select;
