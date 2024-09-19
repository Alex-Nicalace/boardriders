import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isPending: isSigning } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      console.log('Пользователь успешно создан!');
      toast.success('Пользователь успешно создан!');
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Во время регистрации произошла ошибка! ${err.message}`);
    },
  });

  return { signup, isSigning };
}
