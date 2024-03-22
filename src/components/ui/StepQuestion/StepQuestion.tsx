import './StepQuestion.scss';

type TStepQuestionProps =
  | {
      question: string;
      numStep: number;
      answerNode: React.ReactNode;
      iconElement: JSX.Element;
      intro?: never;
    }
  | {
      question?: never;
      numStep?: never;
      answerNode?: never;
      iconElement?: never;
      intro: string;
    };
function StepQuestion({
  question,
  numStep,
  answerNode,
  iconElement,
  intro,
}: TStepQuestionProps): JSX.Element {
  return (
    <div className={`step-question ${intro ? 'step-question_intro' : ''}`}>
      {intro}
      {question && <div className="step-question__question">{question}</div>}
      {numStep && <div className="step-question__num-step">{numStep}</div>}
      {answerNode && <div className="step-question__answer">{answerNode}</div>}
      {iconElement && <div className="step-question__icon">{iconElement}</div>}
    </div>
  );
}

export default StepQuestion;
