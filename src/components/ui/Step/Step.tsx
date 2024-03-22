import './Step.scss';
type TStepProps = {
  className?: string;
  children?: React.ReactNode;
  isFilled?: boolean;
};
function Step({ className = '', children, isFilled }: TStepProps): JSX.Element {
  return (
    <div className={`${className} step ${isFilled ? 'step_filled' : ''}`}>
      <div className="step__wrap">
        <div className="step__content">{children}</div>
      </div>
    </div>
  );
}

export default Step;
