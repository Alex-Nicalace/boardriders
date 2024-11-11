import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteUserAddresses as deleteUserAddressesApi } from '../../services/apiUserAddresses';
import { TUserAddresses } from './userAddresses.types';

export function useDeleteUserAddresses() {
  const queryClient = useQueryClient();

  const { mutate: deleteUserAddresses, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteUserAddressesApi(id),

    onSuccess: ({ id }) => {
      queryClient.setQueryData(['userAddresses'], (oldData: TUserAddresses) =>
        (oldData || []).filter((item) => item.id !== id)
      );
      toast.success('Адрес успешно удален!');
    },
    onError: (err) => {
      console.error(err);

      toast.error('Произошла ошибка при удалении адреса');
    },
  });

  return { deleteUserAddresses, isDeleting };
}
