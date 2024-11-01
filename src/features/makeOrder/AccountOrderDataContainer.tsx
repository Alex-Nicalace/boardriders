import AccountOrderData from '../../components/AccountOrderData';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { PAGE_SIZE_ORDERS_DEFAULT } from '../../constants';
import { useSetState } from '../../hooks/useSetState';
import { useOrders } from './useOrders';

// type TAccountOrderDataContainerProps = { }
function AccountOrderDataContainer(/*{ }: TAccountOrderDataContainerProps*/): JSX.Element {
  const [state, setMergeState] = useSetState({
    itemsPerPage: PAGE_SIZE_ORDERS_DEFAULT,
    currentPage: 1,
  });
  const { currentPage, itemsPerPage } = state;
  const { orders, countOrders, isLoading, error, totalPages } = useOrders({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  function handlePerPageChange(count: number) {
    setMergeState({ itemsPerPage: count });
  }

  function handlePageChange(page: number) {
    setMergeState({ currentPage: page });
  }

  return (
    <AccountOrderData
      data={orders ?? []}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      totalItems={countOrders ?? 0}
      onPerPageChange={handlePerPageChange}
      onPageChange={handlePageChange}
    />
  );
}

export default AccountOrderDataContainer;
