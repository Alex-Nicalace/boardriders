import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi, TLoginParams } from '../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending: isLogging,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: TLoginParams) => {
      return loginApi({ email, password });
    },
    onSuccess: (user) => {
      // в компоненте ProtectedRoute происходит запрос получения данных о пользователе и помещение этих данных в кэш
      // это проиходит с некоторой периодичностью и тем самым происходит проверка авторизации. есть смысл после аунтификации
      // сразу поместить данные о пользователе в кэш чтобы не делать лишний запрос за запросом
      console.log('Пользователь успешно вошел!');
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { login, isLogging, error };
}
