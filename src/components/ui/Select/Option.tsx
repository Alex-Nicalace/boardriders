import { useSelectContext } from './useSelectContext';

export type OptionProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};
export function Option({
  children,
  value,
  className = '',
}: OptionProps): JSX.Element {
  const { setSelected, closing, selected } = useSelectContext();
  const isSelected = selected === value;

  function handleClick() {
    setSelected(value);
    closing();
  }

  return (
    <li
      className={`${className} options__item ${
        isSelected ? 'options__item_selected' : ''
      }`}
      onClick={handleClick}
      data-value={value}
      role="option"
      aria-selected={isSelected ? true : false}
    >
      {children}
    </li>
  );
}
