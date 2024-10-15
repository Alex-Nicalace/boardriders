import ContactBuyerData from '../../components/ContactBuyerData';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getOrderDataOnStep } from './makeOrderSlice';

// type TContactBuyerDataContainerProps = { }
function ContactBuyerDataContainer(/*{ }: TContactBuyerDataContainerProps*/): JSX.Element {
  const contactsData = useAppSelector(getOrderDataOnStep(2));

  return <ContactBuyerData {...contactsData} />;
}

export default ContactBuyerDataContainer;
