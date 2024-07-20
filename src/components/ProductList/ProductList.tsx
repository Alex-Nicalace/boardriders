import WareCard, { TWareData } from '../ui/WareCard';
import './ProductList.scss';

type TProductListProps = {
  className?: string;
  data: TWareData[];
};
function ProductList({ className, data }: TProductListProps): JSX.Element {
  return (
    <ul className={['product-list', className].filter(Boolean).join(' ')}>
      {data.map((item) => (
        <li key={item.id} className="product-list__item">
          <WareCard className="product-list__card" data={item} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
