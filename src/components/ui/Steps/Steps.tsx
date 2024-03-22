import { AnthropometricIcon, DynamicsIcon, MountainIcon } from '../Icons';
import Step from '../Step';
import StepQuestion from '../StepQuestion';
import './Steps.scss';

const STEPS = [
  {
    numStep: 1,
    question: 'Укажите свой рост и вес',
    answerNode: (
      <>
        <span>Рост: 190 см</span>
        <span>Вес: 300кг</span>
      </>
    ),
    iconElement: <AnthropometricIcon />,
    isFilled: true,
  },
  {
    numStep: 2,
    question: 'Где планируете катать',
    answerNode: 'Укажите место',
    iconElement: <MountainIcon />,
  },
  {
    numStep: 3,
    question: 'Ваш уровень катании',
    answerNode: 'Укажите ваш уровень',
    iconElement: <DynamicsIcon />,
  },
];
type TStepsProps = { className?: string };
function Steps({ className = '' }: TStepsProps): JSX.Element {
  return (
    <div className={`steps ${className}`}>
      <Step className="steps__step">
        <StepQuestion intro="Подбери борд" />
      </Step>
      {STEPS.map((step) => (
        <Step
          key={step.numStep}
          className="steps__step"
          isFilled={step.isFilled}
        >
          <StepQuestion {...step} />
        </Step>
      ))}
    </div>
  );
}

export default Steps;
