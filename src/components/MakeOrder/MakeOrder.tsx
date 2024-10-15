import './MakeOrder.scss';
import MakeOrderStep from '../MakeOrderStep';
import DeliveryOptionContainer from '../../features/makeOrder/DeliveryOptionContainer';
import ContactOption from '../ContactOption';
import ContactBuyerData from '../ContactBuyerData';
import DeliveryData from '../../features/makeOrder/DeliveryData';
import PaymentOptionContainer from '../../features/makeOrder/PaymentOptionContainer';
import { TGetMakeOrderStepsReturn } from '../../types';

const ELEMENTS = [
  [<DeliveryOptionContainer />, <DeliveryData />],
  [<PaymentOptionContainer />, null],
  [
    <ContactOption />,
    <ContactBuyerData
      name="Иванов Иван Иванович"
      phone="+7 (495) 967 96 23"
      email="Xjz6H@example.com"
      comment="Пожалуйста, мне нужен товар в целой коробке, беру на подарок"
    />,
  ],
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
            name={item.isDone ? item.donedNameStep : item.nameStep}
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
