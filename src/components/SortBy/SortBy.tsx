import React, { useId } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectIcon } from '../ui/Icons';
import './SortBy.scss';
import Select from '../../component-library/Select';

type TSortByProps = {
  className?: string;
  options: { value: string; text: string }[];
  label?: React.ReactNode;
};
function SortBy({ className, options, label }: TSortByProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const id = useId();
  const selectId = id + '-select';

  function handleChange(value: string) {
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
  }

  return (
    <div className={['sort-by', className].filter(Boolean).join(' ')}>
      {label && (
        <span className="sort-by__label">
          <label htmlFor={selectId}>{`${label}:`}</label>
        </span>
      )}
      <Select
        className={['sort-by__select', !label && 'sort-by__select_full-width']
          .filter(Boolean)
          .join(' ')}
        iconSelect={<SelectIcon />}
        id={selectId}
        onChange={handleChange}
        value={sortBy}
      >
        {options.map((sort) => (
          <Select.Option key={sort.value} value={sort.value}>
            {sort.text}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default SortBy;
