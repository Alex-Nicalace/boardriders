import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogout() {
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // удаляем все запросы в кэше
      queryClient.removeQueries();
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Во время выхода произошла ошибка! ${err.message}`);
    },
  });

  return { logout, isLoggingOut, error };
}
