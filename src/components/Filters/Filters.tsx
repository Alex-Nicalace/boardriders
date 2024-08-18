import { TFiltersProps } from './Filters.types';
import CollapsiblePanel from '../CollapsiblePanel';
import CheckboxGroup from '../CheckboxGroup';
import RangeSelector from '../RangeSelector';
import './Filters.scss';
import DataProvider from '../../features/DataProvider';
import ColorLabel from '../ColorLabel';

function Filters({ data, className }: TFiltersProps): JSX.Element {
  return (
    <div className={['filters', className].filter(Boolean).join(' ')}>
      {data.map((filter) => (
        <CollapsiblePanel
          key={filter.name}
          defaultOpen={true}
          className="filters__filter"
          sammary={filter.title}
        >
          {/* если данные надо тянуть с сервера */}
          {filter.useCallbackData && (
            <DataProvider useCallbackData={filter.useCallbackData}>
              {(data) => (
                <>
                  {!!data?.length && (
                    <CheckboxGroup
                      className="filters__params"
                      items={
                        filter.name === 'color'
                          ? data.map((item) => ({
                              ...item,
                              title: (
                                <ColorLabel
                                  color={item.value}
                                  label={item.title ?? item.value}
                                />
                              ),
                            }))
                          : data
                      }
                      name={filter.name}
                      isSearchable={filter.isSearchable}
                      type={filter.type}
                    />
                  )}
                </>
              )}
            </DataProvider>
          )}
          {/* если данные статичные  */}
          {filter.items && (
            <CheckboxGroup
              className="filters__params"
              items={filter.items}
              name={filter.name}
              isSearchable={filter.isSearchable}
              type={filter.type}
            />
          )}
          {filter.min !== undefined && filter.max !== undefined && (
            <RangeSelector min={filter.min} max={filter.max} />
          )}
        </CollapsiblePanel>
      ))}
    </div>
  );
}

export default Filters;
