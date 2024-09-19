import {
  FormLogin,
  TFormLoginProps,
  TInputsLogin,
} from '../../components/FormAuth';
import { useLogin } from './useLogin';

type TFormLoginContainerProps = Omit<
  TFormLoginProps,
  'disabled' | 'onSubmit'
> & {
  onSuccessLogin?: () => void;
};
function FormLoginContainer({
  onSuccessLogin,
  ...props
}: TFormLoginContainerProps): JSX.Element {
  const { login, isLogging, error } = useLogin();

  function onSubmit({ email, password }: TInputsLogin) {
    login({ email, password }, { onSuccess: onSuccessLogin });
  }

  return (
    <FormLogin
      {...props}
      onSubmit={onSubmit}
      disabled={isLogging}
      error={error?.message}
    />
  );
}

export default FormLoginContainer;
