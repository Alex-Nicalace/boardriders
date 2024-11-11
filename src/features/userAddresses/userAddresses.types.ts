import { useUserAddresses } from './useUserAddresses';

export type TUserAddresses = ReturnType<
  typeof useUserAddresses
>['userAddresses'];
