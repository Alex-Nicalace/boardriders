import { useId, useState } from 'react';
import './ProductListFiltered.scss';
import Steps from '../ui/Steps';
import Title from '../ui/Title';
import ToggleButton from '../ToggleButton';
import Select from '../../component-library/Select';
import { SelectIcon } from '../ui/Icons';
import useMatchMedia from '../../hooks/useMatchMedia';
import WareCard from '../ui/WareCard';
import Transition, { TTransition } from '../../component-library/Transition';
import CollapsiblePanel from '../CollapsiblePanel';
import ColorLabel from '../ColorLabel';
import CheckboxGroup from '../CheckboxGroup';

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
  {
    wareId: '28',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
];

const TRANSITION_STYLES: Record<TTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'product-list-filtered_filters-hide',
  exited: 'product-list-filtered_filters-hide',
};

const FILTER_CATEGORY = {
  label: 'Категории товаров',
  name: 'category',
  items: [
    { value: 'cnowboards', label: 'Сноуборды', count: 24 },
    { value: 'fasteners', label: 'Крепления', count: 48 },
    { value: 'shoes', label: 'Обувь', count: 60 },
    { value: 'sets', label: 'Наборы', count: 13 },
    { value: 'jackets', label: 'Куртки', count: 81 },
    { value: 'pants', label: 'Штаны', count: 55 },
    { value: 'helmets', label: 'Шлемы', count: 13 },
    { value: 'watches', label: 'Очки', count: 81 },
    { value: 'gloves', label: 'Перчатки', count: 55 },
  ],
};

const FILTER_BRAND = {
  label: 'Бренды',
  name: 'brand',
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
};

const FILTER_SIZE = {
  label: 'Размер',
  name: 'size',
  items: [
    { value: 'XS', count: 24 },
    { value: 'S', count: 48 },
    { value: 'S/M', count: 60 },
    { value: 'M', count: 13 },
    { value: 'M/L', count: 81 },
    { value: 'L', count: 55 },
  ],
};

const FILTER_TECHNOLOGY = {
  label: 'Технологии',
  name: 'technology',
  items: [
    { value: 'BOA', count: 24 },
    { value: 'Step On', count: 48 },
    { value: 'Est', count: 60 },
    { value: 'Magne Traction', count: 13 },
    { value: 'The Channel', count: 81 },
    { value: 'Recco', count: 55 },
  ],
};

const FILTER_COLOR = {
  label: 'Цвет',
  name: 'color',
  items: [
    { value: '#000', label: 'Черный', count: 24 },
    { value: '#fff', label: 'Белый', count: 48 },
    { value: '#eb5757', label: 'Красный', count: 60 },
    { value: '#2d9cdb', label: 'Синий', count: 13 },
    { value: '#f2c94c', label: 'Желтый', count: 81 },
    { value: '#f2994a', label: 'Оранжевый', count: 55 },
  ],
};

const FILTER_SHOP = {
  label: 'Забрать сейчас: Москва',
  name: 'shop',
  items: [
    {
      label: 'Название магазина',
      hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
      value: 'shop1',
    },
    {
      label: 'Название магазина',
      hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
      value: 'shop2',
    },
    {
      label: 'Название магазина',
      hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
      value: 'shop3',
    },
    {
      label: 'Название магазина',
      hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
      value: 'shop4',
    },
    {
      label: 'Название магазина',
      hint: 'ул. Энтузиастов 45. Метро Бабушкинская',
      value: 'shop5',
    },
  ],
};

const MEDIAQUERIES = ['( max-width: 991.98px )'];

type TProductListFilteredProps = { className?: string };
function ProductListFiltered({
  className = '',
}: TProductListFilteredProps): JSX.Element {
  const [hideFilter, setHideFilter] = useState(false);
  const id = useId();
  const selectId = id + '-select';
  const [isSmallerThanTablet] = useMatchMedia(MEDIAQUERIES);

  const filterColor = {
    ...FILTER_COLOR,
    items: FILTER_COLOR.items.map((item) => ({
      ...item,
      label: <ColorLabel color={item.value} label={item.label} />,
    })),
  };

  function toggleHideFilter() {
    setHideFilter((prev) => !prev);
  }

  return (
    <Transition unmountOnExit={false} enter={!hideFilter} timeout={300}>
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
            <Steps className="product-list-filtered__steps" />
            <div className="product-list-filtered__toolbar">
              {!isSmallerThanTablet ? (
                <>
                  <ToggleButton
                    className="product-list-filtered__toolbar-toggle"
                    labelActive="Скрыть фильтры"
                    labelNotActive="Показать фильтры"
                    isActive={!hideFilter}
                    onClick={toggleHideFilter}
                  />
                  <div className="product-list-filtered__sort">
                    <span className="product-list-filtered__sort-label">
                      <label htmlFor={selectId}>Сортировать по:</label>
                    </span>
                    <Select
                      className="product-list-filtered__sort-select"
                      iconElement={<SelectIcon />}
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
                    iconElement={<SelectIcon />}
                    id={selectId}
                    placreholder="Сортировать"
                  >
                    {SORTS.map((sort) => (
                      <Select.Option key={sort.value} value={sort.value}>
                        {sort.text}
                      </Select.Option>
                    ))}
                  </Select>
                  <ToggleButton
                    className="product-list-filtered__toolbar-toggle"
                    isNotShowIcon
                    labelActive="Фильтры"
                    isActive={!hideFilter}
                    onClick={toggleHideFilter}
                  />
                </>
              )}
            </div>
            <div className="product-list-filtered__body">
              {(state !== 'exited' || !hideFilter) && (
                <div className="product-list-filtered__filters">
                  <CollapsiblePanel
                    defaultOpen={true}
                    className="product-list-filtered__filter"
                    sammary={FILTER_CATEGORY.label}
                  >
                    <CheckboxGroup
                      items={FILTER_CATEGORY.items}
                      name={FILTER_CATEGORY.name}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    defaultOpen={true}
                    className="product-list-filtered__filter"
                    sammary={FILTER_BRAND.label}
                  >
                    <CheckboxGroup
                      items={FILTER_BRAND.items}
                      name={FILTER_BRAND.name}
                      isSearchable
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    defaultOpen={true}
                    className="product-list-filtered__filter"
                    sammary={FILTER_SIZE.label}
                  >
                    <CheckboxGroup
                      items={FILTER_SIZE.items}
                      name={FILTER_SIZE.name}
                    />
                  </CollapsiblePanel>

                  <CollapsiblePanel
                    defaultOpen={true}
                    className="product-list-filtered__filter"
                    sammary={filterColor.label}
                  >
                    <CheckboxGroup
                      items={filterColor.items}
                      name={filterColor.name}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    defaultOpen={true}
                    className="product-list-filtered__filter"
                    sammary={FILTER_TECHNOLOGY.label}
                  >
                    <CheckboxGroup
                      items={FILTER_TECHNOLOGY.items}
                      name={FILTER_TECHNOLOGY.name}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    defaultOpen={true}
                    className="product-list-filtered__filter"
                    sammary={FILTER_SHOP.label}
                  >
                    <CheckboxGroup
                      items={FILTER_SHOP.items}
                      name={FILTER_SHOP.name}
                    />
                  </CollapsiblePanel>
                </div>
              )}
              <div className="product-list-filtered__products">
                {PRODUCTS_DATA.map((product) => (
                  <WareCard
                    key={product.wareId}
                    className="product-list-filtered__product"
                    wareDate={product}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Transition>
  );
}

export default ProductListFiltered;
