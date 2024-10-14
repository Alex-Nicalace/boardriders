import './MakeOrder.scss';
import MakeOrderStep from '../MakeOrderStep';
import PaymentOption from '../PaymentOption';
import DeliveryOptionContainer from '../../features/makeOrder/DeliveryOptionContainer';
import ContactOption from '../ContactOption';
import ContactBuyerData from '../ContactBuyerData';
import DeliveryData from '../../features/makeOrder/DeliveryData';

const ELEMENTS = [
  [<DeliveryOptionContainer />, <DeliveryData />],
  [<PaymentOption />, <PaymentOption />],
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
  stepsData: { nameStep: string; isDone: boolean; disabled: boolean }[];
  onChangeStep?: (numStep: number) => void;
};
function MakeOrder({ stepsData, onChangeStep }: TMakeOrderProps): JSX.Element {
  return (
    <ol className="make-order">
      {stepsData.map((item, index) => (
        <li key={item.nameStep} className="make-order__step">
          <MakeOrderStep
            stepNum={index + 1}
            name={item.nameStep}
            isDone={item.isDone}
            disabled={item.disabled}
            onChangeStep={() => onChangeStep?.(index)}
          >
            {ELEMENTS[index][+item.isDone]}
          </MakeOrderStep>
        </li>
      ))}
    </ol>
  );
}

export default MakeOrder;
