import WareCardCart from '../../components/ui/WareCardCart';

const DATA = {
  title: 'Сноуборд GNU Asym Carbon Credit Btx Multicolor',
  img: '/src/assets/img/ware-card-cart/01.png',
  article: '19SN003',
  props: [
    {
      name: 'Цвет',
      value: 'Цветной',
    },
    {
      name: 'Размер',
      value: 'XL',
    },
  ],
  price: 1290,
};

// type TCheckOutProps = { }
function CheckOut(/*{ }: TCheckOutProps*/): JSX.Element {
  return (
    <div>
      <WareCardCart data={DATA} />
    </div>
  );
}

export default CheckOut;
