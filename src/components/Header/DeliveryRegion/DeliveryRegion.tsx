import { useState } from 'react';

import { LocationIcon } from '../../ui/Icons';
import Select from '../../ui/Select';
import Option from '../../ui/Option';
import './DeliveryRegion.scss';

interface IDeliveryRegionProps {
  className?: string;
}

function DeliveryRegion({ className }: IDeliveryRegionProps): JSX.Element {
  const [city, setCity] = useState('Москва');

  function handleChangeCity(value: string) {
    setCity(value);
  }

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
        value={city}
        onChange={handleChangeCity}
      >
        <Option value="Москва">Москва</Option>
        <Option value="Санкт-Петербург">Санкт-Петербург</Option>
        <Option value="Пенза">Пенза</Option>
      </Select>
    </div>
  );
}

export default DeliveryRegion;
