import MakeOrder from '../../components/MakeOrder';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getMakeOrderSteps, setStepNotDone } from './makeOrderSlice';

// type TMakeOrderContainerProps = { }
function MakeOrderContainer(/*{ }: TMakeOrderContainerProps*/): JSX.Element {
  const stepsData = useAppSelector(getMakeOrderSteps);
  const dispatch = useAppDispatch();

  function handleChangeStep(stepNum: number) {
    dispatch(setStepNotDone(stepNum));
  }

  return <MakeOrder stepsData={stepsData} editOnStep={handleChangeStep} />;
}

export default MakeOrderContainer;
