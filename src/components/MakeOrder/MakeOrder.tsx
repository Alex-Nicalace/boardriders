import './MakeOrder.scss';
import MakeOrderStep from '../MakeOrderStep';
import DeliveryOptionContainer from '../../features/makeOrder/DeliveryOptionContainer';
import DeliveryData from '../../features/makeOrder/DeliveryData';
import PaymentOptionContainer from '../../features/makeOrder/PaymentOptionContainer';
import { TGetMakeOrderStepsReturn } from '../../types';
import ContactBuyerDataContainer from '../../features/makeOrder/ContactBuyerDataContainer';
import ContactOptionContainer from '../../features/makeOrder/ContactOptionContainer';

const ELEMENTS = [
  [<DeliveryOptionContainer />, <DeliveryData />],
  [<PaymentOptionContainer />, null],
  [<ContactOptionContainer />, <ContactBuyerDataContainer />],
];
type TMakeOrderProps = {
  stepsData: TGetMakeOrderStepsReturn[];
  editOnStep?: (numStep: number) => void;
};
function MakeOrder({ stepsData, editOnStep }: TMakeOrderProps): JSX.Element {
  return (
    <ol className="make-order">
      {stepsData.map((item, index) => (
        <li key={item.nameStep} className="make-order__step">
          <MakeOrderStep
            stepNum={index + 1}
            name={
              item.isDone ? item.donedNameStep || item.nameStep : item.nameStep
            }
            isDone={item.isDone}
            disabled={item.disabled}
            onClickEditStep={() => editOnStep?.(index)}
          >
            {ELEMENTS[index][+item.isDone]}
          </MakeOrderStep>
        </li>
      ))}
    </ol>
  );
}

export default MakeOrder;
