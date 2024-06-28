import OrderStatusAccordion from '../OrderStatusAccordion';
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
  return (
    <div
      className={['account-order-data', className].filter(Boolean).join(' ')}
    >
      <OrderStatusAccordion data={ORDER_STATUS} />
    </div>
  );
}

export default AccountOrderData;
