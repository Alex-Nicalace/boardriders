import { useCreateUserAddresses } from '../../features/userAddresses/useCreateUserAddresses';
import { useDeleteUserAddresses } from '../../features/userAddresses/useDeleteUserAddresses';
import { useUpdateUserAddresses } from '../../features/userAddresses/useUpdateUserAddresses';

export type TAddress = {
  apartment: string | null;
  city: string;
  country: string;
  house: string;
  id: number;
  index: string;
  region: string | null;
  street: string;
};

export type TKeysAddress = keyof TAddress;

export type TAccountAddressDataProps = {
  className?: string;
  data: TAddress[];
  isPending?: boolean;
  createAddress: ReturnType<
    typeof useCreateUserAddresses
  >['createUserAddresses'];
  updateAddress: ReturnType<
    typeof useUpdateUserAddresses
  >['updateUserAddresses'];
  deleteAddress: ReturnType<
    typeof useDeleteUserAddresses
  >['deleteUserAddresses'];
};
