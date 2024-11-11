import AccountAddressData from '../../components/AccountAddressData';
import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useCreateUserAddresses } from './useCreateUserAddresses';
import { useUpdateUserAddresses } from './useUpdateUserAddresses';
import { useUserAddresses } from './useUserAddresses';

// type TAccountAddressDataContainerProps = { }
function AccountAddressDataContainer(/*{ }: TAccountAddressDataContainerProps*/): JSX.Element {
  const { userAddresses = [], isLoading, error } = useUserAddresses();
  const { createUserAddresses, isCreating } = useCreateUserAddresses();
  const { updateUserAddresses, isUpdating } = useUpdateUserAddresses();
  const isPending = isCreating || isUpdating;

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!userAddresses?.length) return <Empty resource="адреса" />;

  return (
    <AccountAddressData
      data={userAddresses}
      isPending={isPending}
      createAddress={createUserAddresses}
      updateAddress={updateUserAddresses}
    />
  );
}

export default AccountAddressDataContainer;
