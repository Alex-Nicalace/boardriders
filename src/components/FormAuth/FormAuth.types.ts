// Задаем типы входных данных для формы
export type TInputsLogin = {
  email: string;
  password: string;
  rememberMe: boolean;
};

// Задаем типы входных данных для формы
export type TInputsRegistartion = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  rulesAgreement: boolean;
};

export type TFormAuthProps<T> = {
  className?: string;
  withTitle?: boolean;
  disabled?: boolean;
  onSubmit?: (data: T) => void;
};

export type TFormLoginProps = {
  className?: string;
  withTitle?: boolean;
  disabled?: boolean;
  onSubmit?: (data: TInputsLogin) => void;
};
export type TFormRegistrationProps = {
  className?: string;
  withTitle?: boolean;
  disabled?: boolean;
  onSubmit?: (
    data: TInputsRegistartion,
    options?: { reset?: () => void }
  ) => void;
};
