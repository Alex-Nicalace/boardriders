import { ButtonHTMLAttributes, useState } from 'react';
import './ToggleButton.scss';
import { SelectIcon } from '../ui/Icons';

type TToggleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  onClick?: () => void;
  isNotShowIcon?: boolean;
  labelActive: string;
  labelNotActive?: string;
};
function ToggleButton({
  className = '',
  // isActive = false,
  // onClick = () => {},
  isNotShowIcon = false,
  labelActive,
  labelNotActive,
  ...props
}: TToggleButtonProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      {...props}
      className={`toggle-button ${className} ${
        isActive ? 'toggle-button_active' : ''
      } ${!isNotShowIcon ? 'toggle-button_icon' : ''}`}
      onClick={() => {
        setIsActive(!isActive);
      }}
      type="button"
    >
      {!isNotShowIcon && <SelectIcon className="toggle-button__icon" />}
      <span className="toggle-button__text">
        {isActive ? labelActive : labelNotActive ?? labelActive}
      </span>
    </button>
  );
}

export default ToggleButton;
