import PaymentOption from '../../components/PaymentOption';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { TPaymentData } from '../../types';
import { getOrderDataOnStep, setOrderTwoStep } from './makeOrderSlice';

// type TPaymentOptionContainerProps = { }
function PaymentOptionContainer(/*{ }: TPaymentOptionContainerProps*/): JSX.Element {
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector(getOrderDataOnStep(1));

  function handleSubmit(data: TPaymentData) {
    dispatch(setOrderTwoStep(data));
  }

  return (
    <PaymentOption onSubmit={handleSubmit} defaultValues={defaultValues} />
  );
}

export default PaymentOptionContainer;
