import { useScreenWidth } from '../../Context/useScreenWidthContext';
import OrdersEmpty from '../OrdersEmpty';
import OrderStatusAccordion from '../OrderStatusAccordion';
import PaginationInput from '../ui/PaginationInput';
import './AccountOrderData.scss';
import { TAccountOrderDataProps } from './AccountOrderData.types';

function AccountOrderData({
  className,
  totalItems,
  itemsPerPage,
  currentPage,
  totalPages,
  data,

  onPerPageChange,
  onPageChange,
}: TAccountOrderDataProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();

  return (
    <div
      className={['account-order-data', className].filter(Boolean).join(' ')}
    >
      {data.length === 0 ? (
        <OrdersEmpty className="account-order-data__empty" />
      ) : (
        <>
          <PaginationInput
            className="account-order-data__pagination"
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            hideSizeBox={isLessMobile}
            onPerPageChange={onPerPageChange}
            onPageChange={onPageChange}
          />
          <OrderStatusAccordion
            className="account-order-data__orders"
            data={data}
          />
        </>
      )}
    </div>
  );
}

export default AccountOrderData;
