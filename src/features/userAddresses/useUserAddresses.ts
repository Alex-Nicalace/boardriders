import { useQuery } from '@tanstack/react-query';
import { getUserAddresses } from '../../services/apiUserAddresses';

export function useUserAddresses() {
  const {
    data: userAddresses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userAddresses'],
    queryFn: getUserAddresses,
  });

  return { userAddresses, isLoading, error };
}
