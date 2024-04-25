import { Link } from 'react-router-dom';
import './Price.scss';

type TPriceProps = {
  className?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  cheaper?: boolean;
};
function Price({
  className = '',
  price,
  oldPrice,
  discount,
  cheaper = true,
}: TPriceProps): JSX.Element {
  // Создание объекта Intl
  const formaterCurrency = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  });
  const formaterPercent = new Intl.NumberFormat('ru-RU', {
    style: 'percent',
  });

  const priceFormated = formaterCurrency.format(price);
  const oldPriceFormated =
    oldPrice !== undefined && formaterCurrency.format(oldPrice);
  const discountFormated =
    discount !== undefined && formaterPercent.format(discount / 100);

  return (
    <div className={`price ${className}`}>
      {discountFormated && (
        <span className="price__discount">{discountFormated}</span>
      )}
      {oldPriceFormated ? (
        <>
          <ins className="price__value price__value_new">{priceFormated}</ins>
          <del className="price__old-value">{oldPriceFormated}</del>
        </>
      ) : (
        <span className="price__value">{priceFormated}</span>
      )}
      {cheaper && (
        <Link className="price__cheaper" to="#">
          Нашли дешевле?
        </Link>
      )}
    </div>
  );
}

export default Price;
