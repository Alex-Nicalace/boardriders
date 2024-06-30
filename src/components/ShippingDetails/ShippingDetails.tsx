import { Fragment, ReactNode } from 'react';
import './ShippingDetails.scss';

type TShippingDetailsData = {
  key: string;
  value: ReactNode;
}[];

type TShippingDetailsProps = {
  className?: string;
  data: TShippingDetailsData;
  mode?: 'compact' | 'normal';
};
function ShippingDetails({
  className,
  data,
  mode = 'normal',
}: TShippingDetailsProps): JSX.Element {
  return (
    <dl
      className={[
        'shipping-details',
        mode === 'compact' && 'shipping-details_compact',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {data.map(({ key, value }) => (
        <Fragment key={key}>
          <dt className="shipping-details__title">{key}</dt>
          <dd className="shipping-details__value">{value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

export default ShippingDetails;
