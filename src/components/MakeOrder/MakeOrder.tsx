import './MakeOrder.scss';
import DeliveryOption from '../DeliveryOption';
import MakeOrderStep from '../MakeOrderStep';
import PaymentOption from '../PaymentOption';
import ContactBuyerData from '../ContactBuyerData';

// type TMakeOrderProps = { }
function MakeOrder(/*{ }: TMakeOrderProps*/): JSX.Element {
  return (
    <ol className="make-order">
      <li className="make-order__step">
        <MakeOrderStep stepNum={1} name="Доставка">
          <DeliveryOption />
          {/* когда данные введены пользователем рендерить этот компонент */}
          {/* <DeliveryCourierData
            street="ул. Ленина"
            building="д. 1"
            dateDelivery={new Date()}
            timeDelivery="10:00"
            apartment="1"
            entrance="1"
            floor="2"
          /> */}
        </MakeOrderStep>
      </li>
      <li className="make-order__step">
        <MakeOrderStep stepNum={2} name="Оплата">
          <PaymentOption />
        </MakeOrderStep>
      </li>
      <li className="make-order__step">
        <MakeOrderStep stepNum={3} name="Контакты">
          {/* <ContactOption /> */}
          {/* когда данные введены пользователем рендерить этот компонент */}
          <ContactBuyerData
            name="Иванов Иван Иванович"
            phone="+7 (495) 967 96 23"
            email="Xjz6H@example.com"
            comment="Пожалуйста, мне нужен товар в целой коробке, беру на подарок"
          />
        </MakeOrderStep>
      </li>
    </ol>
  );
}

export default MakeOrder;
