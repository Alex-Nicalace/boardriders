import { Fragment, useEffect, useState } from 'react';
import './FiltersMobile.scss';
import ButtonMenu from '../ui/ButtonMenu';
import IconButton from '../ui/IconButton';
import { ArrowLeftClassic } from '../ui/Icons';
import CheckboxGroup from '../CheckboxGroup';
import RangeSelector from '../RangeSelector';
import Button from '../ui/Button';
import Transition from '../../component-library/Transition';
import { TFiltersMobileProps } from './Filters.types';
import DataProvider from '../../features/DataProvider';
import ColorLabel from '../ColorLabel';

function FiltersMobile({
  data,
  close = () => {},
  isUseOnlyRemoteData = false,
}: TFiltersMobileProps): JSX.Element {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState('');

  const expandedFilterData = data.find((item) => item.title === expandedFilter);

  useEffect(function scrollToTop() {
    // скролл к верху. По макету панель фильтров должна быть под хедером. Но если есть прокрутка,
    // то сверху имеется некрасивый отступ, поэтому прокручиваю к началу в момент появления панели.
    window.scrollTo(0, 0);
  }, []);

  function handleShowFilter(titleFilter: string) {
    setExpandedFilter(titleFilter);
    setIsShowFilter(true);
  }

  return (
    <nav className="filters-mobile">
      <header className="filters-mobile__header">
        {isShowFilter && (
          <IconButton
            className="filters-mobile__back"
            IconComponent={ArrowLeftClassic}
            onClick={() => setIsShowFilter(false)}
          />
        )}
        <div className="filters-mobile__title">
          {isShowFilter ? expandedFilter : 'Фильтры'}
        </div>
        {isShowFilter && (
          <button className="filters-mobile__clear">Очистить все</button>
        )}
        <button className="filters-mobile__close" onClick={close}>
          &times;
        </button>
      </header>
      <div
        className={[
          'filters-mobile__content',
          isShowFilter && 'filters-mobile__content_shifted',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <ul className="filters-mobile__list">
          {data.map((filter) => (
            <Fragment key={filter.title}>
              {/* если данные надо тянуть с сервера */}
              {filter.useCallbackData && (
                <DataProvider useCallbackData={filter.useCallbackData}>
                  {(providerData) => (
                    <>
                      {!!providerData?.length && (
                        <li className="filters-mobile__item">
                          <ButtonMenu
                            withArrow
                            onClick={() => handleShowFilter(filter.title)}
                          >
                            {filter.title}
                          </ButtonMenu>
                        </li>
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
                        <li className="filters-mobile__item">
                          <ButtonMenu
                            withArrow
                            onClick={() => handleShowFilter(filter.title)}
                          >
                            {filter.title}
                          </ButtonMenu>
                        </li>
                      )}
                    </>
                  )}
                </DataProvider>
              )}
              {/* если данные статичные  */}
              {!isUseOnlyRemoteData && filter.items && (
                <li className="filters-mobile__item">
                  <ButtonMenu
                    withArrow
                    onClick={() => handleShowFilter(filter.title)}
                  >
                    {filter.title}
                  </ButtonMenu>
                </li>
              )}
              {!isUseOnlyRemoteData && filter.min && filter.max && (
                <li className="filters-mobile__item">
                  <ButtonMenu
                    withArrow
                    onClick={() => handleShowFilter(filter.title)}
                  >
                    {filter.title}
                  </ButtonMenu>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
        <Transition enter={isShowFilter} timeout={300}>
          <div className="filters-mobile__filter">
            {/* если данные надо тянуть с сервера */}
            {expandedFilterData?.useCallbackData && (
              <DataProvider
                useCallbackData={expandedFilterData.useCallbackData}
              >
                {(providerData) => (
                  <>
                    {!!providerData?.length && (
                      <CheckboxGroup
                        className="filters-mobile__params"
                        items={
                          expandedFilterData.name === 'color'
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
                        name={expandedFilterData.name}
                        isSearchable={expandedFilterData.isSearchable}
                        type={expandedFilterData.type}
                      />
                    )}
                  </>
                )}
              </DataProvider>
            )}
            {expandedFilterData?.useGetData && (
              <DataProvider useCallbackData={expandedFilterData.useGetData}>
                {(providerData) => (
                  <>
                    {!!providerData && (
                      <RangeSelector
                        className="filters-mobile__params"
                        min={providerData.min}
                        max={providerData.max}
                      />
                    )}
                  </>
                )}
              </DataProvider>
            )}
            {/* если данные статичные  */}
            {expandedFilterData?.items && (
              <CheckboxGroup
                className="filters-mobile__params"
                items={
                  expandedFilterData.name === 'color'
                    ? expandedFilterData.items.map((item) => {
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
                    : expandedFilterData.items
                }
                name={expandedFilterData.name}
                isSearchable={expandedFilterData.isSearchable}
                type={expandedFilterData.type}
              />
            )}
            {expandedFilterData?.min && expandedFilterData.max && (
              <RangeSelector
                className="filters-mobile__params"
                min={expandedFilterData.min}
                max={expandedFilterData.max}
              />
            )}
            <div className="filters-mobile__btn-apply">
              <Button fullWidth>Применить</Button>
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  );
}

export default FiltersMobile;
