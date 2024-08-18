import { useSearchParams } from 'react-router-dom';
import ProductListFiltered from '../../components/ProductListFiltered';
import { useProducts } from './useProducts';
import { TFiltersData } from '../../components/Filters';
import { useAvailableCategories } from '../categories/useAvailableCategories';
import { useAvailableSizes } from '../sizes/useAvailableSizes';
import { useAvailableColors } from '../colors/useAvailableColors';

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

const FILTERS_DATA: TFiltersData[] = [
  {
    title: 'Категория',
    name: 'category',
    defaultOpen: true,
    useCallbackData: useAvailableCategories,
    // items: [
    //   { value: 'cnowboards', title: 'Сноуборды', count: 24 },
    //   { value: 'fasteners', title: 'Крепления', count: 48 },
    //   { value: 'shoes', title: 'Обувь', count: 60 },
    //   { value: 'sets', title: 'Наборы', count: 13 },
    //   { value: 'jackets', title: 'Куртки', count: 81 },
    //   { value: 'pants', title: 'Штаны', count: 55 },
    //   { value: 'helmets', title: 'Шлемы', count: 13 },
    //   { value: 'watches', title: 'Очки', count: 81 },
    //   { value: 'gloves', title: 'Перчатки', count: 55 },
    // ],
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
    useCallbackData: useAvailableSizes,
    // items: [
    //   { value: 'XS', count: 24 },
    //   { value: 'S', count: 48 },
    //   { value: 'S/M', count: 60 },
    //   { value: 'M', count: 13 },
    //   { value: 'M/L', count: 81 },
    //   { value: 'L', count: 55 },
    // ],
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
    useCallbackData: useAvailableColors,
    // items: [
    //   { value: '#000', title: 'Черный', count: 24 },
    //   { value: '#fff', title: 'Белый', count: 48 },
    //   { value: '#eb5757', title: 'Красный', count: 60 },
    //   { value: '#2d9cdb', title: 'Синий', count: 13 },
    //   { value: '#f2c94c', title: 'Желтый', count: 81 },
    //   { value: '#f2994a', title: 'Оранжевый', count: 55 },
    // ].map((item) => ({
    //   ...item,
    //   title: <ColorLabel color={item.value} label={item.title} />,
    // })),
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

type TProductListFilteredContainerProps = { className?: string };
function ProductListFilteredContainer({
  className,
}: TProductListFilteredContainerProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    isLoading,
    error,
    pageNum,
    totalPages,
    count,
    categoryDisplay,
  } = useProducts();

  function handlePageChange(page: number) {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }

  const data = {
    products: {
      list: products,
      isLoading,
      error,
      currentPage: pageNum,
      totalPages,
      count: count ?? 0,
      title: categoryDisplay,
    },
    filters: FILTERS_DATA,
    sortOptions: SORT_OPTIONS,
  };
  return (
    <ProductListFiltered
      className={className}
      data={data}
      onPageChange={handlePageChange}
    />
  );
}

export default ProductListFilteredContainer;
