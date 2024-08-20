import { useSearchParams } from 'react-router-dom';
import ProductListFiltered from '../../components/ProductListFiltered';
import { useProducts } from './useProducts';
import { TFiltersData } from '../../components/Filters';
import { useAvailableCategories } from '../categories/useAvailableCategories';
import { useAvailableSizes } from '../sizes/useAvailableSizes';
import { useAvailableColors } from '../colors/useAvailableColors';
import { useAvailableBrands } from '../brands/useAvailableBrands';
import { useAvailableRangePrices } from './useAvailableRangePrices';

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
    useCallbackData: useAvailableBrands,
  },
  {
    title: 'Размер',
    name: 'size',
    defaultOpen: true,
    useCallbackData: useAvailableSizes,
  },
  {
    title: 'Цена, ₽',
    name: 'price',
    defaultOpen: true,
    useGetData: useAvailableRangePrices,
    // min: 0,
    // max: 200,
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
