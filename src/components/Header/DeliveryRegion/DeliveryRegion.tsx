import { LocationIcon, SelectIcon } from '../../ui/Icons';
import './DeliveryRegion.scss';
import Select from '../../../component-library/Select/Select';

interface IDeliveryRegionProps {
  className?: string;
}

function DeliveryRegion({ className }: IDeliveryRegionProps): JSX.Element {
  return (
    <div className={`${className} delivery-region`}>
      <label htmlFor="delivery-region" className="delivery-region__label">
        <LocationIcon className="delivery-region__icon" />
        <span className="delivery-region__text">Ваш регион доставки:</span>
      </label>
      <Select
        className="delivery-region__select"
        name="delivery-region"
        id="delivery-region"
        // value={city}
        initValue="20"
        // onChange={handleChangeCity}
        iconElement={<SelectIcon />}
      >
        <Select.Option value="10">Москва</Select.Option>
        <Select.Option value="20">Санкт-Петербург</Select.Option>
        <Select.Option value="30">Пенза</Select.Option>
      </Select>
    </div>
  );
}

export default DeliveryRegion;
