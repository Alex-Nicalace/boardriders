import ContactOption from '../../components/ContactOption';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { TContactsData } from '../../types';
import { getOrderDataOnStep, setOrderThreeStep } from './makeOrderSlice';

// type TContactOptionContainerProps = { }
function ContactOptionContainer(/*{ }: TContactOptionContainerProps*/): JSX.Element {
  const contactsData = useAppSelector(getOrderDataOnStep(2));
  const dispatch = useAppDispatch();

  function handleSubmit(data: TContactsData) {
    dispatch(setOrderThreeStep(data));
  }

  return <ContactOption defaultValues={contactsData} onSubmit={handleSubmit} />;
}

export default ContactOptionContainer;
