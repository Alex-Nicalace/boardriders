import StepNumber from '../StepNumber';
import './MakeOrderStep.scss';

type TMakeOrderStepProps = {
  children: React.ReactNode;
  isDone?: boolean;
  disabled?: boolean;
  stepNum: number;
  name: string;
};
function MakeOrderStep({
  children,
  isDone,
  disabled,
  stepNum,
  name,
}: TMakeOrderStepProps): JSX.Element {
  return (
    <div className="make-order-step">
      <header className="make-order-step__header">
        <StepNumber stepNum={stepNum} isDone={isDone} disabled={disabled} />
        <h3 className="make-order-step__title">{name}</h3>
        {isDone && (
          <button className="make-order-step__btn-edit">Изменить</button>
        )}
      </header>
      {!disabled && <div className="make-order-step__content">{children}</div>}
    </div>
  );
}

export default MakeOrderStep;
