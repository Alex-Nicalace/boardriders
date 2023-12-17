import './Option.scss';

export interface IOptionProps {
  children: React.ReactNode;
  value: string;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

function Option({
  children,
  value,
  isSelected,
  className,
  onClick = () => {},
}: IOptionProps): JSX.Element {
  return (
    <li
      className={`option ${className}`}
      role="option"
      aria-selected={isSelected ? true : false}
      data-value={value}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default Option;
