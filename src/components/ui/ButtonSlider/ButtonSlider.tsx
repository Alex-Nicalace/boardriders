import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import './ButtonSlider.scss';

interface IButtonSliderProps {
  direction?: 'left' | 'right';
  className?: string;
}
function ButtonSlider({
  direction = 'left',
  className = '',
}: IButtonSliderProps): JSX.Element {
  return (
    <button className={`button-slider ${className}`}>
      {direction === 'left' && <ArrowLeftIcon />}
      {direction === 'right' && <ArrowRightIcon />}
    </button>
  );
}

export default ButtonSlider;
