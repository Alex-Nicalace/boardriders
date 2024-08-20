import { Fragment } from 'react';
import { TFiltersProps } from './Filters.types';
import CollapsiblePanel from '../CollapsiblePanel';
import CheckboxGroup from '../CheckboxGroup';
import RangeSelector from '../RangeSelector';
import './Filters.scss';
import DataProvider from '../../features/DataProvider';
import ColorLabel from '../ColorLabel';

function Filters({
  data,
  className,
  isUseOnlyRemoteData = false,
}: TFiltersProps): JSX.Element {
  return (
    <div className={['filters', className].filter(Boolean).join(' ')}>
      {data.map((filter) => (
        <Fragment key={filter.name}>
          {/* <данные с сервера> */}
          {filter.useCallbackData && (
            <DataProvider useCallbackData={filter.useCallbackData}>
              {(providerData) => (
                <>
                  {!!providerData?.length && (
                    <CollapsiblePanel
                      defaultOpen={true}
                      className="filters__filter"
                      sammary={filter.title}
                    >
                      <CheckboxGroup
                        className="filters__params"
                        items={
                          filter.name === 'color'
                            ? providerData.map((item) => {
                                const [id, hexValue] = item.value.split('|');
                                return {
                                  ...item,
                                  id,
                                  title: (
                                    <ColorLabel
                                      color={hexValue}
                                      label={item.title ?? hexValue}
                                    />
                                  ),
                                };
                              })
                            : providerData
                        }
                        name={filter.name}
                        isSearchable={filter.isSearchable}
                        type={filter.type}
                      />
                    </CollapsiblePanel>
                  )}
                </>
              )}
            </DataProvider>
          )}
          {filter.useGetData && (
            <DataProvider useCallbackData={filter.useGetData}>
              {(providerData) => (
                <>
                  {!!providerData && (
                    <CollapsiblePanel
                      defaultOpen={true}
                      className="filters__filter"
                      sammary={filter.title}
                    >
                      <RangeSelector
                        min={providerData.min}
                        max={providerData.max}
                      />
                    </CollapsiblePanel>
                  )}
                </>
              )}
            </DataProvider>
          )}

          {/* <данные статические> */}
          {!isUseOnlyRemoteData && filter.items && (
            <CollapsiblePanel
              defaultOpen={true}
              className="filters__filter"
              sammary={filter.title}
            >
              <CheckboxGroup
                className="filters__params"
                items={
                  filter.name === 'color'
                    ? filter.items.map((item) => {
                        const [id, hexValue] = item.value.split('|');
                        return {
                          ...item,
                          id,
                          title: (
                            <ColorLabel
                              color={hexValue}
                              label={item.title ?? hexValue}
                            />
                          ),
                        };
                      })
                    : filter.items
                }
                name={filter.name}
                isSearchable={filter.isSearchable}
                type={filter.type}
              />
            </CollapsiblePanel>
          )}
          {!isUseOnlyRemoteData && filter.min && filter.max && (
            <CollapsiblePanel
              defaultOpen={true}
              className="filters__filter"
              sammary={filter.title}
            >
              <RangeSelector min={filter.min} max={filter.max} />
            </CollapsiblePanel>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default Filters;
