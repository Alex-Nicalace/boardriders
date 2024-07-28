import { Link } from 'react-router-dom';
import './Price.scss';
import { useFormaters } from '../../Context/useFormaters';

type TPriceProps = {
  className?: string;
  price: number;
  oldPrice?: number | null;
  discount?: number | null;
  cheaper?: boolean;
};
function Price({
  className = '',
  price,
  oldPrice,
  discount,
  cheaper = true,
}: TPriceProps): JSX.Element {
  const { formaterCurrency, formaterPercent } = useFormaters();

  const priceFormated = formaterCurrency(price);
  const oldPriceFormated = oldPrice && formaterCurrency(oldPrice);
  const discountFormated = discount && formaterPercent(discount);

  return (
    <div className={`price ${className}`}>
      {!!discountFormated && (
        <span className="price__discount">{discountFormated}</span>
      )}
      {oldPriceFormated ? (
        <>
          <ins className="price__value price__value_new">{priceFormated}</ins>
          <span className="price__wrap">
            <del className="price__old-value">{oldPriceFormated}</del>
            {cheaper && (
              <Link className="price__cheaper" to="#">
                Нашли дешевле?
              </Link>
            )}
          </span>
        </>
      ) : (
        <>
          <span className="price__value">{priceFormated}</span>
          {cheaper && (
            <Link className="price__cheaper" to="#">
              Нашли дешевле?
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default Price;
