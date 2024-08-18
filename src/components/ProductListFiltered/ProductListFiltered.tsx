import { useState } from 'react';
import './ProductListFiltered.scss';
import Steps from '../ui/Steps';
import Title from '../ui/Title';
import ToggleButton from '../ToggleButton';
import Transition, { TTransition } from '../../component-library/Transition';
import Pagination from '../ui/Pagination';
import Button from '../ui/Button';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Popup from '../../component-library/Popup';
import ProductList from '../ProductList';
import Spinner from '../Spinner';
import Empty from '../Empty';
import { TProductListFilteredProps } from './ProductListFiltered.types';
import SortBy from '../SortBy';
import { Filters, FiltersMobile } from '../Filters';

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'product-list-filtered_filters-hide',
  exited: 'product-list-filtered_filters-hide',
};

function ProductListFiltered({
  className,
  data,
  onPageChange,
}: TProductListFilteredProps): JSX.Element {
  const { products, filters, sortOptions } = data;
  const [isShowFilters, setIsShowFilters] = useState(true);
  const { isLessTablet, isLessMobileSmall } = useScreenWidth();

  function toggleShowFilter() {
    setIsShowFilters((prev) => !prev);
  }

  return (
    <Transition unmountOnExit={false} enter={isShowFilters} timeout={300}>
      {(state) => (
        <section
          className={[
            'product-list-filtered',
            TRANSITION_STYLES[state],
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="product-list-filtered__container">
            <Title
              className="product-list-filtered__title"
              as="h2"
              kind="h1-32-h2-21"
              supNode={products.count}
            >
              {products.title}
            </Title>
            {!isLessTablet && (
              <Steps className="product-list-filtered__steps" />
            )}
            <div className="product-list-filtered__toolbar">
              {!isLessTablet && (
                <ToggleButton
                  className="product-list-filtered__toolbar-toggle"
                  labelActive="Скрыть фильтры"
                  labelNotActive="Показать фильтры"
                  isActive={isShowFilters}
                  onClick={toggleShowFilter}
                />
              )}
              <SortBy
                className="product-list-filtered__sort"
                label={!isLessTablet && 'Сортировать по'}
                options={sortOptions}
              />
              {isLessTablet && (
                <Popup.Open
                  windowName="filters"
                  render={({ open }) => (
                    <ToggleButton
                      className="product-list-filtered__toolbar-toggle"
                      isNotShowIcon
                      labelActive="Фильтры"
                      isActive={isShowFilters}
                      onClick={open}
                    />
                  )}
                />
              )}
            </div>
            <div className="product-list-filtered__body">
              {!isLessTablet && (state !== 'exited' || isShowFilters) && (
                <Filters
                  className="product-list-filtered__filters"
                  data={filters}
                />
              )}
              {isLessTablet && (
                <Popup.Window
                  windowName="filters"
                  render={(close) => (
                    <FiltersMobile data={filters} close={close} />
                  )}
                  onClickOutside={(close) => close()}
                  fullHeight
                  fullWidth
                  transitionEffect={['left']}
                />
              )}
              <div className="product-list-filtered__products-wrapper">
                {products.isLoading && <Spinner />}
                {!products.isLoading && !products.list?.length && (
                  <Empty resource="товары" />
                )}
                {!products.isLoading && !!products.list?.length && (
                  <ProductList
                    className="product-list-filtered__products"
                    data={products.list}
                  />
                )}
                {products.totalPages > 1 && (
                  <Pagination
                    className="product-list-filtered__pagination"
                    currentPage={products.currentPage}
                    totalPages={products.totalPages}
                    visiblePageNumbers={4}
                    isShowNavigationButtons={!isLessMobileSmall}
                    onPageChange={onPageChange}
                  />
                )}
                <div className="product-list-filtered__wrap-button-more">
                  <Button className="product-list-filtered__button-more">
                    Показать больше
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Transition>
  );
}

export default ProductListFiltered;
