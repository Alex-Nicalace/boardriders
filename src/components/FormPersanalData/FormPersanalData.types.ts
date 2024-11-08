export type TFormPersanalDataProps = {
  className?: string;
  mode: 'personal-data' | 'change-password';
  values: TPersanalDataInputs;
  disabled?: boolean;
  onSubmit?: (data: TPersanalDataInputs) => void;
};

export type TPersanalDataInputs = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  sex?: string;
  phone?: string;
  email?: string;
  dateBirth?: Date | null;

  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};
