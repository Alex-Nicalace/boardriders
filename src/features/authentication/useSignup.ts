import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    isPending: isSigning,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      console.log('Пользователь успешно создан!');
      toast.success('Пользователь успешно создан!');
      // отметить как недействительные данные от прошлого пользователя что приведет к перезагрузке запроса
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      console.error(err);
      // toast.error(`Во время регистрации произошла ошибка! ${err.message}`);
    },
  });

  return { signup, isSigning, error };
}
