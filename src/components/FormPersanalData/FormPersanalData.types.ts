export type TFormPersanalDataProps = {
  className?: string;
  mode: 'personal-data' | 'change-password';
  disabled?: boolean;
  onSubmit?: (data: TFormInputs<TFormPersanalDataProps['mode']>) => void;
};

export type TPersanalDataInputs = {
  firstName: string;
  lastName: string;
  middleName?: string;
  sex: string;
  phone: string;
  email: string;
  birthday: Date;
};

export type TChangePasswordInputs = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// Типизация формы на основе значения mode
export type TFormInputs<T> = T extends 'personal-data'
  ? TPersanalDataInputs
  : TChangePasswordInputs;
