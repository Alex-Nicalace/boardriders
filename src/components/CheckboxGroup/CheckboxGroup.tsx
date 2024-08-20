import { useMemo, useState } from 'react';
import './CheckboxGroup.scss';
import InputStyled from '../ui/InputStyled';
import extractTextFromReactNode from '../../utils/extractTextFromReactNode';
import Checkbox from '../ui/Checkbox';
import { TCheckboxGroupProps } from './CheckboxGroup.types';

function CheckboxGroup({
  isSearchable,
  items,
  checkedValues,
  name,
  className,
  type,

  onChange,
}: TCheckboxGroupProps): JSX.Element {
  const [serachValue, setSerachValue] = useState('');

  const itemsFiltered = useMemo(() => {
    if (!serachValue) return items;

    return items.filter((item) =>
      (item.title ? extractTextFromReactNode(item.title) : item.value)
        .toLowerCase()
        .includes(serachValue.toLowerCase())
    );
  }, [items, serachValue]);

  return (
    <div className={['checkbox-group', className].filter(Boolean).join(' ')}>
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
            checked={checkedValues?.includes(item.value)}
            label={
              item.count ? (
                <Checkbox.LabelAmount
                  label={item.title ?? item.value}
                  count={item.count}
                />
              ) : (
                item.title ?? item.value
              )
            }
            hint={item.hint}
            onChange={() => onChange?.(item.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;
