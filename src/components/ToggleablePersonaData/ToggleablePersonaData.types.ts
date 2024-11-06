import {
  TChangePasswordInputs,
  TPersanalDataInputs,
} from '../FormPersanalData';

export type TToggleablePersonaDataProps = {
  className?: string;
  isEdit: boolean;
  onToggle?: (value: boolean) => void;
} & (
  | {
      mode: 'personal-data';
      values: TPersanalDataInputs & { fullName?: string };
    }
  | { mode: 'change-password'; values: TChangePasswordInputs }
);

export type TKeysForPersonalInfo = keyof (TPersanalDataInputs & {
  fullName?: string;
});
