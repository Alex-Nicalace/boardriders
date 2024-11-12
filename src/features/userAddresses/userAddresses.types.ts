import { TAddress } from '../../components/AccountAddressData';
import { TablesUpdate } from '../../services/supabase.types';
import { useCreateUserAddresses } from './useCreateUserAddresses';
import { useDeleteUserAddresses } from './useDeleteUserAddresses';
import { useUpdateUserAddresses } from './useUpdateUserAddresses';
import { useUserAddresses } from './useUserAddresses';

export type TUserAddresses = ReturnType<
  typeof useUserAddresses
>['userAddresses'];

export type TUpdateUserAddressesArgs = {
  id: number;
  row: TablesUpdate<'userAddresses'>;
};

export type TAccountAddressDataProviderProps = {
  render: (
    data: TAddress[],
    isPending: boolean,
    createAddress: ReturnType<
      typeof useCreateUserAddresses
    >['createUserAddresses'],
    updateAddress: ReturnType<
      typeof useUpdateUserAddresses
    >['updateUserAddresses'],
    deleteAddress: ReturnType<
      typeof useDeleteUserAddresses
    >['deleteUserAddresses']
  ) => JSX.Element;
};
