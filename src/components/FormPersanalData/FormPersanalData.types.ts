export type TFormPersanalDataProps = {
  className?: string;
  disabled?: boolean;
  onSubmit?: (data: TFormInputs<TFormPersanalDataProps['mode']>) => void;
} & (
  | { mode: 'personal-data'; values: TPersanalDataInputs }
  | { mode: 'change-password'; values: TChangePasswordInputs }
);

export type TPersanalDataInputs = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  sex?: string;
  phone?: string;
  email?: string;
  dateBirth?: Date | null;
};

export type TChangePasswordInputs = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

// Типизация формы на основе значения mode
export type TFormInputs<T> = T extends 'personal-data'
  ? TPersanalDataInputs
  : TChangePasswordInputs;
