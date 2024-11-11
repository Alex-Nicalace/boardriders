import AccountAddressData from '../../components/AccountAddressData';
import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useUserAddresses } from './useUserAddresses';

// type TAccountAddressDataContainerProps = { }
function AccountAddressDataContainer(/*{ }: TAccountAddressDataContainerProps*/): JSX.Element {
  const { userAddresses = [], isLoading, error } = useUserAddresses();

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!userAddresses?.length) return <Empty resource="адреса" />;

  return <AccountAddressData data={userAddresses} />;
}

export default AccountAddressDataContainer;
