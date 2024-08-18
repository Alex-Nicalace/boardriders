import { useEffect, useState } from 'react';
import './FiltersMobile.scss';
import ListLinks from '../../component-library/ListLinks';
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
}: TFiltersMobileProps): JSX.Element {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState('');

  const expandedFilterData = data.find((item) => item.title === expandedFilter);
  const dataForListLinks = data.map(({ title }) => ({
    title,
  }));

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
        className={`filters-mobile__content ${
          isShowFilter ? 'filters-mobile__content_shifted' : ''
        }`}
      >
        <ListLinks
          linksData={dataForListLinks}
          listProps={{ className: 'filters-mobile__list' }}
          itemProps={{ className: 'filters-mobile__item' }}
          renderToItem={({ title }) => (
            <ButtonMenu withArrow onClick={() => handleShowFilter(title)}>
              {title}
            </ButtonMenu>
          )}
        />
        <Transition enter={isShowFilter} timeout={300}>
          <div className="filters-mobile__filter">
            {expandedFilterData?.useCallbackData && (
              <DataProvider
                useCallbackData={expandedFilterData.useCallbackData}
              >
                {/* если данные надо тянуть с сервера */}
                {(data) => (
                  <>
                    {!!data?.length && (
                      <CheckboxGroup
                        className="filters-mobile__params"
                        items={
                          expandedFilterData.name === 'color'
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
                        name={expandedFilterData.name}
                        isSearchable={expandedFilterData.isSearchable}
                        type={expandedFilterData.type}
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
                items={expandedFilterData.items}
                name={expandedFilterData.name}
                isSearchable={expandedFilterData.isSearchable}
                type={expandedFilterData.type}
              />
            )}
            {expandedFilterData?.min !== undefined &&
              expandedFilterData?.max !== undefined && (
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
