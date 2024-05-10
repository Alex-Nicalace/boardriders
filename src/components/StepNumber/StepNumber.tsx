import './StepNumber.scss';
import { CheckStepIcon } from '../ui/Icons';

type TStepNumberProps = {
  className?: string;
  isDone?: boolean;
  disabled?: boolean;
  stepNum?: number;
};
function StepNumber({
  className = '',
  isDone,
  disabled,
  stepNum,
}: TStepNumberProps): JSX.Element {
  const classes = ['step-number', disabled && 'step-number_disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>{isDone ? <CheckStepIcon /> : stepNum}</span>
  );
}

export default StepNumber;
