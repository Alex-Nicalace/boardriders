import {
  FormRegistration,
  TFormRegistrationProps,
  TInputsRegistartion,
} from '../../components/FormAuth';
import { useSignup } from './useSignup';

type TFormRegistrationContainerProps = Omit<
  TFormRegistrationProps,
  'disabled' | 'onSubmit'
> & { onSuccessRegister?: () => void };
function FormRegistrationContainer({
  onSuccessRegister,
  ...props
}: TFormRegistrationContainerProps): JSX.Element {
  const { signup, isSigning, error } = useSignup();

  // Обработчик события отправки формы
  function onSubmit({
    email,
    name: fullName,
    password,
    reset,
  }: TInputsRegistartion & { reset?: () => void }) {
    signup(
      { email, fullName, password },
      {
        onSettled: () => reset?.(),
        onSuccess: onSuccessRegister,
      }
    );
  }

  return (
    <FormRegistration
      {...props}
      disabled={isSigning}
      onSubmit={onSubmit}
      error={error?.message}
    />
  );
}

export default FormRegistrationContainer;
