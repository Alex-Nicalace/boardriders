import { useMemo, useState } from 'react';
import './CheckboxGroup.scss';
import InputStyled from '../ui/InputStyled';
import extractTextFromReactNode from '../../utils/extractTextFromReactNode';
import Checkbox from '../ui/Checkbox';

type TCheckboxGroupProps = {
  name: string;
  isSearchable?: boolean;
  items: {
    value: string;
    label?: React.ReactNode;
    count?: number;
    hint?: React.ReactNode;
  }[];
  className?: string;
  type?: 'checkbox' | 'radio';
};
function CheckboxGroup({
  isSearchable,
  items,
  name,
  className = '',
  type,
}: TCheckboxGroupProps): JSX.Element {
  const [serachValue, setSerachValue] = useState('');

  const itemsFiltered = useMemo(() => {
    if (!serachValue) return items;

    return items.filter((item) =>
      (item.label ? extractTextFromReactNode(item.label) : item.value)
        .toLowerCase()
        .includes(serachValue.toLowerCase())
    );
  }, [items, serachValue]);

  return (
    <div className={`checkbox-group ${className}`}>
      {isSearchable && (
        <InputStyled
          className="checkbox-group__search"
          value={serachValue}
          onChange={(e) => setSerachValue(e.target.value)}
          placeholder="Поиск"
          type="search"
        />
      )}
      <div className="checkbox-group__list">
        {itemsFiltered.map((item) => (
          <Checkbox
            type={type}
            className="checkbox-group__filter"
            key={item.value}
            name={name}
            value={item.value}
            label={
              item.count ? (
                <Checkbox.LabelAmount
                  label={item.label ?? item.value}
                  count={item.count}
                />
              ) : (
                item.label ?? item.value
              )
            }
            hint={item.hint}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;
