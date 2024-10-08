import { Fragment } from 'react';
import { TFiltersProps } from './Filters.types';
import CollapsiblePanel from '../CollapsiblePanel';
import { CheckboxGroupContainer } from '../CheckboxGroup';
import { RangeSelectorContainer } from '../RangeSelector';
import './Filters.scss';
import DataProvider from '../../features/DataProvider';

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
                      <CheckboxGroupContainer
                        className="filters__params"
                        items={providerData}
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
                      <RangeSelectorContainer
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
              <CheckboxGroupContainer
                className="filters__params"
                items={filter.items}
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
              <RangeSelectorContainer min={filter.min} max={filter.max} />
            </CollapsiblePanel>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default Filters;
