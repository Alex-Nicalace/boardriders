import './MakeOrder.scss';
import MakeOrderStep from '../MakeOrderStep';
import PaymentOption from '../PaymentOption';
import DeliveryOptionContainer from '../../features/delivery/DeliveryOptionContainer';
import ContactOption from '../ContactOption';
import DeliveryCourierData from '../DeliveryCourierData';
import ContactBuyerData from '../ContactBuyerData';

const ELEMENTS = [
  [
    <DeliveryOptionContainer />,
    <DeliveryCourierData
      street="ул. Ленина"
      building="д. 1"
      dateDelivery={new Date()}
      timeDelivery="10:00"
      apartment="1"
      entrance="1"
      floor="2"
    />,
  ],
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
};
function MakeOrder({ stepsData }: TMakeOrderProps): JSX.Element {
  return (
    <ol className="make-order">
      {stepsData.map((item, index) => (
        <li key={item.nameStep} className="make-order__step">
          <MakeOrderStep
            stepNum={index + 1}
            name={item.nameStep}
            isDone={item.isDone}
            disabled={item.disabled}
          >
            {ELEMENTS[index][+item.isDone]}
          </MakeOrderStep>
        </li>
      ))}
    </ol>
  );
}

export default MakeOrder;
