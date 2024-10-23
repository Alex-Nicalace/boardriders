import { LocationIcon, SelectIcon } from '../../ui/Icons';
import './DeliveryRegion.scss';
import Select from '../../../component-library/Select';

interface IDeliveryRegionProps {
  className?: string;
  selected: string;
  list: { id: number; name: string }[];
  label?: string;
  onChange: (id: string) => void;
}

function DeliveryRegion({
  className,
  selected,
  list,
  label = 'Ваш регион доставки:',
  onChange,
}: IDeliveryRegionProps): JSX.Element {
  return (
    <div className={['delivery-region', className].filter(Boolean).join(' ')}>
      <label htmlFor="delivery-region" className="delivery-region__label">
        <LocationIcon className="delivery-region__icon" />
        <span className="delivery-region__text">{label}</span>
      </label>
      <Select
        className="delivery-region__select"
        name="delivery-region"
        id="delivery-region"
        value={selected}
        onChange={onChange}
        iconSelect={<SelectIcon />}
      >
        {list.map((item) => (
          <Select.Option key={item.id} value={`${item.id}`}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default DeliveryRegion;
