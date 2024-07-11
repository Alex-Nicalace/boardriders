import PageContent from '../../components/PageContent';
import ProductList from '../../components/ProductList';
import SelectLabel from '../../components/ui/SelectLabel';
import Title from '../../components/ui/Title';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import './FavouritesPage.scss';

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
];

const SORT_OPTIONS = [
  { name: 'По новизне', value: 'new' },
  {
    name: 'По популярности',
    value: 'popular',
  },
  {
    name: 'По цене',
    value: 'price',
  },
  {
    name: 'По рейтингу',
    value: 'rating',
  },
];

// type TFavouritesPageProps = { }
function FavouritesPage(/*{ }: TFavouritesPageProps*/): JSX.Element {
  const { isLessMobileSmall } = useScreenWidth();
  return (
    <PageContent className="favourites-page" as="main" paddingTop="50-15">
      <div className="favourites-page__container">
        <Title className="favourites-page__title" as="h2" kind="h2-21-16">
          {isLessMobileSmall ? 'Избранные товары' : 'Избранное'}
        </Title>
        <SelectLabel
          className="favourites-page__select"
          label={!isLessMobileSmall && 'Сортировать по:'}
          labelPosition="left"
          isGrayLabel
        >
          {SORT_OPTIONS.map(({ name, value }) => (
            <SelectLabel.Option key={value} value={value}>
              {name}
            </SelectLabel.Option>
          ))}
        </SelectLabel>
        <ProductList
          className="favourites-page__product-list"
          data={PRODUCTS_DATA}
        />
      </div>
    </PageContent>
  );
}

export default FavouritesPage;
