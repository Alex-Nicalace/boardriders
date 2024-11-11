import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUserAddresses as updateUserAddressesApi } from '../../services/apiUserAddresses';
import {
  TUpdateUserAddressesArgs,
  TUserAddresses,
} from './userAddresses.types';

export function useUpdateUserAddresses() {
  const queryClient = useQueryClient();

  const { mutate: updateUserAddresses, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, row }: TUpdateUserAddressesArgs) =>
      updateUserAddressesApi(id, row),
    onSuccess: (data) => {
      queryClient.setQueryData(['userAddresses'], (oldData: TUserAddresses) =>
        (oldData || []).map((item) => (item.id === data.id ? data : item))
      );
      toast.success('Адрес успешно обновлен!');
    },
    onError: (err) => {
      console.error(err);

      toast.error('Произошла ошибка при обновлении адреса');
    },
  });

  return { updateUserAddresses, isUpdating };
}
