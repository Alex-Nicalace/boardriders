import { useScreenWidth } from '../../Context/useScreenWidthContext';
import OrderStatusAccordion from '../OrderStatusAccordion';
import PaginationInput from '../ui/PaginationInput';
import './AccountOrderData.scss';

const ORDER_STATUS = [
  { code: '195455-222546-ANU', status: 2, price: 118570, isPaid: true },
  { code: '295455-222546-ANU', status: 2, price: 45258, isPaid: true },
  { code: '395455-222546-ANU', status: 0, price: 1544, isPaid: false },
  { code: '495455-222546-ANU', status: 1, price: 1545, isPaid: false },
  { code: '595455-222546-ANU', status: 2, price: 45285, isPaid: true },
];

type TAccountOrderDataProps = {
  className?: string;
};
function AccountOrderData({ className }: TAccountOrderDataProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();

  return (
    <div
      className={['account-order-data', className].filter(Boolean).join(' ')}
    >
      <PaginationInput
        className="account-order-data__pagination"
        totalItems={23}
        itemsPerPage={20}
        currentPage={1}
        totalPages={2}
        hideSizeBox={isLessMobile}
      />
      <OrderStatusAccordion
        className="account-order-data__orders"
        data={ORDER_STATUS}
      />
    </div>
  );
}

export default AccountOrderData;
