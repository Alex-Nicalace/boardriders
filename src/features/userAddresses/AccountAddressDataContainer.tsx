import AccountAddressData from '../../components/AccountAddressData';
import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useCreateUserAddresses } from './useCreateUserAddresses';
import { useDeleteUserAddresses } from './useDeleteUserAddresses';
import { useUpdateUserAddresses } from './useUpdateUserAddresses';
import { useUserAddresses } from './useUserAddresses';

// type TAccountAddressDataContainerProps = { }
function AccountAddressDataContainer(/*{ }: TAccountAddressDataContainerProps*/): JSX.Element {
  const { userAddresses = [], isLoading, error } = useUserAddresses();
  const { createUserAddresses, isCreating } = useCreateUserAddresses();
  const { updateUserAddresses, isUpdating } = useUpdateUserAddresses();
  const { deleteUserAddresses, isDeleting } = useDeleteUserAddresses();
  const isPending = isCreating || isUpdating || isDeleting;

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!userAddresses?.length) return <Empty resource="адреса" />;

  return (
    <AccountAddressData
      data={userAddresses}
      isPending={isPending}
      createAddress={createUserAddresses}
      updateAddress={updateUserAddresses}
      deleteAddress={deleteUserAddresses}
    />
  );
}

export default AccountAddressDataContainer;
