import React, { useMemo, useState } from 'react';
import './FilterFieldset.scss';
import Details from '../../component-library/Details';
import InputStyled from '../ui/InputStyled';
import Checkbox from '../ui/Checkbox';
import extractTextFromReactNode from '../../utils/extractTextFromReactNode';

type TFilterFieldsetProps = {
  data: {
    label: string;
    name: string;
    items: {
      value: string;
      label?: React.ReactNode;
      count?: number;
      hint?: React.ReactNode;
    }[];
  };
  className?: string;
  defaultOpen?: boolean;
  isSearchable?: boolean;
};
function FilterFieldset({
  data,
  className = '',
  defaultOpen = false,
  isSearchable = false,
}: TFilterFieldsetProps) {
  const { label, name, items } = data;
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
    <Details
      defaultOpen={defaultOpen}
      className={`filter-fieldset ${className}`}
      summaryNode={
        <>
          {label}
          <span className="filter-fieldset__summary-marker"></span>
        </>
      }
      summaryProps={{ className: 'filter-fieldset__summary' }}
      contentNode={
        <>
          {isSearchable && (
            <InputStyled
              className="filter-fieldset__search"
              value={serachValue}
              onChange={(e) => setSerachValue(e.target.value)}
              placeholder="Поиск"
              type="search"
            />
          )}
          <div className="filter-fieldset__inner">
            {itemsFiltered.map((item) => (
              <Checkbox
                className="filter-fieldset__filter"
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
        </>
      }
      contentProps={{ className: 'filter-fieldset__content' }}
    />
  );
}

export default FilterFieldset;
