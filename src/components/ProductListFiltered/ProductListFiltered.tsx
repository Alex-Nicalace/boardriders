import { useState } from 'react';
import './ProductListFiltered.scss';
import Steps from '../ui/Steps';
import Title from '../ui/Title';
import ToggleButton from '../ToggleButton';
import Transition, { TTransition } from '../../component-library/Transition';
import CollapsiblePanel from '../CollapsiblePanel';
import ColorLabel from '../ColorLabel';
import CheckboxGroup from '../CheckboxGroup';
import RangeSelector from '../RangeSelector';
import Pagination from '../ui/Pagination';
import Button from '../ui/Button';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Popup from '../../component-library/Popup';
import FiltersMobile from '../FiltersMobile';
import ProductList from '../ProductList';
import Spinner from '../Spinner';
import Empty from '../Empty';
import {
  TFiltersData,
  TProductListFilteredProps,
} from './ProductListFiltered.types';
import SortBy from '../SortBy';

const SORT_OPTIONS = [
  // {
  //   value: 'popular',
  //   text: 'Популярное',
  // },
  {
    value: 'price-asc',
    text: 'По цене от меньшей к большей',
  },
  {
    value: 'price-desc',
    text: 'По цене от большей к меньшей',
  },
  {
    value: 'discount-desc',
    text: 'По скидке',
  },
  {
    value: 'insertedAt-desc',
    text: 'По дате, сначала новые',
  },
  {
    value: 'insertedAt-asc',
    text: 'По дате, сначала старые',
  },
];

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'product-list-filtered_filters-hide',
  exited: 'product-list-filtered_filters-hide',
};

const FILTERS_DATA: TFiltersData[] = [
  {
    title: 'Категории товаров',
    name: 'category',
    defaultOpen: true,
    items: [
      { value: 'cnowboards', title: 'Сноуборды', count: 24 },
      { value: 'fasteners', title: 'Крепления', count: 48 },
      { value: 'shoes', title: 'Обувь', count: 60 },
      { value: 'sets', title: 'Наборы', count: 13 },
      { value: 'jackets', title: 'Куртки', count: 81 },
      { value: 'pants', title: 'Штаны', count: 55 },
      { value: 'helmets', title: 'Шлемы', count: 13 },
      { value: 'watches', title: 'Очки', count: 81 },
      { value: 'gloves', title: 'Перчатки', count: 55 },
    ],
  },
  {
    title: 'Смотреть',
    name: 'show',
    defaultOpen: true,
    type: 'radio',
    items: [
      { value: 'all', title: 'Все товары', count: 368 },
      { value: 'sale', title: 'Только со скидкой', count: 48 },
    ],
  },
  {
    title: 'Бренды',
    name: 'brand',
    defaultOpen: true,
    isSearchable: true,
    items: [
      { value: 'DC Shoes', count: 24 },
      { value: 'Quicksilver', count: 48 },
      { value: 'BoardRiders', count: 60 },
      { value: 'Billabong', count: 13 },
      { value: 'Adidas', count: 81 },
      { value: 'The Tree', count: 55 },
      { value: 'DC_Shoes', count: 24 },
      { value: 'Quic_ksilver', count: 48 },
      { value: 'Board_Riders', count: 60 },
      { value: 'Bill_abong', count: 13 },
      { value: 'Adidas_', count: 81 },
      { value: 'The_Tree', count: 55 },
    ],
  },
  {
    title: 'Размер',
    name: 'size',
    defaultOpen: true,
    items: [
      { value: 'XS', count: 24 },
      { value: 'S', count: 48 },
      { value: 'S/M', count: 60 },
      { value: 'M', count: 13 },
      { value: 'M/L', count: 81 },
      { value: 'L', count: 55 },
    ],
  },
  {
    title: 'Цена, ₽',
    name: 'price',
    defaultOpen: true,
    min: 0,
    max: 200,
  },
  {
    title: 'Технологии',
    name: 'technology',
    defaultOpen: true,
    items: [
      { value: 'BOA', count: 24 },
      { value: 'Step On', count: 48 },
      { value: 'Est', count: 60 },
      { value: 'Magne Traction', count: 13 },
      { value: 'The Channel', count: 81 },
      { value: 'Recco', count: 55 },
    ],
  },
  {
    title: 'Цвет',
    name: 'color',
    items: [
      { value: '#000', title: 'Черный', count: 24 },
      { value: '#fff', title: 'Белый', count: 48 },
      { value: '#eb5757', title: 'Красный', count: 60 },
      { value: '#2d9cdb', title: 'Синий', count: 13 },
      { value: '#f2c94c', title: 'Желтый', count: 81 },
      { value: '#f2994a', title: 'Оранжевый', count: 55 },
    ].map((item) => ({
      ...item,
      title: <ColorLabel color={item.value} label={item.title} />,
    })),
  },
  {
    title: 'Забрать сейчас: Москва',
    name: 'shop',
    items: [
      {
        title: 'Название магазина',
        hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
        value: 'shop1',
      },
      {
        title: 'Название магазина',
        hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
        value: 'shop2',
      },
      {
        title: 'Название магазина',
        hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
        value: 'shop3',
      },
      {
        title: 'Название магазина',
        hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
        value: 'shop4',
      },
      {
        title: 'Название магазина',
        hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
        value: 'shop5',
      },
    ],
  },
];

function ProductListFiltered({
  className,
  data,
  onPageChange,
}: TProductListFilteredProps): JSX.Element {
  const { products } = data;
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
                options={SORT_OPTIONS}
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
                <div className="product-list-filtered__filters">
                  {FILTERS_DATA.map((filter) => (
                    <CollapsiblePanel
                      key={filter.name}
                      defaultOpen={true}
                      className="product-list-filtered__filter"
                      sammary={filter.title}
                    >
                      {filter.items && (
                        <CheckboxGroup
                          className="product-list-filtered__params"
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
              )}
              {isLessTablet && (
                <Popup.Window
                  windowName="filters"
                  render={(close) => (
                    <FiltersMobile data={FILTERS_DATA} close={close} />
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
