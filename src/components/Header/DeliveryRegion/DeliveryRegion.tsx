import { LocationIcon, SelectIcon } from '../../ui/Icons';
import './DeliveryRegion.scss';
import Select from '../../../component-library/Select';
import DeliveryRegionListProvider from '../../../features/deliveryRegion/DeliveryRegionListProvider';

interface IDeliveryRegionProps {
  className?: string;
}

function DeliveryRegion({ className }: IDeliveryRegionProps): JSX.Element {
  return (
    <div className={['delivery-region', className].filter(Boolean).join(' ')}>
      <label htmlFor="delivery-region" className="delivery-region__label">
        <LocationIcon className="delivery-region__icon" />
        <span className="delivery-region__text">Ваш регион доставки:</span>
      </label>
      <DeliveryRegionListProvider
        render={(deliveryRegionList, currentDeliveryRegionId, handleChange) => (
          <Select
            className="delivery-region__select"
            name="delivery-region"
            id="delivery-region"
            value={`${currentDeliveryRegionId}`}
            onChange={(value) => handleChange?.(Number(value))}
            iconSelect={<SelectIcon />}
          >
            {deliveryRegionList.map((item) => (
              <Select.Option key={item.id} value={`${item.id}`}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        )}
      />
    </div>
  );
}

export default DeliveryRegion;
