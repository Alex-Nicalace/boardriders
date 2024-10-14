import MakeOrder from '../../components/MakeOrder';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getMakeOrderSteps } from './makeOrderSlice';

// type TMakeOrderContainerProps = { }
function MakeOrderContainer(/*{ }: TMakeOrderContainerProps*/): JSX.Element {
  const stepsData = useAppSelector(getMakeOrderSteps);

  return <MakeOrder stepsData={stepsData} />;
}

export default MakeOrderContainer;
