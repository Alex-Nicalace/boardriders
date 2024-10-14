import { formaterDateWithWeekday } from '../../utils/formaters';
import './DeliveryCourierData.scss';

type TDeliveryCourierDataProps = {
  street: string;
  building: string;
  apartment: string;
  entrance: string;
  floor: string;
  dateDelivery: Date;
  timeDelivery: string;
};
function DeliveryCourierData({
  street,
  building,
  apartment,
  entrance,
  floor,
  dateDelivery,
  timeDelivery,
}: TDeliveryCourierDataProps): JSX.Element {
  const address = [
    street,
    building,
    apartment && 'кв. ' + apartment,
    entrance && 'подъезд ' + entrance,
    floor && 'этаж ' + floor,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="delivery-courier-data">
      <p className="delivery-courier-data__address">{address}</p>
      <p className="delivery-courier-data__box-date">
        <span className="delivery-courier-data__label-date">
          Дата получения:
        </span>
        <span className="delivery-courier-data__date">
          {formaterDateWithWeekday(dateDelivery)}, {timeDelivery}
        </span>
      </p>
    </div>
  );
}

export default DeliveryCourierData;
