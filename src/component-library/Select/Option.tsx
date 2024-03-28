import { useSelectContext } from './useSelectContext';
import './Option.scss';

const KEY_MAP = {
  ArrowDown: 1,
  ArrowUp: -1,
};

export type OptionProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};
function Option({ children, value, className = '' }: OptionProps): JSX.Element {
  const { clickItem, selected, getMapItems } = useSelectContext();
  const isSelected = Array.isArray(selected)
    ? selected.includes(value)
    : selected === value;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const itemsArr = Array.from(getMapItems());
      const index = itemsArr.findIndex(([key]) => key === value);
      const nextIndex = index + KEY_MAP[e.key];
      itemsArr[nextIndex]?.[1].focus();

      if (nextIndex === -1 && e.currentTarget instanceof HTMLElement) {
        setFocusSearchInput(e.currentTarget);
      }
    }
    if (e.key === 'Enter') {
      clickItem(value);
    }
  }

  function setFocusSearchInput(itemElement: HTMLElement) {
    itemElement.parentElement?.previousElementSibling
      ?.querySelector('input')
      ?.focus();
  }

  return (
    <li
      ref={(node) => {
        const map = getMapItems();
        if (node) {
          map.set(value, node);
        } else {
          map.delete(value);
        }
      }}
      className={`${className} options__item ${
        isSelected ? 'options__item_selected' : ''
      }`}
      onClick={() => clickItem(value)}
      onKeyDown={handleKeyDown}
      data-value={value}
      role="option"
      aria-selected={isSelected ? true : false}
      tabIndex={-1}
    >
      {children}
    </li>
  );
}

export default Option;
