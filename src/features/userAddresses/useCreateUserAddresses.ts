import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createUserAddresses as createUserAddressesApi } from '../../services/apiUserAddresses/createUserAddresses';
import { TUserAddresses } from './userAddresses.types';

export function useCreateUserAddresses() {
  const queryClient = useQueryClient();

  const { mutate: createUserAddresses, isPending: isCreating } = useMutation({
    mutationFn: createUserAddressesApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['userAddresses'], (oldData: TUserAddresses) =>
        (oldData || []).concat(data)
      );
      toast.success('Адрес успешно создан!');
    },
    onError: (err) => {
      console.error(err);

      toast.error('Произошла ошибка при создании адреса');
    },
  });

  return { createUserAddresses, isCreating };
}
