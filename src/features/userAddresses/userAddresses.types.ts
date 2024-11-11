import { TablesUpdate } from '../../services/supabase.types';
import { useUserAddresses } from './useUserAddresses';

export type TUserAddresses = ReturnType<
  typeof useUserAddresses
>['userAddresses'];

export type TUpdateUserAddressesArgs = {
  id: number;
  row: TablesUpdate<'userAddresses'>;
};
