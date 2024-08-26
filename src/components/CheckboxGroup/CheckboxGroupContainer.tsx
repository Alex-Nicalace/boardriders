import { useSearchParams } from 'react-router-dom';
import ColorLabel from '../ColorLabel';
import { TFilterItem } from '../Filters';
import CheckboxGroup from './CheckboxGroup';
import { TCheckboxGroupProps } from './CheckboxGroup.types';

type TCheckboxGroupContainerProps = Omit<
  TCheckboxGroupProps,
  'checkedValues' | 'items'
> & {
  items: TFilterItem[];
};
function CheckboxGroupContainer({
  name,
  isSearchable,
  items,
  className,
  type,
}: TCheckboxGroupContainerProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const checkedValues = searchParams.get(name)?.split(',') ?? [];

  function handleChange(value: string) {
    const newValues = checkedValues.includes(value)
      ? checkedValues.filter((item) => item !== value)
      : [...checkedValues, value];

    if (newValues.length === 0) {
      searchParams.delete(name);
    } else {
      searchParams.set(name, newValues.join(','));
    }

    searchParams.delete('page');

    setSearchParams(searchParams);
  }

  return (
    <CheckboxGroup
      className={className}
      items={
        name === 'color'
          ? items.map((item) => {
              const [id, hexValue] = item.value.split('|');
              return {
                ...item,
                value: id,
                title: (
                  <ColorLabel color={hexValue} label={item.title ?? hexValue} />
                ),
              };
            })
          : items
      }
      checkedValues={checkedValues}
      name={name}
      isSearchable={isSearchable}
      type={type}
      onChange={handleChange}
    />
  );
}

export default CheckboxGroupContainer;
