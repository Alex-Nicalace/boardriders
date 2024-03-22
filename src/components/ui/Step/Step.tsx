import './Step.scss';
type TStepProps = {
  className?: string;
  children?: React.ReactNode;
};
function Step({ className = '', children }: TStepProps): JSX.Element {
  return (
    <div className={`${className} step`}>
      <div className="step__wrap">
        <div className="step__content">{children}</div>
      </div>
    </div>
  );
}

export default Step;
