import { formaterCurrency } from '../../utils/formaters';
import { getDeclension } from '../../utils/getDeclension';
import './ShoppngList.scss';
import { TDataItem, TShoppngListProps } from './ShoppngList.types';

/**
 * * Сделал data массив объектов чтобы в будующем при необходимости добавлять новые данные, такие как ссылкка на
 * * страницу товара. В этом случае с помощью render можно передать функцию для отрисовки тега Link
 */
function ShoppngList<T extends TDataItem>({
  data,
  className,
  render = (item) => item.name,
  limitListCount = 5,
}: TShoppngListProps<T>): JSX.Element {
  const firstElementsData = data.slice(0, limitListCount);
  const lastElementsCount = data
    .slice(limitListCount)
    .reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={['shoppng-list', className].filter(Boolean).join(' ')}>
      <ol className="shoppng-list__list">
        {firstElementsData.map((item) => (
          <li className="shoppng-list__item" key={item.productVariantId}>
            {render(item)}
          </li>
        ))}
      </ol>
      <p className="shoppng-list__hint">
        <span className="shoppng-list__hint-text">
          {!lastElementsCount
            ? 'Общая сумма:'
            : `И еще ${getDeclension(
                lastElementsCount,
                'товар',
                'товара',
                'товаров'
              )} на общую сумму:`}
        </span>
        <span className="shoppng-list__hint-price">
          {formaterCurrency(totalPrice)}
        </span>
      </p>
    </div>
  );
}

export default ShoppngList;
