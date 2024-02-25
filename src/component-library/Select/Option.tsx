import { useSelectContext } from './useSelectContext';
import './Option.scss';

export type OptionProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};
function Option({ children, value, className = '' }: OptionProps): JSX.Element {
  const { onClickOfListItem, selected } = useSelectContext();
  const isSelected = Array.isArray(selected)
    ? selected.includes(value)
    : selected === value;

  return (
    <li
      className={`${className} options__item ${
        isSelected ? 'options__item_selected' : ''
      }`}
      onClick={() => onClickOfListItem(value)}
      data-value={value}
      role="option"
      aria-selected={isSelected ? true : false}
    >
      {children}
    </li>
  );
}

export default Option;
