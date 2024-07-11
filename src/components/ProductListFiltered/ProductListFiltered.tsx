import { useId, useState } from 'react';
import './ProductListFiltered.scss';
import Steps from '../ui/Steps';
import Title from '../ui/Title';
import ToggleButton from '../ToggleButton';
import Select from '../../component-library/Select';
import { SelectIcon } from '../ui/Icons';
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

const SORTS = [
  {
    value: 'popular',
    text: 'Популярное',
  },
  {
    value: 'price-asc',
    text: 'По цене от меньшей к большей',
  },
  {
    value: 'price-desc',
    text: 'По цене от большей к меньшей',
  },
  {
    value: 'discount',
    text: 'По скидке',
  },
  {
    value: 'warm',
    text: 'Утеплению',
  },
];

const PATH = '/src/assets/img/products-new/';

const PRODUCTS_DATA = [
  {
    wareId: '1',
    imgMain: PATH + '01.png',
    imgSecond: PATH + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '2',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '3',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '4',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '5',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '6',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '7',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '8',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '9',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '10',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '11',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '12',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '13',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '14',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '15',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '16',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '17',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '18',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '19',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '20',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '21',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '22',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '23',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '24',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '25',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '26',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '27',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  // {
  //   wareId: '28',
  //   imgMain: PATH + '04.png',
  //   imgSecond: PATH + '04-hover.png',
  //   title: 'LIB TECH',
  //   descr: 'Мужской Сноуборд',
  //   price: 34392,
  //   to: '#',
  // },
];

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'product-list-filtered_filters-hide',
  exited: 'product-list-filtered_filters-hide',
};

export type TFiltersData = (
  | {
      items: {
        value: string;
        title?: React.ReactNode;
        count?: number;
        hint?: string;
      }[];
      type?: 'checkbox' | 'radio';
      isSearchable?: boolean;
      min?: never;
      max?: never;
    }
  | {
      items?: never;
      min: number;
      max: number;
      isSearchable?: never;
    }
) & {
  title: string;
  name: string;
  defaultOpen?: boolean;
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

type TProductListFilteredProps = { className?: string };
function ProductListFiltered({
  className = '',
}: TProductListFilteredProps): JSX.Element {
  const [isShowFilters, setIsShowFilters] = useState(true);
  const id = useId();
  const selectId = id + '-select';
  const { isLessTablet, isLessMobileSmall } = useScreenWidth();

  function toggleShowFilter() {
    setIsShowFilters((prev) => !prev);
  }

  return (
    <Transition unmountOnExit={false} enter={isShowFilters} timeout={300}>
      {(state) => (
        <section
          className={`product-list-filtered ${TRANSITION_STYLES[state]} ${className}`}
        >
          <div className="product-list-filtered__container">
            <Title
              className="product-list-filtered__title"
              as="h2"
              kind="h1-32-h2-21"
              supNode="358"
            >
              Сноуборд
            </Title>
            {!isLessTablet && (
              <Steps className="product-list-filtered__steps" />
            )}
            <div className="product-list-filtered__toolbar">
              {!isLessTablet ? (
                <>
                  <ToggleButton
                    className="product-list-filtered__toolbar-toggle"
                    labelActive="Скрыть фильтры"
                    labelNotActive="Показать фильтры"
                    isActive={isShowFilters}
                    onClick={toggleShowFilter}
                  />
                  <div className="product-list-filtered__sort">
                    <span className="product-list-filtered__sort-label">
                      <label htmlFor={selectId}>Сортировать по:</label>
                    </span>
                    <Select
                      className="product-list-filtered__sort-select"
                      iconSelect={<SelectIcon />}
                      id={selectId}
                    >
                      {SORTS.map((sort) => (
                        <Select.Option key={sort.value} value={sort.value}>
                          {sort.text}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <Select
                    className="product-list-filtered__sort-select"
                    iconSelect={<SelectIcon />}
                    id={selectId}
                    placreholder="Сортировать"
                  >
                    {SORTS.map((sort) => (
                      <Select.Option key={sort.value} value={sort.value}>
                        {sort.text}
                      </Select.Option>
                    ))}
                  </Select>
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
                </>
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
                <ProductList
                  className="product-list-filtered__products"
                  data={PRODUCTS_DATA}
                />
                <Pagination
                  className="product-list-filtered__pagination"
                  currentPage={1}
                  totalPages={659}
                  visiblePageNumbers={4}
                  isShowNavigationButtons={!isLessMobileSmall}
                />
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
