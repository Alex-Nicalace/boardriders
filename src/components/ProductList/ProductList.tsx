import WareCard, { IWareData } from '../ui/WareCard';
import './ProductList.scss';

type TProductListProps = {
  className?: string;
  data: IWareData[];
};
function ProductList({ className, data }: TProductListProps): JSX.Element {
  return (
    <ul className={['product-list', className].filter(Boolean).join(' ')}>
      {data.map((item) => (
        <li key={item.wareId} className="product-list__item">
          <WareCard className="product-list__card" wareDate={item} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
