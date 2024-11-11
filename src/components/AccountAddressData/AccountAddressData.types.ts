import { useCreateUserAddresses } from '../../features/userAddresses/useCreateUserAddresses';

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
};
