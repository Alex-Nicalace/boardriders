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
      console.log('Пользователь вышел из аккаунта!');
      toast.success('Вы вышли из аккаунта!');

      // * отметить как недействительные данные что приведет к перезагрузке запроса
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // todo: надо удалить только то, что касается аунтифицироанныйх данных
      queryClient.removeQueries({ queryKey: ['wishList', true] });
      queryClient.removeQueries({ queryKey: ['favorites'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Во время выхода произошла ошибка! ${err.message}`);
    },
  });

  return { logout, isLoggingOut, error };
}
