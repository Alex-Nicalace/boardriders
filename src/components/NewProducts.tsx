import Products from './ui/Products';

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
  // -----------
  {
    wareId: '5',
    imgMain: PATH + '01.png',
    imgSecond: PATH + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '6',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
];

type TNewProductsProps = { className?: string };
function NewProducts({ className = '' }: TNewProductsProps): JSX.Element {
  return (
    <Products
      title="Новинки"
      productsData={PRODUCTS_DATA}
      moreTo="#"
      className={className}
    />
  );
}

export default NewProducts;
